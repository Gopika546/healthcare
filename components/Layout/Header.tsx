
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import ThemeSwitcher from '../ui/ThemeSwitcher';
import FontSizeAdjuster from '../ui/FontSizeAdjuster';

export default function Header() {
  const pathname = usePathname();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  const mainNavItems = [
    { href: '/', label: 'Dashboard', icon: 'dashboard' },
    { href: '/patients', label: 'Patients', icon: 'user' },
    { href: '/medications', label: 'Medications', icon: 'medicine-bottle' },
    { href: '/appointments', label: 'Appointments', icon: 'calendar' },
    { href: '/notifications', label: 'Notifications', icon: 'notification' }
  ];

  const adminNavItems = [
    { href: '/admin', label: 'Admin', icon: 'settings' },
    { href: '/admin/patients', label: 'Manage Patients', icon: 'user-settings' },
    { href: '/admin/doctors', label: 'Manage Doctors', icon: 'stethoscope' },
    { href: '/admin/medications', label: 'Manage Meds', icon: 'capsule' },
    { href: '/admin/alerts', label: 'Alert Settings', icon: 'alarm' }
  ];

  const isAdminPath = pathname.startsWith('/admin');
  const navItems = isAdminPath ? adminNavItems : mainNavItems;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const profileMenuItems = [
    { href: '/profile', label: 'My Profile', icon: 'user' },
    { href: '/profile', label: 'Account Settings', icon: 'settings' },
    { href: '/notifications', label: 'Notifications', icon: 'notification' },
    { href: '/', label: 'Help & Support', icon: 'question' },
    { href: '/', label: 'Sign Out', icon: 'logout-box-r' }
  ];

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <i className="ri-heart-pulse-line text-white text-lg"></i>
              </div>
              <span className="font-['Pacifico'] text-xl text-blue-600">Patient Care</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap cursor-pointer transition-colors ${
                  pathname === item.href
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <div className="w-4 h-4 flex items-center justify-center">
                  <i className={`ri-${item.icon}-line`}></i>
                </div>
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-3">
            <FontSizeAdjuster />
            <ThemeSwitcher />
            
            {/* Profile Dropdown */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
              >
                <i className="ri-user-line text-gray-600 dark:text-gray-300"></i>
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
                  {/* Profile Header */}
                  <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                        <i className="ri-user-line text-blue-600 dark:text-blue-400"></i>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white text-sm">Dr. Sarah Johnson</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Cardiology Department</p>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="py-1">
                    {profileMenuItems.map((item, index) => (
                      <div key={index}>
                        {index === profileMenuItems.length - 1 && (
                          <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                        )}
                        <Link
                          href={item.href}
                          onClick={() => setIsProfileOpen(false)}
                          className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                        >
                          <div className="w-4 h-4 flex items-center justify-center">
                            <i className={`ri-${item.icon}-line ${item.label === 'Sign Out' ? 'text-red-500' : ''}`}></i>
                          </div>
                          <span className={item.label === 'Sign Out' ? 'text-red-500' : ''}>{item.label}</span>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
