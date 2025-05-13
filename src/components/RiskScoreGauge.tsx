
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingDown, TrendingUp, Minus } from "lucide-react";

interface RiskScoreGaugeProps {
  score: number;
  trend: 'up' | 'down' | 'stable';
  change: number;
}

const RiskScoreGauge: React.FC<RiskScoreGaugeProps> = ({ score, trend, change }) => {
  const getScoreColor = () => {
    if (score >= 80) return 'text-red-500 dark:text-red-400';
    if (score >= 60) return 'text-yellow-500 dark:text-yellow-400';
    return 'text-green-500 dark:text-green-400';
  };

  const getScoreBackground = () => {
    if (score >= 80) return 'bg-red-100 dark:bg-red-900/30';
    if (score >= 60) return 'bg-yellow-100 dark:bg-yellow-900/30';
    return 'bg-green-100 dark:bg-green-900/30';
  };

  const getProgressColor = () => {
    if (score >= 80) return 'bg-red-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getTrendIcon = () => {
    if (trend === 'up') return <TrendingUp className="h-4 w-4" />;
    if (trend === 'down') return <TrendingDown className="h-4 w-4" />;
    return <Minus className="h-4 w-4" />;
  };

  const getTrendColor = () => {
    if (trend === 'up') return 'text-red-500 dark:text-red-400';
    if (trend === 'down') return 'text-green-500 dark:text-green-400';
    return 'text-gray-500 dark:text-gray-400';
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Organization Risk Score</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center">
          <div className={`w-32 h-32 rounded-full flex items-center justify-center ${getScoreBackground()} mb-4 shadow-inner`}>
            <span className={`text-4xl font-bold ${getScoreColor()}`}>{score}</span>
          </div>
        </div>
        <Progress value={score} className={`h-2 mb-2 ${getProgressColor()}`} />
        <div className="flex items-center justify-between text-xs">
          <span className="text-green-500 dark:text-green-400">Low Risk</span>
          <span className="text-yellow-500 dark:text-yellow-400">Medium</span>
          <span className="text-red-500 dark:text-red-400">High Risk</span>
        </div>
        <div className="mt-4 flex items-center justify-center">
          <div className={`inline-flex items-center gap-1 text-sm font-medium ${getTrendColor()} bg-background p-1.5 px-3 rounded-full shadow-sm border border-border`}>
            {getTrendIcon()} 
            <span>
              {change} points {trend === 'down' ? 'improvement' : trend === 'up' ? 'increase' : 'no change'} this week
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RiskScoreGauge;
