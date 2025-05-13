
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ComplianceFramework } from '@/types';

interface ComplianceStatusCardProps {
  frameworks: ComplianceFramework[];
  limit?: number;
}

const ComplianceStatusCard: React.FC<ComplianceStatusCardProps> = ({ frameworks, limit }) => {
  const displayFrameworks = limit ? frameworks.slice(0, limit) : frameworks;

  const getComplianceColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'bg-green-500';
      case 'partially-compliant': return 'bg-yellow-500';
      case 'non-compliant': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-green-500';
    if (percentage >= 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">Compliance Status</CardTitle>
        <CardDescription>Regulatory framework compliance status</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-auto max-h-[400px]">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left p-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Framework</th>
                <th className="text-left p-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="text-left p-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Compliance</th>
                <th className="text-left p-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Controls</th>
                <th className="text-left p-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Last Check</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {displayFrameworks.map((framework) => (
                <tr key={framework.id} className="hover:bg-gray-50">
                  <td className="p-3">
                    <div className="text-sm font-medium">{framework.name}</div>
                    <div className="text-xs text-gray-500">{framework.category}</div>
                  </td>
                  <td className="p-3">
                    <Badge className={`${getComplianceColor(framework.status)}`}>
                      {framework.status}
                    </Badge>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center">
                      <Progress 
                        value={framework.compliance} 
                        className={`h-2 w-24 ${getProgressColor(framework.compliance)}`} 
                      />
                      <span className="ml-2 text-xs font-medium">{framework.compliance}%</span>
                    </div>
                  </td>
                  <td className="p-3 text-sm">
                    {framework.passedControls}/{framework.controls}
                  </td>
                  <td className="p-3 text-sm">
                    {formatDate(framework.lastAssessed)}
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

export default ComplianceStatusCard;
