
import React from 'react';
import Layout from '@/components/Layout';
import { useSecurityContext } from '@/context/SecurityContext';
import Header from '@/components/Header';
import IntegrationsCard from '@/components/IntegrationsCard';

const Integrations = () => {
  const { integrationSystems } = useSecurityContext();

  return (
    <Layout activePage="integrations">
      <div className="flex-1 overflow-auto bg-gray-50 p-6">
        <Header title="System Integrations" />
        
        <div className="mt-6">
          <IntegrationsCard systems={integrationSystems} limit={10} />
        </div>
      </div>
    </Layout>
  );
};

export default Integrations;
