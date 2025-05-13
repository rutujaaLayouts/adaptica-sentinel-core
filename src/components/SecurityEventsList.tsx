
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SecurityEvent } from '@/types';
import { useSecurityContext } from '@/context/SecurityContext';

interface SecurityEventsListProps {
  events: SecurityEvent[];
  limit?: number;
}

const SecurityEventsList: React.FC<SecurityEventsListProps> = ({ events, limit }) => {
  const { updateSecurityEvent } = useSecurityContext();
  const displayEvents = limit ? events.slice(0, limit) : events;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const getRiskBadgeColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'critical': return 'bg-red-600 hover:bg-red-700';
      case 'high': return 'bg-red-500 hover:bg-red-600';
      case 'medium': return 'bg-yellow-500 hover:bg-yellow-600';
      case 'low': return 'bg-green-500 hover:bg-green-600';
      default: return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-500 hover:bg-blue-600';
      case 'investigating': return 'bg-purple-500 hover:bg-purple-600';
      case 'resolved': return 'bg-green-500 hover:bg-green-600';
      default: return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  const handleInvestigate = (event: SecurityEvent) => {
    updateSecurityEvent({
      ...event,
      status: 'investigating'
    });
  };

  const handleResolve = (event: SecurityEvent) => {
    updateSecurityEvent({
      ...event,
      status: 'resolved'
    });
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Security Events</CardTitle>
        <CardDescription>Recent security anomalies and alerts</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-auto max-h-[400px]">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left p-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                <th className="text-left p-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                <th className="text-left p-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Risk</th>
                <th className="text-left p-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="text-left p-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                <th className="text-right p-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {displayEvents.map((event) => (
                <tr key={event.id} className="hover:bg-gray-50">
                  <td className="p-3">
                    <div className="text-sm font-medium">{event.eventType}</div>
                    <div className="text-xs text-gray-500">{event.description}</div>
                  </td>
                  <td className="p-3 text-sm">{event.source}</td>
                  <td className="p-3">
                    <Badge className={`${getRiskBadgeColor(event.riskLevel)}`}>
                      {event.riskLevel}
                    </Badge>
                  </td>
                  <td className="p-3">
                    <Badge className={`${getStatusBadgeColor(event.status)}`}>
                      {event.status}
                    </Badge>
                  </td>
                  <td className="p-3 text-sm">{formatDate(event.timestamp)}</td>
                  <td className="p-3 text-right">
                    {event.status === 'active' && (
                      <Button size="sm" variant="outline" onClick={() => handleInvestigate(event)}>
                        Investigate
                      </Button>
                    )}
                    {event.status === 'investigating' && (
                      <Button size="sm" variant="outline" onClick={() => handleResolve(event)}>
                        Resolve
                      </Button>
                    )}
                    {event.status === 'resolved' && (
                      <span className="text-sm text-gray-500">Closed</span>
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

export default SecurityEventsList;
