import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ComparisonPoint } from '../types/clinical';
interface ComparisonChartProps {
  data: ComparisonPoint[];
}
export function ComparisonChart({
  data
}: ComparisonChartProps) {
  return <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5
      }} barGap={8}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
          <XAxis dataKey="metric" axisLine={false} tickLine={false} tick={{
          fill: '#6B7280',
          fontSize: 12
        }} dy={10} />
          <YAxis axisLine={false} tickLine={false} tick={{
          fill: '#6B7280',
          fontSize: 12
        }} domain={[0, 100]} />
          <Tooltip cursor={{
          fill: '#F3F4F6'
        }} contentStyle={{
          borderRadius: '8px',
          border: 'none',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
        }} />
          <Legend wrapperStyle={{
          paddingTop: '20px'
        }} iconType="circle" />
          <Bar dataKey="patient" name="Patient" fill="#3B82F6" radius={[4, 4, 0, 0]} barSize={32} />
          <Bar dataKey="native" name="Native Speaker Avg" fill="#E5E7EB" radius={[4, 4, 0, 0]} barSize={32} />
        </BarChart>
      </ResponsiveContainer>
    </div>;
}