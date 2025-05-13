
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { SecurityPolicy } from '@/types';
import { useSecurityContext } from '@/context/SecurityContext';

interface PolicyApprovalCardProps {
  policies: SecurityPolicy[];
}

const PolicyApprovalCard: React.FC<PolicyApprovalCardProps> = ({ policies }) => {
  const { approvePolicy, rejectPolicy } = useSecurityContext();
  
  // Filter for only pending policies
  const pendingPolicies = policies.filter(policy => policy.approvalStatus === 'pending');

  if (pendingPolicies.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">Policy Approvals</CardTitle>
          <CardDescription>Review and approve adaptive security policies</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-40 text-gray-500">
            No pending policy approvals
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">Policy Approvals</CardTitle>
        <CardDescription>Review and approve adaptive security policies</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {pendingPolicies.map(policy => (
          <div key={policy.id} className="bg-gray-50 p-4 rounded-md">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium">{policy.name}</h3>
              <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-200">
                {policy.createdBy === 'system' ? 'AI Generated' : 'User Created'}
              </Badge>
            </div>
            <p className="text-sm text-gray-600 mb-3">{policy.description}</p>
            
            <div className="text-xs text-gray-500 mb-1">Compliance frameworks:</div>
            <div className="flex flex-wrap gap-1 mb-3">
              {policy.complianceFrameworks.map((framework, i) => (
                <Badge key={i} variant="secondary" className="text-xs">
                  {framework}
                </Badge>
              ))}
            </div>
            
            <Separator className="my-3" />
            
            <div className="text-xs text-gray-500 mb-1">Enforcement Level:</div>
            <Badge className={policy.enforcementLevel === 'strict' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}>
              {policy.enforcementLevel}
            </Badge>
            
            <Separator className="my-3" />
            
            <div className="flex items-center justify-end space-x-2 mt-3">
              <Button variant="outline" size="sm" onClick={() => rejectPolicy(policy.id)}>
                Reject
              </Button>
              <Button size="sm" onClick={() => approvePolicy(policy.id)}>
                Approve
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default PolicyApprovalCard;
