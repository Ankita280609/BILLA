import React from 'react';
import { XMarkIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';

const UnpaidBillsModal = ({ unpaidBills, onClose, onMarkAsPaid }) => {
    if (!unpaidBills || unpaidBills.length === 0) {
        return null;
    }

    const totalUnpaid = unpaidBills.reduce((sum, bill) => sum + bill.cost, 0);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 animate-fade-in">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden animate-slide-up">
                {/* Header */}
                <div className="bg-red-500 dark:bg-red-600 text-white p-6 flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold flex items-center">
                            <CurrencyDollarIcon className="h-7 w-7 mr-2" />
                            Unpaid Bills Reminder
                        </h2>
                        <p className="text-red-100 mt-1">You have {unpaidBills.length} unpaid bill{unpaidBills.length !== 1 ? 's' : ''}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-red-600 dark:hover:bg-red-700 rounded-full transition-colors"
                    >
                        <XMarkIcon className="h-6 w-6" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto max-h-96">
                    <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border-l-4 border-red-500">
                        <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                            Total Unpaid: <span className="text-red-600 dark:text-red-400">${totalUnpaid.toFixed(2)}</span>
                        </p>
                    </div>

                    <div className="space-y-3">
                        {unpaidBills.map((bill) => (
                            <div
                                key={bill._id}
                                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:shadow-md transition-shadow"
                            >
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-800 dark:text-gray-200">{bill.name}</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        ${bill.cost.toFixed(2)} • {bill.billingCycle} • {bill.category}
                                    </p>
                                </div>
                                <button
                                    onClick={() => onMarkAsPaid(bill._id)}
                                    className="ml-4 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-lg transition-colors flex items-center"
                                >
                                    <CurrencyDollarIcon className="h-4 w-4 mr-1" />
                                    Mark Paid
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-3">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-medium"
                    >
                        Dismiss
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UnpaidBills Modal;
