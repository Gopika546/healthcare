'use client';

import { useState } from 'react';

interface CollapsiblePanelProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  icon?: string;
}

export default function CollapsiblePanel({ 
  title, 
  children, 
  defaultOpen = false,
  icon = 'folder'
}: CollapsiblePanelProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
      >
        <div className="flex items-center space-x-3">
          <div className="w-5 h-5 flex items-center justify-center">
            <i className={`ri-${icon}-line text-gray-600 dark:text-gray-400`}></i>
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">{title}</h3>
        </div>
        <div className="w-5 h-5 flex items-center justify-center">
          <i className={`ri-arrow-${isOpen ? 'up' : 'down'}-s-line text-gray-500 dark:text-gray-400 transition-transform duration-200`}></i>
        </div>
      </button>
      
      {isOpen && (
        <div className="px-6 pb-6">
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}