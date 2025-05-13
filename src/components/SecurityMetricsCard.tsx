
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

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
    if (trend === 'up') return <TrendingUp className="h-4 w-4" />;
    if (trend === 'down') return <TrendingDown className="h-4 w-4" />;
    return <Minus className="h-4 w-4" />;
  };

  const getTrendColor = (trend: string, isPositive: boolean) => {
    // For some metrics like "Mean Time to Detect", down is good
    if (trend === 'up') return isPositive ? 'text-green-500 dark:text-green-400' : 'text-red-500 dark:text-red-400';
    if (trend === 'down') return isPositive ? 'text-red-500 dark:text-red-400' : 'text-green-500 dark:text-green-400';
    return 'text-gray-500 dark:text-gray-400';
  };

  const renderMetric = (metric: Metric) => {
    // For these metrics, "down" is actually good
    const invertedMetrics = ['Mean Time to Detect', 'Mean Time to Respond', 'Policy Violations', 'Active Anomalies'];
    const isPositiveWhenDown = invertedMetrics.includes(metric.name);

    return (
      <div key={metric.name} className="flex items-center justify-between py-2 border-b border-border last:border-0">
        <span className="text-sm font-medium">{metric.name}</span>
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold">
            {typeof metric.value === 'number' && metric.name.includes('Time') ? `${metric.value}h` : metric.value}
          </span>
          <div className={`flex items-center ${getTrendColor(metric.trend, !isPositiveWhenDown)}`}>
            {getTrendArrow(metric.trend)}
            <span className="text-xs ml-1">
              {metric.change > 0 ? metric.change : ''}
            </span>
          </div>
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
        <div className="space-y-1">
          {metrics.map(metric => renderMetric(metric))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SecurityMetricsCard;
