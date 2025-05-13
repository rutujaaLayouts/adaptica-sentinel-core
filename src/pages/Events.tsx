
import React from 'react';
import Layout from '@/components/Layout';
import { useSecurityContext } from '@/context/SecurityContext';
import Header from '@/components/Header';
import SecurityEventsList from '@/components/SecurityEventsList';

const Events = () => {
  const { securityEvents } = useSecurityContext();

  return (
    <Layout activePage="events">
      <div className="flex-1 overflow-auto bg-gray-50 p-6">
        <Header title="Security Events" />
        
        <div className="mt-6">
          <SecurityEventsList events={securityEvents} limit={10} />
        </div>
      </div>
    </Layout>
  );
};

export default Events;
