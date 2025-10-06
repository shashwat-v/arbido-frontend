import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, TrendingUp, Target, TrendingDown, Hash } from "lucide-react";

const metrics = [
  { 
    label: "Total P&L", 
    value: "₹4,440", 
    icon: DollarSign, 
    color: "text-success",
    bgColor: "bg-success/10"
  },
  { 
    label: "Sharpe Ratio", 
    value: "1.85", 
    icon: TrendingUp, 
    color: "text-chart-1",
    bgColor: "bg-chart-1/10"
  },
  { 
    label: "Win Rate", 
    value: "68%", 
    icon: Target, 
    color: "text-chart-2",
    bgColor: "bg-chart-2/10"
  },
  { 
    label: "Max Drawdown", 
    value: "5.2%", 
    icon: TrendingDown, 
    color: "text-destructive",
    bgColor: "bg-destructive/10"
  },
  { 
    label: "Total Trades", 
    value: "25", 
    icon: Hash, 
    color: "text-chart-3",
    bgColor: "bg-chart-3/10"
  },
];

export const BacktestSummary = () => {
  return (
    <Card className="glass-card animate-slide-up" style={{ animationDelay: "0.6s" }}>
      <CardHeader>
        <CardTitle className="text-lg">Backtest Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-3">
          {metrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <div 
                key={metric.label}
                className={`flex items-center gap-4 p-3 rounded-lg border ${metric.bgColor} border-border/30 hover:border-border/60 transition-colors`}
              >
                <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${metric.bgColor} border border-border/30`}>
                  <Icon className={`w-5 h-5 ${metric.color}`} />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">{metric.label}</p>
                  <p className={`text-lg font-bold data-font ${metric.color}`}>{metric.value}</p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
