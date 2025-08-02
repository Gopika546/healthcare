'use client';

import { useEffect, useState } from 'react';
import Header from '../../../components/Layout/Header';

type AlertSetting = {
  id: string;
  name: string;
  parameter: string;
  operator: string;
  threshold: string;
  priority: 'low' | 'medium' | 'high';
  enabled: boolean;
  description: string;
};

export default function AlertsPage() {
  const [alertSettings, setAlertSettings] = useState<AlertSetting[]>([]);
  const [selectedAlert, setSelectedAlert] = useState<AlertSetting | null>(null);

  useEffect(() => {
    // Fetch or load mock data
    const mockData: AlertSetting[] = [
      {
        id: '1',
        name: 'High Blood Pressure',
        parameter: 'bloodPressure',
        operator: '>',
        threshold: '140/90',
        priority: 'high',
        enabled: true,
        description: 'Alert when systolic BP exceeds 140 or diastolic exceeds 90',
      },
      {
        id: '2',
        name: 'Low Blood Pressure',
        parameter: 'bloodPressure',
        operator: '<',
        threshold: '90/60',
        priority: 'medium',
        enabled: true,
        description: 'Alert when BP is lower than 90/60',
      },
    ];

    setAlertSettings(mockData);
  }, []);

  const handleViewDetails = (alert: AlertSetting) => {
    setSelectedAlert(alert);
  };

  const handleCloseModal = () => {
    setSelectedAlert(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Alert Settings
        </h1>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Parameter
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Operator
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Threshold
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Enabled
                </th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              {alertSettings.map((alert) => (
                <tr key={alert.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {alert.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {alert.parameter}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {alert.operator}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {alert.threshold}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {alert.priority}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span
                      className={`inline-flex px-2 text-xs font-semibold leading-5 rounded-full ${
                        alert.enabled
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {alert.enabled ? 'Enabled' : 'Disabled'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                    <button
                      onClick={() => handleViewDetails(alert)}
                      className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-200"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectedAlert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-lg w-full">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Alert Details
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                <strong>Name:</strong> {selectedAlert.name}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                <strong>Description:</strong> {selectedAlert.description}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                <strong>Threshold:</strong> {selectedAlert.operator} {selectedAlert.threshold}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                <strong>Priority:</strong> {selectedAlert.priority}
              </p>
              <button
                onClick={handleCloseModal}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
