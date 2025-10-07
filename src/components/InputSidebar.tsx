// src/components/InputSidebar.tsx
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Calendar as CalendarIcon, Play, TrendingUp } from "lucide-react";
import { toast } from "sonner";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import type { DateRange } from "react-day-picker";
import { useMetricsStore } from "@/store/useMetricsStore";

import TickerSelector from "@/components/TickerSelector";

export const InputSidebar = () => {
  // 🔹 Default tickers simplified
  const [ticker1, setTicker1] = useState("AAPL");
  const [ticker2, setTicker2] = useState("MSFT");
  const [zScore, setZScore] = useState([2]);
  const [capital, setCapital] = useState("100000");
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(2023, 0, 1),
    to: new Date(2024, 0, 1),
  });

  const { runCalculation, status, error } = useMetricsStore();
  const isLoading = status === "running" || status === "pending";

  useEffect(() => {
    if (status === "success") {
      toast.success("Backtest completed successfully!");
    } else if (status === "error") {
      toast.error("❌ Backtest failed", {
        description: error || "Unexpected error occurred.",
      });
    }
  }, [status, error]);

  // 🔹 simplified handleSubmit
  const handleSubmit = async () => {
    if (!ticker1 || !ticker2) {
      toast.error("Please select or type both tickers.");
      return;
    }
    if (ticker1 === ticker2) {
      toast.error("Tickers must be different.");
      return;
    }

    const formattedTicker1 = `NSE:${ticker1}-EQ`;
    const formattedTicker2 = `NSE:${ticker2}-EQ`;

    const startDate = dateRange?.from
      ? format(dateRange.from, "yyyy-MM-dd")
      : "";
    const endDate = dateRange?.to ? format(dateRange.to, "yyyy-MM-dd") : "";
    const capitalAlloc = Number(capital);
    const zScoreNum = Number(zScore[0]);

    toast.success("Running backtest...", {
      description: `Analyzing ${ticker1} vs ${ticker2}`,
    });

    try {
      await runCalculation(
        formattedTicker1,
        formattedTicker2,
        startDate,
        endDate,
        capitalAlloc,
        zScoreNum
      );
    } catch (err) {
      toast.error("❌ Backtest failed", {
        description: error || "Unexpected error occurred.",
      });
    }
  };

  return (
    <div className="w-full lg:w-80 space-y-4 p-4">
      {/* Trade Inputs */}
      <Card className="glass-card animate-slide-up">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <TrendingUp className="w-5 h-5 text-primary" />
            Trade Inputs
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* ✅ Ticker 1 */}
          <TickerSelector
            label="Ticker 1"
            value={ticker1}
            onSelect={setTicker1}
            placeholder="Type symbol or pick from list (e.g., RELIANCE)"
          />

          {/* ✅ Ticker 2 */}
          <TickerSelector
            label="Ticker 2"
            value={ticker2}
            onSelect={setTicker2}
            placeholder="Type symbol or pick from list"
          />

          {/* ✅ Date Range Picker */}
          <div className="space-y-2">
            <Label htmlFor="daterange" className="flex items-center gap-2">
              <CalendarIcon className="w-4 h-4" />
              Date Range
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal bg-background/50 border-border/50",
                    !dateRange && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="h-4 w-4" />
                  {dateRange?.from ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, "MMM dd, yyyy")} -{" "}
                        {format(dateRange.to, "MMM dd, yyyy")}
                      </>
                    ) : (
                      format(dateRange.from, "MMM dd, yyyy")
                    )
                  ) : (
                    <span>Pick a date range</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={dateRange?.from}
                  selected={dateRange}
                  onSelect={setDateRange}
                  numberOfMonths={2}
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
        </CardContent>
      </Card>

      {/* Parameters */}
      <Card
        className="glass-card animate-slide-up"
        style={{ animationDelay: "0.1s" }}
      >
        <CardHeader>
          <CardTitle className="text-lg">Parameters</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Z-Score */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="zscore">Z-Score Threshold</Label>
              <span className="text-sm font-mono text-primary">
                {zScore[0].toFixed(1)}
              </span>
            </div>
            <Slider
              id="zscore"
              min={-3}
              max={3}
              step={0.1}
              value={zScore}
              onValueChange={setZScore}
              className="py-2"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>-3.0</span>
              <span>0</span>
              <span>3.0</span>
            </div>
          </div>

          {/* Capital */}
          <div className="space-y-2">
            <Label htmlFor="capital">Capital Allocation</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                ₹
              </span>
              <input
                id="capital"
                type="text"
                value={capital}
                onChange={(e) => setCapital(e.target.value)}
                className="pl-7 w-full bg-background/50 border-border/50 rounded"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Run Button */}
      <Button
        onClick={handleSubmit}
        disabled={isLoading}
        className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg rounded-xl shadow-lg hover:shadow-primary/20 transition-all duration-300"
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            Processing...
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Play className="w-5 h-5" />
            Run Backtest
          </div>
        )}
      </Button>
    </div>
  );
};
