import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { useMetricsStore } from "@/store/useMetricsStore";

export const MetricsPanel = () => {
  const { metrics, status, error } = useMetricsStore();

  const [metricsData, setMetricsData] = useState([
    { label: "Correlation", value: 0.8, color: "text-primary", threshold: 0.7 },
    {
      label: "Cointegration",
      value: 1.6,
      color: "text-success",
      threshold: 0.05,
      inverse: true,
    },
    { label: "Hedge Ratio", value: 2.4, color: "text-secondary", max: 2 },
    { label: "Z-Score", value: 2.8, color: "text-accent", max: 3 },
  ]);

  useEffect(() => {
    if (metrics?.summary) {
      const s = metrics.summary;
      setMetricsData((prev) =>
        prev.map((m) => {
          switch (m.label) {
            case "Correlation":
              return { ...m, value: s.correlation ?? m.value };
            case "Cointegration":
              return { ...m, value: s.cointegration ?? m.value };
            case "Hedge Ratio":
              return { ...m, value: s.hedge_ratio ?? m.value };
            case "Z-Score":
              return { ...m, value: s.latest_z_score ?? m.value };
            default:
              return m;
          }
        })
      );
    }
  }, [metrics?.summary]);

  if (status === "error") {
    return (
      <div className="p-4 text-red-500 text-center">
        Error: {error || "Failed to fetch metrics."}
      </div>
    );
  }

  return (
    <Card className="glass-card animate-slide-up">
      <CardHeader>
        <CardTitle className="text-lg">Key Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-6 mb-6">
          {metricsData.map((metric) => {
            const percentage = metric.max
              ? (metric.value / metric.max) * 100
              : metric.value * 100;
            const isGood = metric.inverse
              ? metric.value < metric.threshold!
              : metric.value > (metric.threshold || 0);

            return (
              <div
                key={metric.label}
                className="flex flex-col items-center gap-2"
              >
                <div className="relative w-24 h-24">
                  <svg className="w-24 h-24 transform -rotate-90">
                    <circle
                      cx="48"
                      cy="48"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      className="text-muted/20"
                    />
                    <circle
                      cx="48"
                      cy="48"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 40}`}
                      strokeDashoffset={`${
                        2 * Math.PI * 40 * (1 - percentage / 100)
                      }`}
                      className={`${metric.color} transition-all duration-1000 ease-out`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span
                      className={`text-xl font-bold data-font ${metric.color}`}
                    >
                      {metric.value.toFixed(2)}
                    </span>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-muted-foreground">
                    {metric.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex items-start gap-2 p-3 rounded-lg bg-success/10 border border-success/20">
          <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
          <p className="text-sm text-foreground/90 dark:text-foreground">
            <span className="font-semibold">
              {metrics?.summary?.signal === "HOLD"
                ? "Cointegrated pair detected."
                : `Signal: ${metrics?.summary?.signal}`}
            </span>{" "}
            Ready to trade with favorable correlation and hedge ratio.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
