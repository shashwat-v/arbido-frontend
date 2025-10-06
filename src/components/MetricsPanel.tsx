import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import api from "@/services/api";
import { CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";

const metrics = [
  { label: "Correlation", value: 0.85, color: "text-primary", threshold: 0.7 },
  {
    label: "Cointegration",
    value: 0.03,
    color: "text-success",
    threshold: 0.05,
    inverse: true,
  },
  { label: "Hedge Ratio", value: 1.24, color: "text-secondary", max: 2 },
  { label: "Z-Score", value: 2.15, color: "text-accent", max: 3 },
];

// export const MetricsPanel = () => {
//   const [taskStatus, setTaskStatus] = useState("PENDING");
// const taskId = "80d0090f-4c4e-4b60-a507-7fd46195291b"; // replace dynamically

//   useEffect(() => {
//     // Poll every 2 seconds
//     const interval = setInterval(async () => {
//       try {
//         const res = await api.get(`/tasks/${taskId}`);
//         console.log("🔁 Task check:", res.data);
//         setTaskStatus(res.data.task_status);

//         if (res.data.task_status === "SUCCESS") {
//           clearInterval(interval); // stop polling
//           console.log("✅ Task complete, fetching metrics...");
//           const metrics = await api.get(
//             "/pairs-metrics/NSE:RELIANCE-EQ/NSE:TCS-EQ"
//           );
//           console.log("📊 Metrics:", metrics.data);
//         }
//       } catch (err) {
//         console.error("❌ Error checking task:", err);
//       }
//     }, 2000);

//     return () => clearInterval(interval); // cleanup on unmount
//   }, []);

//   return (
//     <div>
//       <h2>Metrics Panel</h2>
//       <p>Task Status: {taskStatus}</p>
//     </div>
//   );
// };

export const MetricsPanel = () => {
  useEffect(() => {
    // Start after 10 seconds
    const timeout = setTimeout(() => {
      const interval = setInterval(async () => {
        api
          .get("/pairs-metrics/NSE:RELIANCE-EQ/NSE:TCS-EQ")
          .then((res) => {
            console.log(res);
            clearInterval(interval);
          })
          .catch((error) => {
            console.log(error);
          });
      }, 2000);

      // Cleanup interval when component unmounts
      return () => clearInterval(interval);
    }, 10000); // 10 seconds = 10000 ms

    // Cleanup timeout when component unmounts
    return () => clearTimeout(timeout);
  }, []);

  return (
    <Card className="glass-card animate-slide-up">
      <CardHeader>
        <CardTitle className="text-lg">Key Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-6 mb-6">
          {metrics.map((metric) => {
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
            <span className="font-semibold">Cointegrated pair detected.</span>{" "}
            Ready to trade with favorable correlation and hedge ratio.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
