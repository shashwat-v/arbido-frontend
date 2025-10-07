import { create } from "zustand";
import api from "@/services/api";

interface MetricsState {
  loading: boolean;
  jobId: string | null;
  status: "idle" | "pending" | "running" | "success" | "error" | "queued";
  metrics: any | null;
  error: string | null;

  runCalculation: (
    ticker_1: string,
    ticker_2: string,
    start_date: string,
    end_date: string,
    capital: number,
    z_score: number
  ) => Promise<void>;
  pollJobStatus: (jobId: string, ticker_1: string, ticker_2: string) => void;
  reset: () => void;
}

export const useMetricsStore = create<MetricsState>()((set, get) => ({
  loading: false,
  jobId: null,
  status: "idle",
  metrics: null,
  error: null,

  runCalculation: async (
    ticker_1,
    ticker_2,
    start_date,
    end_date,
    capital,
    z_score
  ) => {
    try {
      set({
        loading: true,
        status: "pending",
        error: null,
        metrics: null,
      });

      const res = await api.post("/pairs-data", {
        ticker_1,
        ticker_2,
        start_date,
        end_date,
        capital,
        z_score,
      });

      const groupId = res.data.group_id;

      if (!groupId) {
        throw new Error("No task_id returned from backend.");
      }

      set({
        jobId: groupId,
        status: "running",
      });

      get().pollJobStatus(groupId, ticker_1, ticker_2);
    } catch (err: any) {
      set({
        loading: false,
        status: "error",
        error:
          err.response?.data?.detail ||
          err.message ||
          "Failed to start calculation task.",
      });
    }
  },

  pollJobStatus: (jobId, ticker_1, ticker_2) => {
    const pollInterval = 3000;

    const poll = async () => {
      try {
        const res = await api.get(`/tasks/${jobId}`);
        const { task_status: taskStatus, task_result: taskResult } = res.data;

        if (
          taskStatus === "PENDING" || // check status from backend
          taskStatus === "STARTED" ||
          taskStatus === "RETRY"
        ) {
          set({ status: "running" });
          setTimeout(poll, pollInterval); // understand this code
        } else if (taskStatus === "SUCCESS") {
          try {
            const metricsRes = await api.get(
              `/pairs-metrics/${ticker_1}/${ticker_2}`
            );

            if (metricsRes.data.error) {
              set({
                loading: false,
                status: "error",
                error: metricsRes.data.error,
              });
            } else {
              set({
                loading: false,
                status: "success",
                metrics: metricsRes.data,
                error: null,
              });
            }
          } catch (fetchErr: any) {
            set({
              loading: false,
              status: "error",
              error:
                fetchErr.response?.data?.detail ||
                fetchErr.message ||
                "Error fetching metrics file.",
            });
          }
        } else if (taskStatus === "FAILURE" || taskStatus === "REVOKED") {
          const backendError =
            taskResult && typeof taskResult === "object"
              ? (taskResult as any).error
              : null;

          set({
            loading: false,
            status: "error",
            error: backendError || `Task failed (${taskStatus})`,
          });
        } else {
          set({
            loading: false,
            status: "error",
            error: `Unknown task status: ${taskStatus}`, // can update these
          });
        }
      } catch (err: any) {
        set({
          loading: false,
          status: "error",
          error:
            err.response?.data?.detail ||
            err.message ||
            "Failed to fetch task status.",
        });
      }
    };

    poll();
  },

  reset: () =>
    set({
      loading: false,
      jobId: null,
      status: "idle",
      metrics: null,
      error: null,
    }),
}));
