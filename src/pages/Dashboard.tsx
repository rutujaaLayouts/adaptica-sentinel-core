
import React from 'react';
import { useSecurityContext } from '@/context/SecurityContext';
import Header from '@/components/Header';
import RiskScoreGauge from '@/components/RiskScoreGauge';
import RiskTrendChart from '@/components/RiskTrendChart';
import SecurityMetricsCard from '@/components/SecurityMetricsCard';
import SecurityEventsList from '@/components/SecurityEventsList';
import PolicyApprovalCard from '@/components/PolicyApprovalCard';
import ComplianceStatusCard from '@/components/ComplianceStatusCard';
import IntegrationsCard from '@/components/IntegrationsCard';

const Dashboard: React.FC = () => {
  const { 
    securityEvents, 
    securityPolicies, 
    complianceFrameworks,
    integrationSystems,
    riskScoreHistory,
    securityMetrics
  } = useSecurityContext();

  // Filter active events
  const activeEvents = securityEvents.filter(event => event.status !== 'resolved');
  
  return (
    <div className="flex-1 overflow-auto bg-gray-50 p-6">
      <Header title="Security Dashboard" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {/* Risk Score and Key Metrics */}
        <RiskScoreGauge 
          score={securityMetrics[0].value} 
          trend={securityMetrics[0].trend} 
          change={securityMetrics[0].change} 
        />
        <RiskTrendChart data={riskScoreHistory} />
        <SecurityMetricsCard metrics={securityMetrics.slice(1)} />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Security Events and Policy Approvals */}
        <div>
          <SecurityEventsList events={activeEvents} limit={5} />
        </div>
        <div>
          <PolicyApprovalCard policies={securityPolicies} />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Compliance and Integrations */}
        <div>
          <ComplianceStatusCard frameworks={complianceFrameworks} limit={4} />
        </div>
        <div>
          <IntegrationsCard systems={integrationSystems} limit={4} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
