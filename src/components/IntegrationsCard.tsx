
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IntegrationSystem } from '@/types';
import { useSecurityContext } from '@/context/SecurityContext';

interface IntegrationsCardProps {
  systems: IntegrationSystem[];
  limit?: number;
}

const IntegrationsCard: React.FC<IntegrationsCardProps> = ({ systems, limit }) => {
  const { reconnectIntegration } = useSecurityContext();
  const displaySystems = limit ? systems.slice(0, limit) : systems;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'bg-green-500';
      case 'disconnected': return 'bg-yellow-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'siem': return '📊';
      case 'firewall': return '🛡️';
      case 'iam': return '🔑';
      case 'edr': return '🔍';
      default: return '🔄';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 60) {
      return `${diffMins} mins ago`;
    } else if (diffMins < 24 * 60) {
      const hours = Math.floor(diffMins / 60);
      return `${hours} hours ago`;
    } else {
      const days = Math.floor(diffMins / (24 * 60));
      return `${days} days ago`;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">Integrations</CardTitle>
        <CardDescription>Connected security systems and data sources</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-auto max-h-[400px]">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left p-3 text-xs font-medium text-gray-500 uppercase tracking-wider">System</th>
                <th className="text-left p-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="text-left p-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="text-left p-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Last Sync</th>
                <th className="text-right p-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {displaySystems.map((system) => (
                <tr key={system.id} className="hover:bg-gray-50">
                  <td className="p-3">
                    <div className="text-sm font-medium">{system.name}</div>
                    <div className="text-xs text-gray-500">{system.description}</div>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center">
                      <span className="mr-2">{getTypeIcon(system.type)}</span>
                      <span className="text-sm capitalize">{system.type}</span>
                    </div>
                  </td>
                  <td className="p-3">
                    <Badge className={`${getStatusColor(system.status)}`}>
                      {system.status}
                    </Badge>
                  </td>
                  <td className="p-3 text-sm">
                    {formatDate(system.lastSync)}
                  </td>
                  <td className="p-3 text-right">
                    {(system.status === 'disconnected' || system.status === 'error') && (
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => reconnectIntegration(system.id)}
                      >
                        Reconnect
                      </Button>
                    )}
                    {system.status === 'connected' && (
                      <Button size="sm" variant="ghost" disabled>
                        Connected
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default IntegrationsCard;
