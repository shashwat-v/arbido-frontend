"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useMetricsStore } from "@/store/useMetricsStore";
import { Loader2 } from "lucide-react";

export const GlobalLoader = () => {
  const { status } = useMetricsStore();
  const show = status === "running" || status === "pending";

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 150 }}
            className="flex flex-col items-center gap-4 rounded-2xl bg-white dark:bg-gray-900 px-10 py-8 shadow-2xl"
          >
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Running Backtest...
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Please wait while we process your data.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
