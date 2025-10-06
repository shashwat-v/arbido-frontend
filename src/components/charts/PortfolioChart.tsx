import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Wallet } from "lucide-react";

const data = [
  { date: "Jan 1", value: 100000 },
  { date: "Jan 8", value: 101200 },
  { date: "Jan 15", value: 103500 },
  { date: "Jan 22", value: 102800 },
  { date: "Jan 29", value: 105200 },
  { date: "Feb 5", value: 107800 },
  { date: "Feb 12", value: 106500 },
  { date: "Feb 19", value: 110200 },
];

export const PortfolioChart = () => {
  const totalReturn = ((data[data.length - 1].value - data[0].value) / data[0].value * 100).toFixed(2);

  return (
    <Card className="glass-card animate-slide-up" style={{ animationDelay: "0.5s" }}>
      <CardHeader>
        <CardTitle className="text-lg flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wallet className="w-5 h-5 text-chart-3" />
            Portfolio Value
          </div>
          <div className="text-sm font-normal">
            <span className="text-muted-foreground">Return: </span>
            <span className="stat-positive data-font">+{totalReturn}%</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--chart-3))" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(var(--chart-3))" stopOpacity={0}/>
              </linearGradient>
            </defs>
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
              tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                backdropFilter: "blur(12px)",
              }}
              formatter={(value: number) => [`₹${value.toLocaleString()}`, "Portfolio Value"]}
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="hsl(var(--chart-3))" 
              strokeWidth={2}
              fill="url(#colorValue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
