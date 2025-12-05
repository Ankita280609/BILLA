import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import api from '../services/api';

import AnalyticsDashboard from '../components/dashboard/AnalyticsDashboard';
import SubscriptionForm from '../components/dashboard/SubscriptionForm';
import SubscriptionItem from '../components/dashboard/SubscriptionItem';
import UnpaidBillsModal from '../components/dashboard/UnpaidBillsModal';
import { PlusIcon, EnvelopeIcon, ArrowPathIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const Dashboard = () => {
  const { user } = useAuth();
  const [subscriptions, setSubscriptions] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalSubscriptions, setTotalSubscriptions] = useState(0);

  // State for the form modal
  const [showForm, setShowForm] = useState(false);
  const [editingSub, setEditingSub] = useState(null);

  // State for email button
  const [emailLoading, setEmailLoading] = useState(false);

  // State for unpaid bills modal
  const [showUnpaidModal, setShowUnpaidModal] = useState(false);


  // --- Data Fetching Function ---
  const fetchData = async (page = 1) => {
    try {
      setLoading(true);
      setError('');

      // Fetch subscriptions and analytics in parallel
      const [subsResponse, analyticsResponse] = await Promise.all([
        api.get(`/subscriptions?page=${page}&limit=5`), // Limit 5 for demo purposes
        api.get('/analytics/summary')
      ]);

      // Handle paginated response
      setSubscriptions(subsResponse.data.subscriptions);
      setCurrentPage(subsResponse.data.currentPage);
      setTotalPages(subsResponse.data.totalPages);
      setTotalSubscriptions(subsResponse.data.totalSubscriptions);

      setAnalytics(analyticsResponse.data);
    } catch (err) {
      setError('Failed to fetch data. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when the component loads or page changes
  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

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
      fetchData(currentPage);
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
        fetchData(currentPage); // Refresh data
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
      fetchData(currentPage); // Refresh data to update UI and analytics
    } catch (err) {
      console.error('Failed to mark as paid:', err);
      alert('Failed to mark as paid. Please try again.');
    }
  };

  // --- Render Logic ---
  if (loading && !analytics) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-dark-bg">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-dark-bg">
        <div className="text-center p-10 bg-white dark:bg-slate-800 rounded-2xl shadow-xl">
          <div className="text-red-500 text-xl mb-4">Error Loading Dashboard</div>
          <p className="text-slate-600 dark:text-slate-400 mb-6">{error}</p>
          <button
            onClick={() => fetchData(currentPage)}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12 animate-fade-in">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Welcome back, <span className="text-gradient">{user?.name}</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Here's what's happening with your subscriptions today.
          </p>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={() => fetchData(currentPage)}
            className="p-2 rounded-lg text-slate-500 hover:text-primary-600 hover:bg-white dark:hover:bg-slate-800 transition-all"
            title="Refresh Data"
          >
            <ArrowPathIcon className={`h-6 w-6 ${loading ? 'animate-spin' : ''}`} />
          </button>

          <button
            onClick={handleTestEmail}
            disabled={emailLoading}
            className="glass dark:glass-dark px-4 py-2 rounded-xl text-slate-700 dark:text-slate-200 font-medium hover:bg-white/20 transition-all flex items-center space-x-2 disabled:opacity-50"
          >
            <EnvelopeIcon className="h-5 w-5" />
            <span className="hidden sm:inline">{emailLoading ? 'Sending...' : 'Test Email'}</span>
          </button>

          <button
            onClick={() => openForm()}
            className="bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white font-bold py-2 px-6 rounded-xl shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 transition-all hover:-translate-y-0.5 flex items-center space-x-2"
          >
            <PlusIcon className="h-5 w-5" />
            <span>Add Subscription</span>
          </button>
        </div>
      </div>

      {/* Analytics Section */}
      {analytics && (
        <div className="animate-slide-up">
          <AnalyticsDashboard data={analytics} />
        </div>
      )}

      {/* Subscriptions List Section */}
      <div className="glass dark:glass-dark rounded-2xl p-6 md:p-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center">
            Your Subscriptions
            <span className="ml-3 px-3 py-1 text-xs font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full">
              {totalSubscriptions}
            </span>
          </h2>
        </div>

        {/* List */}
        <div className="space-y-4">
          {subscriptions.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {subscriptions.map((sub, index) => (
                <div key={sub._id} className="animate-slide-up" style={{ animationDelay: `${0.1 + (index * 0.05)}s` }}>
                  <SubscriptionItem
                    subscription={sub}
                    onEdit={() => openForm(sub)}
                    onDelete={() => handleDelete(sub._id)}
                    onMarkAsPaid={() => handleMarkAsPaid(sub._id)}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl">
              <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <PlusIcon className="h-8 w-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">No subscriptions yet</h3>
              <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-sm mx-auto">
                Add your first subscription to start tracking your expenses and get notified about upcoming payments.
              </p>
              <button
                onClick={() => openForm()}
                className="text-primary-600 font-medium hover:text-primary-700 hover:underline"
              >
                Add your first subscription
              </button>
            </div>
          )}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-8 space-x-4">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>

            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </div>
        )}
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