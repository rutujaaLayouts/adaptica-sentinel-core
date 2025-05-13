
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

interface RiskTrendChartProps {
  data: Array<{
    date: string;
    score: number;
  }>;
}

const RiskTrendChart: React.FC<RiskTrendChartProps> = ({ data }) => {
  // Format the dates for better display
  const formattedData = data.map(item => {
    const date = new Date(item.date);
    return {
      ...item,
      displayDate: `${date.getMonth() + 1}/${date.getDate()}`
    };
  });

  const getScoreColor = (score: number) => {
    if (score >= 80) return '#ef4444'; // red-500
    if (score >= 60) return '#eab308'; // yellow-500
    return '#22c55e'; // green-500
  };

  // Calculate average score
  const avgScore = Math.round(formattedData.reduce((sum, item) => sum + item.score, 0) / formattedData.length);

  const customTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const score = payload[0].value;
      const scoreColor = getScoreColor(score);
      
      return (
        <div className="bg-background border border-border rounded p-2 shadow-lg">
          <p className="text-sm font-medium">{`Date: ${label}`}</p>
          <p className="text-sm" style={{ color: scoreColor }}>{`Risk Score: ${score}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Risk Score Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={formattedData}
              margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.5} />
              <XAxis dataKey="displayDate" tick={{ fontSize: 12 }} stroke="var(--muted-foreground)" />
              <YAxis 
                domain={[0, 100]} 
                tick={{ fontSize: 12 }} 
                stroke="var(--muted-foreground)"
                ticks={[0, 25, 50, 75, 100]}
              />
              <Tooltip content={customTooltip} />
              <ReferenceLine y={60} stroke="#eab308" strokeDasharray="3 3" label={{ value: 'Medium Risk', position: 'insideBottomRight', fill: '#eab308', fontSize: 10 }} />
              <ReferenceLine y={80} stroke="#ef4444" strokeDasharray="3 3" label={{ value: 'High Risk', position: 'insideTopRight', fill: '#ef4444', fontSize: 10 }} />
              <Line
                type="monotone"
                dataKey="score"
                stroke="var(--primary)"
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5, stroke: 'var(--background)', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-2 text-center">
          <span className="text-sm text-muted-foreground">
            Average Risk Score: <span className="font-medium" style={{ color: getScoreColor(avgScore) }}>{avgScore}</span>
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default RiskTrendChart;
