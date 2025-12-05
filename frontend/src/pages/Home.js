import React from 'react';
import { Link } from 'react-router-dom';
import { ChartBarIcon, BellAlertIcon, CurrencyDollarIcon, SparklesIcon, ShieldCheckIcon, ArrowTrendingUpIcon } from '@heroicons/react/24/outline';

const Home = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-dark-bg transition-colors duration-300 overflow-x-hidden">
      {/* Hero Section */}
      <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background Blobs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-400/30 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary-400/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center space-x-2 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-full px-4 py-2 mb-8 animate-fade-in">
            <SparklesIcon className="h-5 w-5 text-yellow-500" />
            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">The #1 Subscription Manager</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight animate-slide-up">
            <span className="block text-slate-900 dark:text-white mb-2">Master Your Money</span>
            <span className="text-gradient">With BILLA</span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Stop losing money to forgotten subscriptions. Track, manage, and optimize your recurring expenses in one beautiful dashboard.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Link
              to="/signup"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white font-bold text-lg shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 transition-all hover:-translate-y-1"
            >
              Get Started Free
            </Link>
            <Link
              to="/login"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all hover:-translate-y-1"
            >
              View Demo
            </Link>
          </div>

          {/* Hero Image / Dashboard Preview */}
          <div className="mt-16 mx-auto max-w-5xl animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-50 dark:from-dark-bg to-transparent opacity-20 z-10"></div>
              {/* Placeholder for dashboard screenshot - using a constructed UI representation */}
              <div className="p-4 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 opacity-90">
                <div className="col-span-1 md:col-span-2 space-y-4">
                  <div className="h-32 rounded-xl bg-gradient-to-r from-primary-500/10 to-secondary-500/10 border border-primary-100 dark:border-primary-900/30 p-6 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div className="h-8 w-8 rounded-lg bg-primary-100 dark:bg-primary-900/50 text-primary-600 flex items-center justify-center">
                        <CurrencyDollarIcon className="h-5 w-5" />
                      </div>
                      <span className="text-xs font-bold text-green-500 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full">+2.5%</span>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-slate-800 dark:text-white">$1,240.50</div>
                      <div className="text-sm text-slate-500">Total Monthly Spend</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-16 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 flex items-center px-4 justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 rounded-full ${i === 1 ? 'bg-red-100 text-red-600' : i === 2 ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'} flex items-center justify-center`}>
                            {i === 1 ? 'N' : i === 2 ? 'S' : 'D'}
                          </div>
                          <div>
                            <div className="font-medium text-slate-800 dark:text-slate-200">{i === 1 ? 'Netflix' : i === 2 ? 'Spotify' : 'Dropbox'}</div>
                            <div className="text-xs text-slate-500">Monthly Subscription</div>
                          </div>
                        </div>
                        <div className="font-bold text-slate-800 dark:text-slate-200">${i === 1 ? '15.99' : i === 2 ? '9.99' : '11.99'}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="hidden md:block col-span-1 space-y-4">
                  <div className="h-full rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 p-4">
                    <div className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-4">Upcoming</div>
                    <div className="space-y-3">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="flex items-center space-x-3 text-sm">
                          <div className="w-2 h-2 rounded-full bg-primary-500"></div>
                          <span className="text-slate-600 dark:text-slate-400 flex-1">Adobe CC</span>
                          <span className="text-slate-500">Oct {12 + i}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white dark:bg-slate-900 relative">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Everything You Need to <span className="text-gradient">Save Money</span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              BILLA gives you the clarity and control you need to budget effectively and stop wasting money on unused subscriptions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <ChartBarIcon className="h-8 w-8" />,
                title: "Visual Analytics",
                desc: "See exactly where your money goes with beautiful, interactive charts and spending breakdowns.",
                color: "text-blue-500",
                bg: "bg-blue-50 dark:bg-blue-900/20"
              },
              {
                icon: <BellAlertIcon className="h-8 w-8" />,
                title: "Smart Alerts",
                desc: "Get notified before payments happen. Never pay a late fee or overdraft charge again.",
                color: "text-amber-500",
                bg: "bg-amber-50 dark:bg-amber-900/20"
              },
              {
                icon: <ShieldCheckIcon className="h-8 w-8" />,
                title: "Secure & Private",
                desc: "Your financial data is encrypted and secure. We never sell your personal information.",
                color: "text-emerald-500",
                bg: "bg-emerald-50 dark:bg-emerald-900/20"
              }
            ].map((feature, idx) => (
              <div key={idx} className="group p-8 rounded-2xl bg-slate-50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:shadow-xl transition-all duration-300">
                <div className={`w-16 h-16 rounded-2xl ${feature.bg} ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-20 bg-slate-50 dark:bg-dark-bg border-y border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: "Active Users", value: "10,000+" },
              { label: "Tracked Monthly", value: "$2M+" },
              { label: "Subscriptions", value: "50k+" },
              { label: "Money Saved", value: "$500k+" },
            ].map((stat, idx) => (
              <div key={idx} className="space-y-2">
                <div className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">{stat.value}</div>
                <div className="text-sm font-medium text-slate-500 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900 to-secondary-900 z-0"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 z-0"></div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">
            Ready to Take Control of Your Finances?
          </h2>
          <p className="text-xl text-primary-100 mb-12 max-w-2xl mx-auto">
            Join thousands of smart users who are saving money every month with BILLA.
          </p>
          <Link
            to="/signup"
            className="inline-block px-10 py-4 rounded-full bg-white text-primary-600 font-bold text-lg shadow-2xl hover:bg-primary-50 hover:scale-105 transition-all duration-300"
          >
            Start Your Free Trial
          </Link>
          <p className="mt-6 text-sm text-primary-200">No credit card required • Cancel anytime</p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-1">
              <Link to="/" className="text-2xl font-bold text-white mb-4 block">BILLA</Link>
              <p className="text-slate-400 text-sm leading-relaxed">
                The smartest way to track subscriptions and manage your recurring expenses.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="#" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Security</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="#" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
            &copy; {new Date().getFullYear()} BILLA. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;