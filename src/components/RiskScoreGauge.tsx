
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface RiskScoreGaugeProps {
  score: number;
  trend: 'up' | 'down' | 'stable';
  change: number;
}

const RiskScoreGauge: React.FC<RiskScoreGaugeProps> = ({ score, trend, change }) => {
  const getScoreColor = () => {
    if (score >= 80) return 'text-red-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-green-500';
  };

  const getScoreBackground = () => {
    if (score >= 80) return 'bg-red-100';
    if (score >= 60) return 'bg-yellow-100';
    return 'bg-green-100';
  };

  const getTrendIcon = () => {
    if (trend === 'up') return '↑';
    if (trend === 'down') return '↓';
    return '→';
  };

  const getTrendColor = () => {
    if (trend === 'up') return 'text-red-500';
    if (trend === 'down') return 'text-green-500';
    return 'text-gray-500';
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Organization Risk Score</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center">
          <div className={`w-32 h-32 rounded-full flex items-center justify-center ${getScoreBackground()} mb-4`}>
            <span className={`text-4xl font-bold ${getScoreColor()}`}>{score}</span>
          </div>
        </div>
        <Progress value={score} className="h-2 mb-2" />
        <div className="flex items-center justify-between">
          <span className="text-xs text-green-500">Low Risk</span>
          <span className="text-xs text-yellow-500">Medium</span>
          <span className="text-xs text-red-500">High Risk</span>
        </div>
        <div className="mt-4 flex items-center justify-center">
          <span className={`text-sm font-medium ${getTrendColor()}`}>
            {getTrendIcon()} {change} points {trend === 'down' ? 'improvement' : trend === 'up' ? 'increase' : 'no change'} this week
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default RiskScoreGauge;
