
import React from 'react';
import Layout from '@/components/Layout';
import Header from '@/components/Header';

const Settings = () => {
  return (
    <Layout activePage="settings">
      <div className="flex-1 overflow-auto bg-gray-50 p-6">
        <Header title="Settings" />
        
        <div className="mt-6">
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-medium">System Settings</h3>
            </div>
            <div className="p-4">
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notification Settings
                  </label>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input 
                        id="email-notifications" 
                        type="checkbox" 
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded" 
                        defaultChecked
                      />
                      <label htmlFor="email-notifications" className="ml-2 block text-sm text-gray-700">
                        Email notifications for critical events
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input 
                        id="sms-notifications" 
                        type="checkbox" 
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded" 
                      />
                      <label htmlFor="sms-notifications" className="ml-2 block text-sm text-gray-700">
                        SMS notifications for critical events
                      </label>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Data Retention Period
                  </label>
                  <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                    <option>30 days</option>
                    <option>90 days</option>
                    <option>180 days</option>
                    <option>1 year</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    System Theme
                  </label>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input 
                        id="light-theme" 
                        name="theme" 
                        type="radio" 
                        className="h-4 w-4 text-blue-600 border-gray-300" 
                        defaultChecked
                      />
                      <label htmlFor="light-theme" className="ml-2 block text-sm text-gray-700">
                        Light
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input 
                        id="dark-theme" 
                        name="theme" 
                        type="radio" 
                        className="h-4 w-4 text-blue-600 border-gray-300" 
                      />
                      <label htmlFor="dark-theme" className="ml-2 block text-sm text-gray-700">
                        Dark
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input 
                        id="system-theme" 
                        name="theme" 
                        type="radio" 
                        className="h-4 w-4 text-blue-600 border-gray-300" 
                      />
                      <label htmlFor="system-theme" className="ml-2 block text-sm text-gray-700">
                        System default
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4">
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Save Settings
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
