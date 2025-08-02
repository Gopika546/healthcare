'use client';

import { useState } from 'react';
import Header from '../../components/Layout/Header';
import NotificationItem from '../../components/NotificationItem';
import SearchFilterBar from '../../components/ui/SearchFilterBar';
import { mockNotifications } from '../../lib/mockData';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filteredNotifications, setFilteredNotifications] = useState(mockNotifications);

  const handleMarkAsRead = (id: string) => {
    const updatedNotifications = notifications.map(notif =>
      notif.id === id ? { ...notif, read: true } : notif
    );
    setNotifications(updatedNotifications);
    setFilteredNotifications(updatedNotifications);
  };

  const handleMarkAllAsRead = () => {
    const updatedNotifications = notifications.map(notif => ({ ...notif, read: true }));
    setNotifications(updatedNotifications);
    setFilteredNotifications(updatedNotifications);
  };

  const handleSearch = (query: string) => {
    if (!query) {
      setFilteredNotifications(notifications);
    } else {
      const filtered = notifications.filter(notif =>
        notif.title.toLowerCase().includes(query.toLowerCase()) ||
        notif.message.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredNotifications(filtered);
    }
  };

  const handleFilter = (filters: any) => {
    let filtered = notifications;

    if (filters.type) {
      filtered = filtered.filter(notif => notif.type === filters.type);
    }
    if (filters.priority) {
      filtered = filtered.filter(notif => notif.priority === filters.priority);
    }
    if (filters.read) {
      filtered = filtered.filter(notif => 
        filters.read === 'read' ? notif.read : !notif.read
      );
    }

    setFilteredNotifications(filtered);
  };

  const unreadCount = notifications.filter(notif => !notif.read).length;

  const filterOptions = [
    {
      key: 'type',
      label: 'Type',
      options: [
        { value: 'alert', label: 'Alerts' },
        { value: 'medication', label: 'Medications' },
        { value: 'appointment', label: 'Appointments' }
      ]
    },
    {
      key: 'priority',
      label: 'Priority',
      options: [
        { value: 'high', label: 'High' },
        { value: 'medium', label: 'Medium' },
        { value: 'low', label: 'Low' }
      ]
    },
    {
      key: 'read',
      label: 'Status',
      options: [
        { value: 'unread', label: 'Unread' },
        { value: 'read', label: 'Read' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Notifications Center</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Manage alerts and system notifications
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Unread:</span>
              <span className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300 px-2 py-1 rounded-full text-sm font-medium">
                {unreadCount}
              </span>
            </div>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium whitespace-nowrap cursor-pointer"
              >
                Mark All Read
              </button>
            )}
          </div>
        </div>

        <SearchFilterBar
          onSearch={handleSearch}
          onFilter={handleFilter}
          filters={filterOptions}
          placeholder="Search notifications..."
        />

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              All Notifications ({filteredNotifications.length})
            </h2>
            
            {filteredNotifications.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-notification-off-line text-gray-400 text-2xl"></i>
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No notifications found</h3>
                <p className="text-gray-600 dark:text-gray-400">Try adjusting your search or filter criteria</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredNotifications.map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onMarkRead={handleMarkAsRead}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{notifications.length}</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                <i className="ri-notification-3-line text-blue-600 dark:text-blue-400"></i>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">High Priority</p>
                <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                  {notifications.filter(n => n.priority === 'high').length}
                </p>
              </div>
              <div className="w-10 h-10 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center">
                <i className="ri-alarm-warning-line text-red-600 dark:text-red-400"></i>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Unread</p>
                <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">{unreadCount}</p>
              </div>
              <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
                <i className="ri-mail-unread-line text-orange-600 dark:text-orange-400"></i>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Alerts</p>
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {notifications.filter(n => n.type === 'alert').length}
                </p>
              </div>
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                <i className="ri-error-warning-line text-purple-600 dark:text-purple-400"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}