import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { TrendPoint } from '../types/clinical';
interface TrendChartProps {
  data: TrendPoint[];
}
export function TrendChart({
  data
}: TrendChartProps) {
  return <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{
        top: 10,
        right: 10,
        left: 0,
        bottom: 0
      }}>
          <defs>
            <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
          <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{
          fill: '#6B7280',
          fontSize: 12
        }} dy={10} />
          <YAxis axisLine={false} tickLine={false} tick={{
          fill: '#6B7280',
          fontSize: 12
        }} domain={[0, 100]} />
          <Tooltip contentStyle={{
          borderRadius: '8px',
          border: 'none',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
        }} cursor={{
          stroke: '#3B82F6',
          strokeWidth: 2
        }} />
          <Area type="monotone" dataKey="score" stroke="#3B82F6" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" activeDot={{
          r: 6,
          strokeWidth: 0
        }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>;
}