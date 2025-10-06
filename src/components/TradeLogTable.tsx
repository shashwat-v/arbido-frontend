import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText } from "lucide-react";

const trades = [
  { date: "2024-01-15", action: "BUY", stock: "AAPL", zScore: 2.15, pnl: 1250 },
  { date: "2024-01-20", action: "SELL", stock: "MSFT", zScore: -1.85, pnl: -450 },
  { date: "2024-02-01", action: "BUY", stock: "AAPL", zScore: 2.45, pnl: 2100 },
  { date: "2024-02-10", action: "SELL", stock: "MSFT", zScore: -2.10, pnl: 890 },
  { date: "2024-02-22", action: "BUY", stock: "AAPL", zScore: 1.95, pnl: 650 },
];

export const TradeLogTable = () => {
  return (
    <Card className="glass-card animate-slide-up" style={{ animationDelay: "0.2s" }}>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <FileText className="w-5 h-5 text-primary" />
          Trade Log
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          <Table>
            <TableHeader>
              <TableRow className="border-border/50">
                <TableHead className="text-xs">Date</TableHead>
                <TableHead className="text-xs">Action</TableHead>
                <TableHead className="text-xs">Stock</TableHead>
                <TableHead className="text-xs">Z-Score</TableHead>
                <TableHead className="text-xs text-right">P&L</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {trades.map((trade, idx) => (
                <TableRow key={idx} className="border-border/30 hover:bg-muted/20">
                  <TableCell className="text-xs data-font">{trade.date}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={trade.action === "BUY" ? "default" : "destructive"}
                      className="text-xs"
                    >
                      {trade.action}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs font-medium">{trade.stock}</TableCell>
                  <TableCell className="text-xs data-font">{trade.zScore.toFixed(2)}</TableCell>
                  <TableCell className={`text-xs data-font text-right font-semibold ${
                    trade.pnl >= 0 ? "stat-positive" : "stat-negative"
                  }`}>
                    {trade.pnl >= 0 ? "+" : ""}{trade.pnl.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
