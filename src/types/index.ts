
// Define our core types for the application

export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';

export interface SecurityEvent {
  id: string;
  timestamp: string;
  eventType: string;
  source: string;
  description: string;
  riskScore: number;
  riskLevel: RiskLevel;
  affectedAssets: string[];
  status: 'active' | 'resolved' | 'investigating';
}

export interface SecurityPolicy {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  status: 'active' | 'pending' | 'archived';
  enforcementLevel: 'strict' | 'monitor' | 'alert';
  complianceFrameworks: string[];
  triggerConditions: string[];
  actions: string[];
  affectedSystems: string[];
  createdBy: 'system' | 'user';
  approvalStatus?: 'pending' | 'approved' | 'rejected';
}

export interface ComplianceFramework {
  id: string;
  name: string;
  description: string;
  category: string;
  status: 'compliant' | 'non-compliant' | 'partially-compliant';
  compliance: number; // Percentage of compliance
  controls: number;
  passedControls: number;
  lastAssessed: string;
}

export interface SecurityMetric {
  name: string;
  value: number;
  trend: 'up' | 'down' | 'stable';
  change: number;
}

export interface IntegrationSystem {
  id: string;
  name: string;
  type: 'siem' | 'firewall' | 'iam' | 'edr' | 'other';
  status: 'connected' | 'disconnected' | 'error';
  lastSync: string;
  description: string;
  dataFlowDirection: 'inbound' | 'outbound' | 'bidirectional';
}

export interface RiskScoreHistory {
  date: string;
  score: number;
}

export interface User {
  id: string;
  name: string;
  role: string;
  department: string;
  riskScore: number;
  riskLevel: RiskLevel;
  anomalies: number;
  lastActivity: string;
}

export interface Device {
  id: string;
  name: string;
  type: string;
  os: string;
  ipAddress: string;
  lastSeen: string;
  compliance: number;
  riskScore: number;
  riskLevel: RiskLevel;
  status: 'online' | 'offline' | 'unknown';
}

export interface SystemHealth {
  name: string;
  value: number;
  status: 'healthy' | 'warning' | 'critical';
}
