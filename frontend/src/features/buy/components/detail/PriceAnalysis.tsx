import { useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import styles from "./PriceAnalysis.module.css";
import type { Post } from "@/types/realestate";
import { formatPrice } from "@/utils/format";

type ChartData = {
  month: string;
  value: number;
};

const generateMockHistory = (currentPrice: number, growthPercent: number): ChartData[] => {
  const data: ChartData[] = [];
  const months = ["Th1", "Th2", "Th3", "Th4", "Th5", "Hôm nay"];
  const startPrice = currentPrice / (1 + growthPercent / 100);

  for (let i = 0; i < 6; i++) {
    let val = startPrice + ((currentPrice - startPrice) * i) / 5;
    if (i < 5) {
      const noise = (Math.random() - 0.5) * (currentPrice * 0.01);
      val += noise;
    }
    data.push({ month: months[i], value: Math.round(val) });
  }
  return data;
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className={styles.customTooltip}>
        <p className={styles.tooltipLabel}>{label}</p>
        <p className={styles.tooltipValue}>{formatPrice(payload[0].value)}</p>
      </div>
    );
  }
  return null;
};

export const PriceAnalysis = ({ post }: { post: Post }) => {
  const { price: listingPrice, marketPrice, priceHistoryPercent } = post;

  const data = useMemo(
    () => generateMockHistory(marketPrice, priceHistoryPercent),
    [marketPrice, priceHistoryPercent]
  );

  const allValues = [...data.map((d) => d.value), listingPrice];
  const minVal = Math.min(...allValues);
  const maxVal = Math.max(...allValues);
  const buffer = maxVal - minVal === 0 ? maxVal * 0.05 : (maxVal - minVal) * 0.2;
  const yAxisDomain = [minVal - buffer, maxVal + buffer];

  return (
    <aside className={styles.card}>
      <div className={styles.header}>
        <div className={styles.titleGroup}>
          <h3>Biểu đồ bất động sản</h3>
          <span className={styles.subtitle}>Dữ liệu thị trường khu vực</span>
        </div>
        <span
          className={`${styles.badge} ${
            priceHistoryPercent >= 0 ? styles.increase : styles.decrease
          }`}
        >
          {priceHistoryPercent >= 0 ? "▲" : "▼"} {Math.abs(priceHistoryPercent)}%
        </span>
      </div>

      <div className={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "#64748b" }}
              dy={10}
            />

            <YAxis
              hide={false}
              domain={yAxisDomain}
              axisLine={false}
              tickLine={false}
              width={45}
              tick={{ fontSize: 10, fill: "#64748b" }}
              tickFormatter={(value) => {
                if (value >= 1_000_000_000) {
                  return `${(value / 1_000_000_000).toFixed(2)}`;
                }
                return `${(value / 1_000_000).toFixed(0)}tr`;
              }}
            />

            <Tooltip content={<CustomTooltip />} />

            <Area
              type="monotone"
              dataKey="value"
              stroke="#3b82f6"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorValue)"
              animationDuration={1500}
            />

            <ReferenceLine
              y={listingPrice}
              stroke="#ef4444"
              strokeDasharray="4 4"
              label={{
                value: "Tin này",
                position: "insideRight",
                fill: "#ef4444",
                fontSize: 11,
                fontWeight: 700,
                dy: -10,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </aside>
  );
};

export default PriceAnalysis;
