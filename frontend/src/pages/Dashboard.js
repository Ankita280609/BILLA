import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import api from '../services/api';

import AnalyticsDashboard from '../components/dashboard/AnalyticsDashboard';
import SubscriptionForm from '../components/dashboard/SubscriptionForm';
import SubscriptionItem from '../components/dashboard/SubscriptionItem';
import UnpaidBillsModal from '../components/dashboard/UnpaidBillsModal';
import { PlusIcon, EnvelopeIcon } from '@heroicons/react/24/solid';

const Dashboard = () => {
  const { user } = useAuth();
  const [subscriptions, setSubscriptions] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // State for the form modal
  const [showForm, setShowForm] = useState(false);
  const [editingSub, setEditingSub] = useState(null);

  // State for email button
  const [emailLoading, setEmailLoading] = useState(false);

  // State for unpaid bills modal
  const [showUnpaidModal, setShowUnpaidModal] = useState(false);


  // --- Data Fetching Function ---
  const fetchData = async () => {
    try {
      setLoading(true);
      setError('');

      // Fetch subscriptions and analytics in parallel
      const [subsResponse, analyticsResponse] = await Promise.all([
        api.get('/subscriptions'),
        api.get('/analytics/summary')
      ]);

      setSubscriptions(subsResponse.data);
      setAnalytics(analyticsResponse.data);
    } catch (err) {
      setError('Failed to fetch data. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when the component loads
  useEffect(() => {
    fetchData();
  }, []);

  // Show unpaid bills modal when data loads (only for Monthly subscriptions)
  useEffect(() => {
    if (!loading && subscriptions.length > 0) {
      const unpaid = subscriptions.filter(sub =>
        sub.billingCycle === 'Monthly' && !isSubPaidThisMonth(sub)
      );
      if (unpaid.length > 0) {
        setShowUnpaidModal(true);
      }
    }
  }, [loading, subscriptions]);

  // Helper function to check if subscription is paid this month
  const isSubPaidThisMonth = (sub) => {
    if (sub.billingCycle !== 'Monthly') return true;
    if (!sub.lastPaidDate) return false;

    const paidDate = new Date(sub.lastPaidDate);
    const now = new Date();

    return (
      paidDate.getMonth() === now.getMonth() &&
      paidDate.getFullYear() === now.getFullYear()
    );
  };

  // --- Handler Functions ---
  const openForm = (sub = null) => {
    setEditingSub(sub); // If sub is provided, we're editing
    setShowForm(true);
  };

  const closeForm = () => {
    setEditingSub(null);
    setShowForm(false);
  };

  // This function is passed to the form
  // It will either create or update a subscription
  const handleSave = async (subData) => {
    try {
      if (editingSub) {
        // Update existing subscription
        await api.put(`/subscriptions/${editingSub._id}`, subData);
      } else {
        // Create new subscription
        await api.post('/subscriptions', subData);
      }

      // Refresh all data, close form, and clear editing state
      fetchData();
      closeForm();
    } catch (err) {
      console.error('Failed to save subscription:', err);
      alert('Failed to save. Please try again.'); // Simple error handling
    }
  };

  // This function is passed to the SubscriptionItem
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this subscription?')) {
      try {
        await api.delete(`/subscriptions/${id}`);
        fetchData(); // Refresh data
      } catch (err) {
        console.error('Failed to delete subscription:', err);
        alert('Failed to delete. Please try again.');
      }
    }
  };

  // --- New handler for sending test email ---
  const handleTestEmail = async () => {
    setEmailLoading(true);
    try {
      // Call the new backend endpoint
      await api.post('/notify/test');
      alert('Test email sent! Check your Ethereal inbox (and the backend console for the link).');
    } catch (err) {
      console.error('Failed to send test email:', err);
      alert('Failed to send test email. See console for details.');
    } finally {
      setEmailLoading(false);
    }
  };

  // --- New handler for marking as paid ---
  const handleMarkAsPaid = async (id) => {
    try {
      await api.put(`/subscriptions/${id}/pay`);
      fetchData(); // Refresh data to update UI and analytics
    } catch (err) {
      console.error('Failed to mark as paid:', err);
      alert('Failed to mark as paid. Please try again.');
    }
  };

  // --- Render Logic ---
  if (loading) {
    return <div className="text-center p-10 text-xl">Loading Dashboard...</div>;
  }

  if (error) {
    return <div className="text-center p-10 text-xl text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Welcome, {user?.name}!</h1>

      {/* Analytics Section */}
      {analytics && <AnalyticsDashboard data={analytics} />}

      {/* Subscriptions List Section */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Your Subscriptions ({subscriptions.length})</h2>
          <div className="flex space-x-2">
            {/* Test Email Button */}
            <button
              onClick={handleTestEmail}
              disabled={emailLoading}
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg flex items-center space-x-2 disabled:opacity-50"
            >
              <EnvelopeIcon className="h-5 w-5" />
              <span>{emailLoading ? 'Sending...' : 'Test Email'}</span>
            </button>

            {/* Add New Button */}
            <button
              onClick={() => openForm()}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg flex items-center space-x-2"
            >
              <PlusIcon className="h-5 w-5" />
              <span>Add New</span>
            </button>
          </div>
        </div>

        {/* List */}
        <div className="space-y-4">
          {subscriptions.length > 0 ? (
            subscriptions.map(sub => (
              <SubscriptionItem
                key={sub._id}
                subscription={sub}
                onEdit={() => openForm(sub)}
                onDelete={() => handleDelete(sub._id)}
                onMarkAsPaid={() => handleMarkAsPaid(sub._id)}
              />
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-center py-4">
              You haven't added any subscriptions yet.
            </p>
          )}
        </div>
      </div>

      {/* Add/Edit Form Modal */}
      {showForm && (
        <SubscriptionForm
          subscription={editingSub}
          onSave={handleSave}
          onClose={closeForm}
        />
      )}

      {/* Unpaid Bills Modal */}
      {showUnpaidModal && (
        <UnpaidBillsModal
          unpaidBills={subscriptions.filter(sub =>
            sub.billingCycle === 'Monthly' && !isSubPaidThisMonth(sub)
          )}
          onClose={() => setShowUnpaidModal(false)}
          onMarkAsPaid={handleMarkAsPaid}
        />
      )}
    </div>
  );
};

export default Dashboard;