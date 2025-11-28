import React from 'react';
import { Link } from 'react-router-dom';

import React from 'react';
import { Link } from 'react-router-dom';
import { ChartBarIcon, BellAlertIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';

const Home = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Hero Section */}
      <div className="bg-indigo-600 text-white py-20 px-6 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Master Your Subscriptions with BILLA
        </h1>
        <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-indigo-100">
          Track expenses, manage recurring bills, and never miss a payment again.
          The ultimate dashboard for your financial peace of mind.
        </p>
        <div className="space-x-4">
          <Link
            to="/signup"
            className="bg-white text-indigo-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-full text-lg shadow-lg transition duration-300"
          >
            Get Started Free
          </Link>
          <Link
            to="/login"
            className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-indigo-600 font-bold py-3 px-8 rounded-full text-lg transition duration-300"
          >
            Login
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">
          Why Choose BILLA?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Feature 1 */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md text-center">
            <div className="bg-indigo-100 dark:bg-indigo-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <CurrencyDollarIcon className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Expense Tracking</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Visualize your monthly and yearly spending. See exactly where your money goes with intuitive charts.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md text-center">
            <div className="bg-green-100 dark:bg-green-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <ChartBarIcon className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Smart Analytics</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Get insights into your spending habits. Breakdown costs by category and identify areas to save.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md text-center">
            <div className="bg-red-100 dark:bg-red-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <BellAlertIcon className="h-8 w-8 text-red-600 dark:text-red-400" />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Payment Alerts</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Receive timely email notifications before your bills are due. Avoid late fees and surprise charges.
            </p>
          </div>
        </div>
      </div>

      {/* Use Case Section */}
      <div className="bg-gray-100 dark:bg-gray-800 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
            Perfect for Modern Life
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Whether you're managing streaming services, software subscriptions, or utility bills,
            BILLA gives you the clarity you need to budget effectively and save money.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;