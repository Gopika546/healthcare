'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface VitalsChartProps {
  data: Array<{
    date: string;
    bloodPressure: number;
    heartRate: number;
    glucose: number;
  }>;
  metric: 'bloodPressure' | 'heartRate' | 'glucose';
  title: string;
  color?: string;
}

export default function VitalsChart({ data, metric, title, color = '#3B82F6' }: VitalsChartProps) {
  const getUnit = (metric: string) => {
    switch (metric) {
      case 'bloodPressure': return 'mmHg';
      case 'heartRate': return 'bpm';
      case 'glucose': return 'mg/dL';
      default: return '';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{title}</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="date" 
              stroke="#6b7280"
              fontSize={12}
              tickFormatter={(value) => new Date(value).toLocaleDateString()}
            />
            <YAxis 
              stroke="#6b7280"
              fontSize={12}
              label={{ value: getUnit(metric), angle: -90, position: 'insideLeft' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#f9fafb',
                border: '1px solid #e5e7eb',
                borderRadius: '8px'
              }}
              labelFormatter={(value) => `Date: ${new Date(value).toLocaleDateString()}`}
              formatter={(value) => [`${value} ${getUnit(metric)}`, title]}
            />
            <Line
              type="monotone"
              dataKey={metric}
              stroke={color}
              strokeWidth={2}
              dot={{ fill: color, strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: color, strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}