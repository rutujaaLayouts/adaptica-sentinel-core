
import { 
  SecurityEvent, 
  SecurityPolicy, 
  ComplianceFramework, 
  SecurityMetric, 
  IntegrationSystem, 
  RiskScoreHistory,
  User,
  Device,
  SystemHealth
} from '../types';

// Helper to generate dates in the past
const daysAgo = (days: number): string => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString();
};

// Security Events
export const securityEvents: SecurityEvent[] = [
  {
    id: 'evt-001',
    timestamp: daysAgo(0),
    eventType: 'Authentication',
    source: 'Office365',
    description: 'Multiple failed login attempts from unusual location',
    riskScore: 85,
    riskLevel: 'high',
    affectedAssets: ['User:ajay.patel', 'Office365'],
    status: 'active'
  },
  {
    id: 'evt-002',
    timestamp: daysAgo(0),
    eventType: 'Data Access',
    source: 'File Server',
    description: 'Unusual access to sensitive financial documents',
    riskScore: 75,
    riskLevel: 'high',
    affectedAssets: ['User:priya.sharma', 'Finance Server'],
    status: 'investigating'
  },
  {
    id: 'evt-003',
    timestamp: daysAgo(1),
    eventType: 'Network',
    source: 'Firewall',
    description: 'Outbound connection to known malicious IP',
    riskScore: 90,
    riskLevel: 'critical',
    affectedAssets: ['Device:WS-543', 'Network'],
    status: 'active'
  },
  {
    id: 'evt-004',
    timestamp: daysAgo(1),
    eventType: 'Malware',
    source: 'EDR',
    description: 'Suspicious process behavior detected',
    riskScore: 70,
    riskLevel: 'medium',
    affectedAssets: ['Device:LT-287', 'Endpoint'],
    status: 'resolved'
  },
  {
    id: 'evt-005',
    timestamp: daysAgo(2),
    eventType: 'Configuration',
    source: 'Cloud Security',
    description: 'S3 bucket permissions changed to public',
    riskScore: 80,
    riskLevel: 'high',
    affectedAssets: ['AWS:Storage', 'Cloud'],
    status: 'resolved'
  },
  {
    id: 'evt-006',
    timestamp: daysAgo(2),
    eventType: 'Authentication',
    source: 'VPN',
    description: 'Login from unrecognized device',
    riskScore: 65,
    riskLevel: 'medium',
    affectedAssets: ['User:admin', 'VPN Gateway'],
    status: 'resolved'
  },
  {
    id: 'evt-007',
    timestamp: daysAgo(3),
    eventType: 'User Behavior',
    source: 'UEBA',
    description: 'Unusual working hours and access patterns',
    riskScore: 60,
    riskLevel: 'medium',
    affectedAssets: ['User:rahul.joshi', 'Multiple Systems'],
    status: 'investigating'
  },
  {
    id: 'evt-008',
    timestamp: daysAgo(3),
    eventType: 'Application',
    source: 'Web App Firewall',
    description: 'Potential SQL injection attempt',
    riskScore: 85,
    riskLevel: 'high',
    affectedAssets: ['WebApp:CustomerPortal', 'Database'],
    status: 'active'
  }
];

