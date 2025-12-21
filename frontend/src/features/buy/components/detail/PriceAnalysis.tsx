import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import styles from "./PriceAnalysis.module.css";
import type { Post } from "@/types/realestate";
import { formatPrice } from "@/utils/format";
import { usePredictPrice } from "@/features/buy/hooks/usePredictPrice";

export const PriceAnalysis = ({ post }: { post: Post }) => {
  const { predictedPrice, isLoading, error } = usePredictPrice(post.id);

  const aiPrice = predictedPrice || 0;
  const listingPrice = post.price;

  const data = [
    {
      name: "Giá tin đăng",
      value: listingPrice,
      color: "#3b82f6",
    },
    {
      name: "Giá dự báo",
      value: aiPrice,
      color: aiPrice > listingPrice ? "#22c55e" : "#ef4444",
    },
  ];

  const priceDiff = listingPrice - aiPrice;
  const isOverpriced = priceDiff > 0;
  const diffPercent = aiPrice > 0 ? (Math.abs(priceDiff) / aiPrice) * 100 : 0;

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div
          className={styles.customTooltip}
          style={{
            background: "#fff",
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "8px",
          }}
        >
          <p className={styles.tooltipLabel} style={{ fontWeight: "bold", marginBottom: "4px" }}>
            {payload[0].payload.name}
          </p>
          <p className={styles.tooltipValue} style={{ color: payload[0].payload.color }}>
            {formatPrice(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <aside className={styles.card}>
      <div className={styles.header}>
        <div className={styles.titleGroup}>
          <h3>Phân tích giá trị</h3>
          <span className={styles.subtitle}>So sánh giá tin đăng và giá dự báo</span>
        </div>

        {!isLoading && aiPrice > 0 && (
          <span className={`${styles.badge} ${isOverpriced ? styles.decrease : styles.increase}`}>
            {isOverpriced ? "▲ " : "▼ "} {diffPercent.toFixed(1)}%
          </span>
        )}
      </div>

      <div className={styles.chartWrapper} style={{ height: "300px" }}>
        {isLoading ? (
          <div style={{ display: "grid", placeItems: "center", height: "100%", color: "#888" }}>
            Đang phân tích dữ liệu...
          </div>
        ) : error ? (
          <div style={{ display: "grid", placeItems: "center", height: "100%", color: "#ef4444" }}>
            Không thể dự đoán giá BĐS này
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              barSize={90}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />

              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#64748b", fontSize: 12, fontWeight: 500 }}
                dy={10}
              />

              <YAxis
                hide={false}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: "#64748b" }}
                tickFormatter={(value) => {
                  if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(1)} tỷ`;
                  return `${(value / 1_000_000).toFixed(0)} tr`;
                }}
              />

              <Tooltip content={<CustomTooltip />} cursor={{ fill: "transparent" }} />

              <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </aside>
  );
};

export default PriceAnalysis;
