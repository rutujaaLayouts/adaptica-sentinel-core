
import React from 'react';
import Layout from '@/components/Layout';
import Dashboard from '@/pages/Dashboard';
import { SecurityProvider } from '@/context/SecurityContext';

const Index = () => {
  return (
    <SecurityProvider>
      <Layout activePage="dashboard">
        <Dashboard />
      </Layout>
    </SecurityProvider>
  );
};

export default Index;
