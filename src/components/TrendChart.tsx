import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { TrendPoint } from "../types/clinical";
interface TrendChartProps {
  data: TrendPoint[];
  dataKey?: "score" | "wpm";
  yAxisLabel?: string;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const value = payload[0].value;
    const dataKey = payload[0].dataKey;
    return (
      <div className="bg-white px-4 py-3 rounded-lg shadow-lg border border-gray-200">
        <p className="text-sm font-medium text-gray-900 mb-1">{label}</p>
        <p className="text-lg font-bold text-primary">
          {value} {dataKey === "wpm" ? "WPM" : "%"}
        </p>
        {dataKey === "wpm" && (
          <p
            className="text-xs text-gray-500 mt-1"
            role="status"
            aria-live="polite"
          >
            {value} words per minute
          </p>
        )}
      </div>
    );
  }
  return null;
};

export function TrendChart({
  data,
  dataKey = "score",
  yAxisLabel,
}: TrendChartProps) {
  // Determine appropriate Y-axis domain based on data type
  const domain = dataKey === "wpm" ? [0, 120] : [0, 100];

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#E5E7EB"
          />
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{
              fill: "#6B7280",
              fontSize: 12,
            }}
            dy={10}
            aria-label="Practice sessions"
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{
              fill: "#6B7280",
              fontSize: 12,
            }}
            domain={domain}
            label={
              yAxisLabel
                ? {
                    value: yAxisLabel,
                    angle: -90,
                    position: "insideLeft",
                    style: { fill: "#6B7280", fontSize: 12 },
                  }
                : undefined
            }
            aria-label={
              dataKey === "wpm" ? "Words per minute" : "Score percentage"
            }
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey={dataKey}
            stroke="#3B82F6"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorScore)"
            activeDot={{
              r: 6,
              strokeWidth: 0,
            }}
            aria-label={`${
              dataKey === "wpm" ? "Words per minute" : "Score"
            } trend over time`}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