// Security Policies
export const securityPolicies: SecurityPolicy[] = [
  {
    id: 'pol-001',
    name: 'Multi-Factor Authentication Enforcement',
    description: 'Requires MFA for all administrative access',
    createdAt: daysAgo(30),
    updatedAt: daysAgo(5),
    status: 'active',
    enforcementLevel: 'strict',
    complianceFrameworks: ['NIST 800-53', 'ISO 27001'],
    triggerConditions: ['Administrative access', 'Privileged account login'],
    actions: ['Enforce MFA', 'Log access attempt', 'Alert on failure'],
    affectedSystems: ['All corporate systems'],
    createdBy: 'system'
  },
  {
    id: 'pol-002',
    name: 'Sensitive Data Access Control',
    description: 'Restricts access to financial data based on role and location',
    createdAt: daysAgo(60),
    updatedAt: daysAgo(15),
    status: 'active',
    enforcementLevel: 'strict',
    complianceFrameworks: ['SOX', 'GDPR'],
    triggerConditions: ['Financial data access', 'Access from non-corporate network'],
    actions: ['Verify user identity', 'Check authorization', 'Log access'],
    affectedSystems: ['Finance systems', 'Data warehouses'],
    createdBy: 'user'
  },
  {
    id: 'pol-003',
    name: 'Unusual Login Restriction - APAC Region',
    description: 'Blocks logins from unusual locations for APAC users',
    createdAt: daysAgo(2),
    updatedAt: daysAgo(2),
    status: 'pending',
    enforcementLevel: 'strict',
    complianceFrameworks: ['Internal Policy'],
    triggerConditions: ['Login from new location', 'APAC user'],
    actions: ['Block access', 'Notify user', 'Alert security team'],
    affectedSystems: ['All authentication systems'],
    createdBy: 'system',
    approvalStatus: 'pending'
  },
  {
    id: 'pol-004',
    name: 'Cloud Storage Encryption',
    description: 'Enforces encryption for all cloud storage resources',
    createdAt: daysAgo(45),
    updatedAt: daysAgo(45),
    status: 'active',
    enforcementLevel: 'strict',
    complianceFrameworks: ['NIST 800-53', 'HIPAA'],
    triggerConditions: ['Cloud storage creation', 'Data classification change'],
    actions: ['Enforce encryption', 'Audit compliance', 'Remediate non-compliance'],
    affectedSystems: ['AWS S3', 'Azure Blob Storage', 'Google Cloud Storage'],
    createdBy: 'user'
  },
  {
    id: 'pol-005',
    name: 'Endpoint Malware Response',
    description: 'Quarantine and remediation for detected malware',
    createdAt: daysAgo(90),
    updatedAt: daysAgo(7),
    status: 'active',
    enforcementLevel: 'strict',
    complianceFrameworks: ['NIST 800-53', 'ISO 27001'],
    triggerConditions: ['Malware detection', 'Suspicious process activity'],
    actions: ['Quarantine endpoint', 'Stop malicious processes', 'Scan system'],
    affectedSystems: ['All corporate endpoints'],
    createdBy: 'system'
  },
  {
    id: 'pol-006',
    name: 'Network Segmentation - Development Systems',
    description: 'Restricts development systems from accessing production data',
    createdAt: daysAgo(3),
    updatedAt: daysAgo(1),
    status: 'pending',
    enforcementLevel: 'strict',
    complianceFrameworks: ['PCI-DSS', 'Internal Policy'],
    triggerConditions: ['Connection attempt from development to production'],
    actions: ['Block connection', 'Log attempt', 'Alert security team'],
    affectedSystems: ['Network infrastructure', 'Firewall rules'],
    createdBy: 'system',
    approvalStatus: 'pending'
  }
];

// Compliance Frameworks
export const complianceFrameworks: ComplianceFramework[] = [
  {
    id: 'cmp-001',
    name: 'NIST 800-53',
    description: 'Security and Privacy Controls for Federal Information Systems and Organizations',
    category: 'Government',
    status: 'partially-compliant',
    compliance: 87,
    controls: 1252,
    passedControls: 1089,
    lastAssessed: daysAgo(15)
  },
  {
    id: 'cmp-002',
    name: 'PCI-DSS',
    description: 'Payment Card Industry Data Security Standard',
    category: 'Financial',
    status: 'compliant',
    compliance: 100,
    controls: 281,
    passedControls: 281,
    lastAssessed: daysAgo(30)
  },
  {
    id: 'cmp-003',
    name: 'HIPAA',
    description: 'Health Insurance Portability and Accountability Act',
    category: 'Healthcare',
    status: 'partially-compliant',
    compliance: 92,
    controls: 157,
    passedControls: 144,
    lastAssessed: daysAgo(45)
  },
  {
    id: 'cmp-004',
    name: 'GDPR',
    description: 'General Data Protection Regulation',
    category: 'Privacy',
    status: 'partially-compliant',
    compliance: 85,
    controls: 87,
    passedControls: 74,
    lastAssessed: daysAgo(60)
  },
  {
    id: 'cmp-005',
    name: 'ISO 27001',
    description: 'Information Security Management System Standard',
    category: 'International',
    status: 'partially-compliant',
    compliance: 95,
    controls: 114,
    passedControls: 108,
    lastAssessed: daysAgo(10)
  },
  {
    id: 'cmp-006',
    name: 'SOC 2',
    description: 'Service Organization Control 2',
    category: 'Service Providers',
    status: 'non-compliant',
    compliance: 78,
    controls: 64,
    passedControls: 50,
    lastAssessed: daysAgo(90)
  }
];

// Security Metrics
export const securityMetrics: SecurityMetric[] = [
  { name: 'Overall Risk Score', value: 68, trend: 'down', change: 7 },
  { name: 'Active Anomalies', value: 12, trend: 'up', change: 3 },
  { name: 'Policy Violations', value: 6, trend: 'down', change: 2 },
  { name: 'Mean Time to Detect', value: 2.3, trend: 'down', change: 0.5 }, // hours
  { name: 'Mean Time to Respond', value: 4.1, trend: 'stable', change: 0 }, // hours
];

