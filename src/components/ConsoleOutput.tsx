import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Terminal, AlertCircle, BarChart3, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

const consoleData = {
  errors: [
    { time: "14:23:45", message: "No errors detected" },
  ],
  analysis: [
    "✓ Correlation test passed (r=0.85, p<0.001)",
    "✓ Cointegration test passed (p=0.03)",
    "✓ Stationarity verified using ADF test",
    "⚠ High volatility detected in recent periods",
  ],
  json: `{
  "pair": ["AAPL", "MSFT"],
  "correlation": 0.85,
  "cointegration_pvalue": 0.03,
  "hedge_ratio": 1.24,
  "current_zscore": 2.15,
  "signal": "BUY_STOCK1_SELL_STOCK2",
  "backtest": {
    "total_pnl": 4440,
    "sharpe_ratio": 1.85,
    "win_rate": 0.68,
    "max_drawdown": 0.052,
    "num_trades": 25
  }
}`,
};

export const ConsoleOutput = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="glass-card animate-slide-up" style={{ animationDelay: "0.7s" }}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Terminal className="w-5 h-5 text-primary" />
            Console Output
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="h-8"
          >
            {isExpanded ? (
              <>
                <ChevronDown className="w-4 h-4 mr-1" />
                Collapse
              </>
            ) : (
              <>
                <ChevronUp className="w-4 h-4 mr-1" />
                Expand
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isExpanded && (
          <Tabs defaultValue="analysis" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="errors" className="text-xs">
                <AlertCircle className="w-3 h-3 mr-1" />
                Errors
              </TabsTrigger>
              <TabsTrigger value="analysis" className="text-xs">
                <BarChart3 className="w-3 h-3 mr-1" />
                Analysis
              </TabsTrigger>
              <TabsTrigger value="json" className="text-xs">
                <Code className="w-3 h-3 mr-1" />
                JSON
              </TabsTrigger>
            </TabsList>

            <TabsContent value="errors">
              <ScrollArea className="h-[150px]">
                <div className="space-y-2 font-mono text-xs">
                  {consoleData.errors.map((error, idx) => (
                    <div key={idx} className="flex gap-2 text-success">
                      <span className="text-muted-foreground">[{error.time}]</span>
                      <span>{error.message}</span>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="analysis">
              <ScrollArea className="h-[150px]">
                <div className="space-y-2 font-mono text-xs">
                  {consoleData.analysis.map((line, idx) => (
                    <div key={idx} className={line.startsWith("⚠") ? "text-accent" : "text-foreground"}>
                      {line}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="json">
              <ScrollArea className="h-[150px]">
                <pre className="font-mono text-xs text-foreground">
                  {consoleData.json}
                </pre>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        )}
        {!isExpanded && (
          <p className="text-xs text-muted-foreground text-center">
            Click expand to view console output
          </p>
        )}
      </CardContent>
    </Card>
  );
};
