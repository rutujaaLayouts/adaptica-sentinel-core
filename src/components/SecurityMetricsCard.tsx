
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Metric {
  name: string;
  value: number;
  trend: 'up' | 'down' | 'stable';
  change: number;
}

interface SecurityMetricsCardProps {
  metrics: Metric[];
}

const SecurityMetricsCard: React.FC<SecurityMetricsCardProps> = ({ metrics }) => {
  const getTrendArrow = (trend: string) => {
    if (trend === 'up') return '↑';
    if (trend === 'down') return '↓';
    return '→';
  };

  const getTrendColor = (trend: string, isPositive: boolean) => {
    // For some metrics like "Mean Time to Detect", down is good
    if (trend === 'up') return isPositive ? 'text-green-500' : 'text-red-500';
    if (trend === 'down') return isPositive ? 'text-red-500' : 'text-green-500';
    return 'text-gray-500';
  };

  const renderMetric = (metric: Metric) => {
    // For these metrics, "down" is actually good
    const invertedMetrics = ['Mean Time to Detect', 'Mean Time to Respond', 'Policy Violations', 'Active Anomalies'];
    const isPositiveWhenDown = invertedMetrics.includes(metric.name);

    return (
      <div key={metric.name} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
        <span className="text-sm font-medium">{metric.name}</span>
        <div className="flex items-center">
          <span className="text-sm font-bold mr-2">
            {typeof metric.value === 'number' && metric.name.includes('Time') ? `${metric.value}h` : metric.value}
          </span>
          <span className={getTrendColor(metric.trend, !isPositiveWhenDown)}>
            {getTrendArrow(metric.trend)} 
            {metric.change > 0 && metric.change}
          </span>
        </div>
      </div>
    );
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Key Security Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        {metrics.map(metric => renderMetric(metric))}
      </CardContent>
    </Card>
  );
};

export default SecurityMetricsCard;
