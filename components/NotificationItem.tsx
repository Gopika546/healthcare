'use client';

interface NotificationItemProps {
  notification: {
    id: string;
    type: string;
    title: string;
    message: string;
    timestamp: string;
    priority: string;
    read: boolean;
    patientId?: string;
  };
  onMarkRead: (id: string) => void;
}

export default function NotificationItem({ notification, onMarkRead }: NotificationItemProps) {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'alert': return 'ri-alarm-warning-line text-red-500';
      case 'medication': return 'ri-medicine-bottle-line text-blue-500';
      case 'appointment': return 'ri-calendar-line text-green-500';
      default: return 'ri-notification-3-line text-gray-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500 bg-red-50 dark:bg-red-900/20';
      case 'medium': return 'border-l-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
      case 'low': return 'border-l-green-500 bg-green-50 dark:bg-green-900/20';
      default: return 'border-l-gray-500 bg-gray-50 dark:bg-gray-700';
    }
  };

  return (
    <div className={`border-l-4 rounded-lg p-4 ${getPriorityColor(notification.priority)} ${
      !notification.read ? 'bg-opacity-100' : 'bg-opacity-50'
    } transition-all duration-200`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <div className="w-6 h-6 flex items-center justify-center mt-0.5">
            <i className={getTypeIcon(notification.type)}></i>
          </div>
          <div className="flex-1">
            <h4 className={`font-medium ${
              !notification.read 
                ? 'text-gray-900 dark:text-white' 
                : 'text-gray-600 dark:text-gray-400'
            }`}>
              {notification.title}
            </h4>
            <p className={`text-sm mt-1 ${
              !notification.read 
                ? 'text-gray-700 dark:text-gray-300' 
                : 'text-gray-500 dark:text-gray-500'
            }`}>
              {notification.message}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              {new Date(notification.timestamp).toLocaleString()}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 text-xs rounded-full ${
            notification.priority === 'high' 
              ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
              : notification.priority === 'medium'
              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
              : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
          }`}>
            {notification.priority}
          </span>
          {!notification.read && (
            <button
              onClick={() => onMarkRead(notification.id)}
              className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer"
            >
              <i className="ri-check-line"></i>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}