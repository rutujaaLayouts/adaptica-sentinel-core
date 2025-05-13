
import React from 'react';
import Layout from '@/components/Layout';
import { useSecurityContext } from '@/context/SecurityContext';
import Header from '@/components/Header';
import PolicyApprovalCard from '@/components/PolicyApprovalCard';

const Policies = () => {
  const { securityPolicies } = useSecurityContext();

  return (
    <Layout activePage="policies">
      <div className="flex-1 overflow-auto bg-gray-50 p-6">
        <Header title="Security Policies" />
        
        <div className="mt-6">
          <PolicyApprovalCard policies={securityPolicies} />
        </div>
      </div>
    </Layout>
  );
};

export default Policies;
