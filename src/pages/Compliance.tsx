
import React from 'react';
import Layout from '@/components/Layout';
import { useSecurityContext } from '@/context/SecurityContext';
import Header from '@/components/Header';
import ComplianceStatusCard from '@/components/ComplianceStatusCard';

const Compliance = () => {
  const { complianceFrameworks } = useSecurityContext();

  return (
    <Layout activePage="compliance">
      <div className="flex-1 overflow-auto bg-gray-50 p-6">
        <Header title="Compliance Status" />
        
        <div className="mt-6">
          <ComplianceStatusCard frameworks={complianceFrameworks} limit={10} />
        </div>
      </div>
    </Layout>
  );
};

export default Compliance;
