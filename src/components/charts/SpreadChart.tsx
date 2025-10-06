import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from "recharts";
import { Activity } from "lucide-react";

const data = [
  { date: "Jan 1", spread: 5.2, zscore: 0.5 },
  { date: "Jan 8", spread: 8.5, zscore: 1.2 },
  { date: "Jan 15", spread: 12.3, zscore: 2.1 },
  { date: "Jan 22", spread: 6.8, zscore: 0.8 },
  { date: "Jan 29", spread: 3.2, zscore: -0.3 },
  { date: "Feb 5", spread: 1.5, zscore: -1.5 },
  { date: "Feb 12", spread: 7.8, zscore: 1.5 },
  { date: "Feb 19", spread: 10.5, zscore: 2.0 },
];

export const SpreadChart = () => {
  return (
    <Card className="glass-card animate-slide-up" style={{ animationDelay: "0.4s" }}>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Activity className="w-5 h-5 text-chart-4" />
          Spread & Z-Score
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
            <XAxis 
              dataKey="date" 
              stroke="hsl(var(--muted-foreground))" 
              fontSize={12}
              tickLine={false}
            />
            <YAxis 
              yAxisId="left"
              stroke="hsl(var(--muted-foreground))" 
              fontSize={12}
              tickLine={false}
            />
            <YAxis 
              yAxisId="right"
              orientation="right"
              stroke="hsl(var(--muted-foreground))" 
              fontSize={12}
              tickLine={false}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                backdropFilter: "blur(12px)",
              }}
            />
            <Legend />
            <ReferenceLine 
              yAxisId="right" 
              y={2} 
              stroke="hsl(var(--destructive))" 
              strokeDasharray="3 3" 
              label={{ value: "+2σ", position: "right", fill: "hsl(var(--destructive))" }}
            />
            <ReferenceLine 
              yAxisId="right" 
              y={-2} 
              stroke="hsl(var(--destructive))" 
              strokeDasharray="3 3"
              label={{ value: "-2σ", position: "right", fill: "hsl(var(--destructive))" }}
            />
            <ReferenceLine 
              yAxisId="right" 
              y={0} 
              stroke="hsl(var(--muted-foreground))" 
              strokeDasharray="3 3"
            />
            <Line 
              yAxisId="left"
              type="monotone" 
              dataKey="spread" 
              stroke="hsl(var(--chart-4))" 
              strokeWidth={2}
              name="Spread"
              dot={{ fill: "hsl(var(--chart-4))", r: 3 }}
            />
            <Line 
              yAxisId="right"
              type="monotone" 
              dataKey="zscore" 
              stroke="hsl(var(--chart-1))" 
              strokeWidth={2}
              name="Z-Score"
              dot={{ fill: "hsl(var(--chart-1))", r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
