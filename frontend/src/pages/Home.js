import React from 'react';
import { Link } from 'react-router-dom';
import { ChartBarIcon, BellAlertIcon, CurrencyDollarIcon, SparklesIcon } from '@heroicons/react/24/outline';

const Home = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-300">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-700 dark:from-indigo-800 dark:via-indigo-900 dark:to-purple-900 text-white py-24 px-6 text-center relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-300 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative z-10">
          <div className="animate-slide-down">
            <div className="flex items-center justify-center mb-4">
              <SparklesIcon className="h-12 w-12 text-yellow-300 animate-pulse" />
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-100">
              Master Your Subscriptions with BILLA
            </h1>
          </div>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-indigo-100 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Track expenses, manage recurring bills, and never miss a payment again.
            The ultimate dashboard for your financial peace of mind.
          </p>
          <div className="space-x-4 animate-scale-in" style={{ animationDelay: '0.4s' }}>
            <Link
              to="/signup"
              className="inline-block bg-white text-indigo-600 hover:bg-indigo-50 hover:scale-105 font-bold py-4 px-10 rounded-full text-lg shadow-2xl transition-all duration-300 transform"
            >
              Get Started Free
            </Link>
            <Link
              to="/login"
              className="inline-block bg-transparent border-2 border-white text-white hover:bg-white hover:text-indigo-600 hover:scale-105 font-bold py-4 px-10 rounded-full text-lg transition-all duration-300 transform"
            >
              Login
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
            Why Choose BILLA?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Everything you need to manage your finances in one place
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* Feature 1 */}
          <div className="group bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200 dark:border-gray-700">
            <div className="bg-gradient-to-br from-indigo-100 to-indigo-200 dark:from-indigo-900 dark:to-indigo-800 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <CurrencyDollarIcon className="h-10 w-10 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Expense Tracking</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Visualize your monthly and yearly spending. See exactly where your money goes with intuitive charts and analytics.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="group bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200 dark:border-gray-700">
            <div className="bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900 dark:to-green-800 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <ChartBarIcon className="h-10 w-10 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Smart Analytics</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Get actionable insights into your spending habits. Breakdown costs by category and identify areas to save.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="group bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200 dark:border-gray-700">
            <div className="bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900 dark:to-red-800 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <BellAlertIcon className="h-10 w-10 text-red-600 dark:text-red-400" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Payment Alerts</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Receive timely email notifications before your bills are due. Avoid late fees and surprise charges effortlessly.
            </p>
          </div>
        </div>
      </div>

      {/* Use Case Section */}
      <div className="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 py-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-8">
            Perfect for Modern Life
          </h2>
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto">
            Whether you're managing streaming services, software subscriptions, or utility bills,
            BILLA gives you the clarity and control you need to budget effectively and save money.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { number: '100+', label: 'Active Users' },
              { number: '$10K+', label: 'Tracked Monthly' },
              { number: '500+', label: 'Subscriptions' },
              { number: '99%', label: 'Satisfaction' }
            ].map((stat, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow">
                <div className="text-3xl md:text-4xl font-extrabold text-indigo-600 dark:text-indigo-400 mb-2">{stat.number}</div>
                <div className="text-sm md:text-base text-gray-600 dark:text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Ready to Take Control?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-10">
            Join thousands of users who are already managing their subscriptions smarter.
          </p>
          <Link
            to="/signup"
            className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-4 px-12 rounded-full text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            Start Free Today
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;