import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface PerformanceChartProps {
  totalValue: number;
}

export const PerformanceChart: React.FC<PerformanceChartProps> = ({ totalValue }) => {
  // Generate a realistic 7-day performance trend anchored at totalValue
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Today'];
  const data = days.map((day, idx) => {
    const factor = 1 - (6 - idx) * 0.012 + (Math.sin(idx) * 0.008);
    return {
      name: day,
      value: Number((totalValue * factor).toFixed(2)),
    };
  });

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="perfGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8000FF" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#8000FF" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="name"
            stroke="#6E677F"
            fontSize={11}
            tickLine={false}
            axisLine={{ stroke: '#2A2238' }}
          />
          <YAxis
            stroke="#6E677F"
            fontSize={11}
            tickLine={false}
            axisLine={false}
            domain={['auto', 'auto']}
            tickFormatter={(val) => `$${(val / 1000).toFixed(1)}k`}
          />
          <Tooltip
            formatter={(val: number) => [`$${val.toLocaleString(undefined, { minimumFractionDigits: 2 })}`, 'Portfolio Net Value']}
            contentStyle={{
              backgroundColor: '#171124',
              borderColor: '#2A2238',
              borderRadius: '12px',
              color: '#fff',
              fontSize: '12px',
            }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#D946FF"
            strokeWidth={2.5}
            fillOpacity={1}
            fill="url(#perfGrad)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