// Integration Systems
export const integrationSystems: IntegrationSystem[] = [
  {
    id: 'int-001',
    name: 'Splunk SIEM',
    type: 'siem',
    status: 'connected',
    lastSync: daysAgo(0),
    description: 'Enterprise SIEM solution for event correlation',
    dataFlowDirection: 'bidirectional'
  },
  {
    id: 'int-002',
    name: 'Palo Alto Firewall',
    type: 'firewall',
    status: 'connected',
    lastSync: daysAgo(0),
    description: 'Next-generation firewall for network protection',
    dataFlowDirection: 'inbound'
  },
  {
    id: 'int-003',
    name: 'Okta IAM',
    type: 'iam',
    status: 'connected',
    lastSync: daysAgo(0),
    description: 'Identity and access management solution',
    dataFlowDirection: 'bidirectional'
  },
  {
    id: 'int-004',
    name: 'CrowdStrike EDR',
    type: 'edr',
    status: 'error',
    lastSync: daysAgo(2),
    description: 'Endpoint detection and response solution',
    dataFlowDirection: 'inbound'
  },
  {
    id: 'int-005',
    name: 'AWS Security Hub',
    type: 'other',
    status: 'connected',
    lastSync: daysAgo(0),
    description: 'Cloud security posture management',
    dataFlowDirection: 'inbound'
  },
  {
    id: 'int-006',
    name: 'Microsoft Defender for Cloud',
    type: 'other',
    status: 'disconnected',
    lastSync: daysAgo(5),
    description: 'Azure security monitoring and management',
    dataFlowDirection: 'bidirectional'
  }
];

// Risk Score History (for trend chart)
export const riskScoreHistory: RiskScoreHistory[] = [
  { date: daysAgo(30), score: 78 },
  { date: daysAgo(27), score: 76 },
  { date: daysAgo(24), score: 79 },
  { date: daysAgo(21), score: 82 },
  { date: daysAgo(18), score: 80 },
  { date: daysAgo(15), score: 77 },
  { date: daysAgo(12), score: 75 },
  { date: daysAgo(9), score: 72 },
  { date: daysAgo(6), score: 70 },
  { date: daysAgo(3), score: 73 },
  { date: daysAgo(0), score: 68 },
];

// Users with risk scores
export const users: User[] = [
  {
    id: 'usr-001',
    name: 'Ajay Patel',
    role: 'System Administrator',
    department: 'IT',
    riskScore: 85,
    riskLevel: 'high',
    anomalies: 3,
    lastActivity: daysAgo(0)
  },
  {
    id: 'usr-002',
    name: 'Priya Sharma',
    role: 'Financial Analyst',
    department: 'Finance',
    riskScore: 75,
    riskLevel: 'high',
    anomalies: 2,
    lastActivity: daysAgo(0)
  },
  {
    id: 'usr-003',
    name: 'Rahul Joshi',
    role: 'Software Developer',
    department: 'Engineering',
    riskScore: 45,
    riskLevel: 'medium',
    anomalies: 1,
    lastActivity: daysAgo(1)
  },
  {
    id: 'usr-004',
    name: 'Meera Gupta',
    role: 'HR Manager',
    department: 'Human Resources',
    riskScore: 30,
    riskLevel: 'low',
    anomalies: 0,
    lastActivity: daysAgo(0)
  },
  {
    id: 'usr-005',
    name: 'Vikram Malhotra',
    role: 'CEO',
    department: 'Executive',
    riskScore: 60,
    riskLevel: 'medium',
    anomalies: 1,
    lastActivity: daysAgo(2)
  }
];

// Devices with risk scores
export const devices: Device[] = [
  {
    id: 'dev-001',
    name: 'WS-543',
    type: 'Workstation',
    os: 'Windows 10',
    ipAddress: '192.168.1.45',
    lastSeen: daysAgo(0),
    compliance: 65,
    riskScore: 90,
    riskLevel: 'critical',
    status: 'online'
  },
  {
    id: 'dev-002',
    name: 'LT-287',
    type: 'Laptop',
    os: 'MacOS 12',
    ipAddress: '192.168.1.87',
    lastSeen: daysAgo(0),
    compliance: 85,
    riskScore: 45,
    riskLevel: 'medium',
    status: 'online'
  },
  {
    id: 'dev-003',
    name: 'SRV-DB-001',
    type: 'Server',
    os: 'Ubuntu 20.04',
    ipAddress: '10.0.0.15',
    lastSeen: daysAgo(0),
    compliance: 95,
    riskScore: 25,
    riskLevel: 'low',
    status: 'online'
  },
  {
    id: 'dev-004',
    name: 'NET-FW-001',
    type: 'Firewall',
    os: 'PAN-OS 10.1',
    ipAddress: '10.0.0.1',
    lastSeen: daysAgo(0),
    compliance: 100,
    riskScore: 15,
    riskLevel: 'low',
    status: 'online'
  },
  {
    id: 'dev-005',
    name: 'LT-432',
    type: 'Laptop',
    os: 'Windows 11',
    ipAddress: '192.168.1.102',
    lastSeen: daysAgo(5),
    compliance: 70,
    riskScore: 60,
    riskLevel: 'medium',
    status: 'offline'
  }
];

// System health metrics
export const systemHealth: SystemHealth[] = [
  { name: 'CPU Usage', value: 42, status: 'healthy' },
  { name: 'Memory Usage', value: 65, status: 'healthy' },
  { name: 'Disk Space', value: 78, status: 'healthy' },
  { name: 'Network Bandwidth', value: 55, status: 'healthy' },
  { name: 'API Response Time', value: 250, status: 'healthy' }, // milliseconds
];

