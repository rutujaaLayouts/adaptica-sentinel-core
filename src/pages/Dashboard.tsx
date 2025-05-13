
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
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, Activity, Shield, Bell } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

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
  const criticalEvents = activeEvents.filter(event => event.severity === 'critical');
  const pendingPolicies = securityPolicies.filter(policy => policy.status === 'pending');
  
  const handleRunAssessment = () => {
    toast.success("Security assessment initiated", {
      description: "Results will be available in a few minutes"
    });
  };
  
  const handleViewAllEvents = () => {
    toast("Navigating to Events page", {
      description: "Showing all security events"
    });
  };

  return (
    <div className="flex-1 overflow-auto bg-background p-6">
      <Header title="Security Dashboard" />
      
      {criticalEvents.length > 0 && (
        <div className="my-4">
          <Card className="border-red-500 bg-red-50 dark:bg-red-950/30">
            <CardHeader className="py-3">
              <CardTitle className="text-red-700 dark:text-red-400 flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Critical Security Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-red-700 dark:text-red-400">
                There are {criticalEvents.length} critical security events that require your immediate attention.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="destructive" size="sm" onClick={handleViewAllEvents}>
                View Critical Alerts
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <Card className="col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">{securityEvents.length}</div>
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                <Activity className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {activeEvents.length} active events requiring attention
            </p>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending Policies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">{pendingPolicies.length}</div>
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                <Shield className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Policies awaiting approval or implementation
            </p>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Compliance Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">
                {Math.round(complianceFrameworks.reduce((sum, fw) => sum + fw.compliancePercentage, 0) / complianceFrameworks.length)}%
              </div>
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full">
                <BarChart className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Overall compliance across all frameworks
            </p>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Security Assessment</CardTitle>
          </CardHeader>
          <CardContent className="pb-2">
            <Button 
              variant="outline" 
              className="w-full text-blue-600 border-blue-300 hover:bg-blue-50 dark:text-blue-400 dark:border-blue-800 dark:hover:bg-blue-950/50"
              onClick={handleRunAssessment}
            >
              Run New Assessment
            </Button>
            <p className="text-xs text-muted-foreground mt-2">
              Last run: 4 hours ago
            </p>
          </CardContent>
        </Card>
      </div>
      
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
