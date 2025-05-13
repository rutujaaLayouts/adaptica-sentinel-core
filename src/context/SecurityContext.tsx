
import React, { createContext, useContext, useState, ReactNode } from 'react';
import {
  SecurityEvent,
  SecurityPolicy,
  ComplianceFramework,
  IntegrationSystem
} from '../types';
import { 
  securityEvents as initialEvents,
  securityPolicies as initialPolicies,
  complianceFrameworks as initialFrameworks,
  integrationSystems as initialSystems,
  securityMetrics as initialMetrics,
  riskScoreHistory as initialHistory,
  users as initialUsers,
  devices as initialDevices,
  systemHealth as initialHealth
} from '../data/mockData';
import { toast } from "@/hooks/use-toast";

interface SecurityContextType {
  // Data
  securityEvents: SecurityEvent[];
  securityPolicies: SecurityPolicy[];
  complianceFrameworks: ComplianceFramework[];
  integrationSystems: IntegrationSystem[];
  riskScoreHistory: { date: string; score: number }[];
  users: any[];
  devices: any[];
  systemHealth: any[];
  securityMetrics: any[];
  
  // Actions
  updateSecurityEvent: (event: SecurityEvent) => void;
  approvePolicy: (policyId: string) => void;
  rejectPolicy: (policyId: string) => void;
  reconnectIntegration: (integrationId: string) => void;
}

const SecurityContext = createContext<SecurityContextType | undefined>(undefined);

export const SecurityProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [securityEvents, setSecurityEvents] = useState(initialEvents);
  const [securityPolicies, setSecurityPolicies] = useState(initialPolicies);
  const [complianceFrameworks] = useState(initialFrameworks);
  const [integrationSystems, setIntegrationSystems] = useState(initialSystems);
  const [riskScoreHistory] = useState(initialHistory);
  const [users] = useState(initialUsers);
  const [devices] = useState(initialDevices);
  const [systemHealth] = useState(initialHealth);
  const [securityMetrics] = useState(initialMetrics);

  const updateSecurityEvent = (updatedEvent: SecurityEvent) => {
    setSecurityEvents(prevEvents => 
      prevEvents.map(event => 
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
    toast({
      title: "Event Updated",
      description: `Event ${updatedEvent.id} status changed to ${updatedEvent.status}`,
    });
  };

  const approvePolicy = (policyId: string) => {
    setSecurityPolicies(prevPolicies => 
      prevPolicies.map(policy => 
        policy.id === policyId 
          ? { ...policy, approvalStatus: 'approved', status: 'active' } 
          : policy
      )
    );
    toast({
      title: "Policy Approved",
      description: "The policy has been approved and is now active",
    });
  };

  const rejectPolicy = (policyId: string) => {
    setSecurityPolicies(prevPolicies => 
      prevPolicies.map(policy => 
        policy.id === policyId 
          ? { ...policy, approvalStatus: 'rejected', status: 'archived' } 
          : policy
      )
    );
    toast({
      title: "Policy Rejected",
      description: "The policy has been rejected and archived",
    });
  };

  const reconnectIntegration = (integrationId: string) => {
    setIntegrationSystems(prevSystems => 
      prevSystems.map(system => 
        system.id === integrationId 
          ? { ...system, status: 'connected', lastSync: new Date().toISOString() } 
          : system
      )
    );
    toast({
      title: "Integration Reconnected",
      description: "The system has been reconnected successfully",
    });
  };

  return (
    <SecurityContext.Provider value={{
      securityEvents,
      securityPolicies,
      complianceFrameworks,
      integrationSystems,
      riskScoreHistory,
      users,
      devices,
      systemHealth,
      securityMetrics,
      updateSecurityEvent,
      approvePolicy,
      rejectPolicy,
      reconnectIntegration
    }}>
      {children}
    </SecurityContext.Provider>
  );
};

export const useSecurityContext = () => {
  const context = useContext(SecurityContext);
  if (context === undefined) {
    throw new Error('useSecurityContext must be used within a SecurityProvider');
  }
  return context;
};
