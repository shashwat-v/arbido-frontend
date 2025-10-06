import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TrendingUp } from "lucide-react";

const data = [
  { date: "Jan 1", stock1: 150, stock2: 280 },
  { date: "Jan 8", stock1: 155, stock2: 285 },
  { date: "Jan 15", stock1: 152, stock2: 278 },
  { date: "Jan 22", stock1: 160, stock2: 295 },
  { date: "Jan 29", stock1: 158, stock2: 290 },
  { date: "Feb 5", stock1: 165, stock2: 305 },
  { date: "Feb 12", stock1: 162, stock2: 298 },
  { date: "Feb 19", stock1: 170, stock2: 315 },
];

export const PriceChart = () => {
  return (
    <Card className="glass-card animate-slide-up" style={{ animationDelay: "0.3s" }}>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-chart-1" />
          Price Series
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
            <Line 
              type="monotone" 
              dataKey="stock1" 
              stroke="hsl(var(--chart-1))" 
              strokeWidth={2}
              name="AAPL"
              dot={{ fill: "hsl(var(--chart-1))", r: 3 }}
              activeDot={{ r: 5 }}
            />
            <Line 
              type="monotone" 
              dataKey="stock2" 
              stroke="hsl(var(--chart-2))" 
              strokeWidth={2}
              name="MSFT"
              dot={{ fill: "hsl(var(--chart-2))", r: 3 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
