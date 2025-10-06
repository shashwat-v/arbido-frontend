import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUp, ArrowDown, TrendingUp } from "lucide-react";

export const TradeSignal = () => {
  const signal = {
    action: "BUY",
    stock1: "AAPL",
    stock2: "MSFT",
    zScore: 2.15,
    direction: "long" as const,
  };

  return (
    <Card className="glass-card animate-slide-up" style={{ animationDelay: "0.1s" }}>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          Trade Signal
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-center gap-6 p-6 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2">
              <ArrowUp className="w-6 h-6 text-success animate-bounce" />
              <span className="text-2xl font-bold text-success">BUY</span>
            </div>
            <span className="text-sm font-medium text-muted-foreground">{signal.stock1}</span>
          </div>

          <div className="h-16 w-px bg-border" />

          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2">
              <ArrowDown className="w-6 h-6 text-destructive animate-bounce" style={{ animationDelay: "0.1s" }}>
              </ArrowDown>
              <span className="text-2xl font-bold text-destructive">SELL</span>
            </div>
            <span className="text-sm font-medium text-muted-foreground">{signal.stock2}</span>
          </div>
        </div>

        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
          <span className="text-sm text-muted-foreground">Latest Z-Score</span>
          <Badge variant="outline" className="data-font text-primary border-primary/30 bg-primary/10">
            {signal.zScore.toFixed(2)}
          </Badge>
        </div>

        <p className="text-xs text-center text-muted-foreground">
          Signal generated based on mean reversion strategy
        </p>
      </CardContent>
    </Card>
  );
};
