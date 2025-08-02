'use client';

import { useState } from 'react';
import Header from "../../../components/Layout/Header";

const mockAlertSettings = [
  { id: '1', name: 'High Blood Pressure', parameter: 'bloodPressure', operator: '>', threshold: '140/90', priority: 'high', enabled: true, description: 'Alert when systolic BP exceeds 140 or diastolic exceeds 90' },
  { id: '2', name: 'Low Blood Pressure', parameter: 'bloodPressure', operator: '<', threshold: '90/60', priority: 'medium', enabled: true, description: 'Alert when systolic BP drops below 90 or diastolic below 60' },
  { id: '3', name: 'High Heart Rate', parameter: 'heartRate', operator: '>', threshold: '100', priority: 'high', enabled: true, description: 'Alert when heart rate exceeds 100 BPM' },
  { id: '4', name: 'Low Heart Rate', parameter: 'heartRate', operator: '<', threshold: '60', priority: 'medium', enabled: false, description: 'Alert when heart rate drops below 60 BPM' },
  { id: '5', name: 'High Temperature', parameter: 'temperature', operator: '>', threshold: '101.5', priority: 'high', enabled: true, description: 'Alert when body temperature exceeds 101.5°F' },
  { id: '6', name: 'High Glucose', parameter: 'glucose', operator: '>', threshold: '180', priority: 'medium', enabled: true, description: 'Alert when blood glucose exceeds 180 mg/dL' },
];

