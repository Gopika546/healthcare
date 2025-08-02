'use client';

import { useState, useEffect } from 'react';

export default function FontSizeAdjuster() {
  const [fontSize, setFontSize] = useState('medium');

  useEffect(() => {
    const savedFontSize = localStorage.getItem('fontSize') || 'medium';
    setFontSize(savedFontSize);
    document.documentElement.className = document.documentElement.className.replace(
      /font-(small|medium|large)/g, 
      ''
    );
    document.documentElement.classList.add(`font-${savedFontSize}`);
  }, []);

  const changeFontSize = (size: string) => {
    setFontSize(size);
    localStorage.setItem('fontSize', size);
    document.documentElement.className = document.documentElement.className.replace(
      /font-(small|medium|large)/g, 
      ''
    );
    document.documentElement.classList.add(`font-${size}`);
  };

  return (
    <div className="flex items-center space-x-2 border border-gray-300 dark:border-gray-600 rounded-lg p-1">
      {['small', 'medium', 'large'].map((size) => (
        <button
          key={size}
          onClick={() => changeFontSize(size)}
          className={`px-2 py-1 text-xs rounded whitespace-nowrap cursor-pointer ${
            fontSize === size
              ? 'bg-blue-500 text-white'
              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
        >
          {size.charAt(0).toUpperCase() + size.slice(1)}
        </button>
      ))}
    </div>
  );
}