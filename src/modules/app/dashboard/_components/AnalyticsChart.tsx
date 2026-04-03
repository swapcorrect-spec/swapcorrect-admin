import { Box, Text } from "@chakra-ui/react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface AnalyticsChartProps {
  chartData: { month: string; value: number }[];
}

export const AnalyticsChart: React.FC<AnalyticsChartProps> = ({ chartData }) => {
  return (
    <>
      <Text fontSize="14px" color="#737373" mb="16px" fontWeight={500}>
        1 Week Avg.
      </Text>
      <Box height="250px" width="100%">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#EAEAEA" />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 12, fill: "#737373" }}
              stroke="#EAEAEA"
            />
            <YAxis
              tick={{ fontSize: 12, fill: "#737373" }}
              stroke="#EAEAEA"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #EAEAEA",
                borderRadius: "8px",
              }}
            />
            <Bar
              dataKey="value"
              fill="#007AFF"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </>
  );
};