export default function AdminAlertsPage() {
  const [alertSettings, setAlertSettings] = useState(mockAlertSettings);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAlert, setEditingAlert] = useState<any>(null);
  const [testMode, setTestMode] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    parameter: '',
    operator: '>',
    threshold: '',
    priority: 'medium',
    description: '',
    enabled: true
  });

  const handleToggleAlert = (id: string) => {
    const updatedSettings = alertSettings.map(alert =>
      alert.id === id ? { ...alert, enabled: !alert.enabled } : alert
    );
    setAlertSettings(updatedSettings);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingAlert) {
      const updatedSettings = alertSettings.map(alert =>
        alert.id === editingAlert.id ? { ...alert, ...formData } : alert
      );
      setAlertSettings(updatedSettings);
    } else {
      const newAlert = {
        id: `alert-${Date.now()}`,
        ...formData
      };
      const updatedSettings = [...alertSettings, newAlert];
      setAlertSettings(updatedSettings);
    }
    resetForm();
  };

  const handleEdit = (alert: any) => {
    setEditingAlert(alert);
    setFormData({
      name: alert.name,
      parameter: alert.parameter,
      operator: alert.operator,
      threshold: alert.threshold,
      priority: alert.priority,
      description: alert.description,
      enabled: alert.enabled
    });
    setShowAddForm(true);
  };

  const handleDelete = (id: string) => {
    const updatedSettings = alertSettings.filter(alert => alert.id !== id);
    setAlertSettings(updatedSettings);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      parameter: '',
      operator: '>',
      threshold: '',
      priority: 'medium',
      description: '',
      enabled: true
    });
    setEditingAlert(null);
    setShowAddForm(false);
  };

  const handleTestAlert = (alertName: string) => {
    alert(`Test alert triggered for: ${alertName}`);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 dark:text-red-400';
      case 'medium': return 'text-yellow-600 dark:text-yellow-400';
      case 'low': return 'text-green-600 dark:text-green-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  const getPriorityBg = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Alert Settings</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Configure vital signs thresholds and notifications</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Test Mode:</span>
              <button
                onClick={() => setTestMode(!testMode)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  testMode ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  testMode ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium whitespace-nowrap cursor-pointer"
            >
              <i className="ri-add-line mr-2"></i>Add Alert Rule
            </button>
          </div>
        </div>

        {/* Alert Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Rules</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{alertSettings.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                <i className="ri-settings-3-line text-blue-600 dark:text-blue-400 text-xl"></i>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Rules</p>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">
                  {alertSettings.filter(a => a.enabled).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                <i className="ri-check-line text-green-600 dark:text-green-400 text-xl"></i>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">High Priority</p>
                <p className="text-3xl font-bold text-red-600 dark:text-red-400 mt-2">
                  {alertSettings.filter(a => a.priority === 'high' && a.enabled).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center">
                <i className="ri-alarm-warning-line text-red-600 dark:text-red-400 text-xl"></i>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Test Mode</p>
                <p className="text-lg font-bold text-purple-600 dark:text-purple-400 mt-2">
                  {testMode ? 'Enabled' : 'Disabled'}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                <i className="ri-flask-line text-purple-600 dark:text-purple-400 text-xl"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Alert Rules Table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Alert Rules</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Rule Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Parameter</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Condition</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Priority</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {alertSettings.map((alert) => (
                  <tr key={alert.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{alert.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{alert.description}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white capitalize">{alert.parameter}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-mono text-gray-900 dark:text-white">
                        {alert.operator} {alert.threshold}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityBg(alert.priority)}`}>
                        {alert.priority.charAt(0).toUpperCase() + alert.priority.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleToggleAlert(alert.id)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          alert.enabled ? 'bg-green-600' : 'bg-gray-300 dark:bg-gray-600'
                        }`}
                      >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          alert.enabled ? 'translate-x-6' : 'translate-x-1'
                        }`} />
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        {testMode && (
                          <button
                            onClick={() => handleTestAlert(alert.name)}
                            className="w-8 h-8 flex items-center justify-center text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300 cursor-pointer"
                          >
                            <i className="ri-play-line"></i>
                          </button>
                        )}
                        <button
                          onClick={() => handleEdit(alert)}
                          className="w-8 h-8 flex items-center justify-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 cursor-pointer"
                        >
                          <i className="ri-edit-line"></i>
                        </button>
                        <button
                          onClick={() => handleDelete(alert.id)}
                          className="w-8 h-8 flex items-center justify-center text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 cursor-pointer"
                        >
                          <i className="ri-delete-bin-line"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add/Edit Alert Form Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-2xl mx-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                {editingAlert ? 'Edit Alert Rule' : 'Add New Alert Rule'}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Rule Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Parameter</label>
                    <select
                      value={formData.parameter}
                      onChange={(e) => setFormData({ ...formData, parameter: e.target.value })}
                      className="w-full px-3 py-2 pr-8 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      required
                    >
                      <option value="">Select Parameter</option>
                      <option value="bloodPressure">Blood Pressure</option>
                      <option value="heartRate">Heart Rate</option>
                      <option value="temperature">Temperature</option>
                      <option value="glucose">Blood Glucose</option>
                      <option value="oxygen">Oxygen Saturation</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Operator</label>
                    <select
                      value={formData.operator}
                      onChange={(e) => setFormData({ ...formData, operator: e.target.value })}
                      className="w-full px-3 py-2 pr-8 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      required
                    >
                      <option value=">">Greater than (>)</option>
                      <option value="<">Less than (<)</option>
                      <option value=">=">Greater than or equal (>=)</option>
                      <option value="<=">Less than or equal (<=)</option>
                      <option value="=">Equal to (=)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Threshold</label>
                    <input
                      type="text"
                      value={formData.threshold}
                      onChange={(e) => setFormData({ ...formData, threshold: e.target.value })}
                      placeholder="e.g., 140/90, 100, 101.5"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Priority</label>
                    <select
                      value={formData.priority}
                      onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                      className="w-full px-3 py-2 pr-8 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      required
                    >
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      placeholder="Describe when this alert should trigger..."
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.enabled}
                        onChange={(e) => setFormData({ ...formData, enabled: e.target.checked })}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                        Enable this alert rule
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors whitespace-nowrap cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap cursor-pointer"
                  >
                    {editingAlert ? 'Update Rule' : 'Add Rule'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}