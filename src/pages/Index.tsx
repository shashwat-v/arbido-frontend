import { HeaderBar } from "@/components/HeaderBar";
import { InputSidebar } from "@/components/InputSidebar";
import { MetricsPanel } from "@/components/MetricsPanel";
import { TradeSignal } from "@/components/TradeSignal";
import { TradeLogTable } from "@/components/TradeLogTable";
import { PriceChart } from "@/components/charts/PriceChart";
import { SpreadChart } from "@/components/charts/SpreadChart";
import { PortfolioChart } from "@/components/charts/PortfolioChart";
import { BacktestSummary } from "@/components/BacktestSummary";
import { ConsoleOutput } from "@/components/ConsoleOutput";

const Index = () => {
  return (
    <div className="min-h-screen w-full bg-background">
      <HeaderBar />
      
      <div className="pt-16 flex flex-col lg:flex-row w-full">
        {/* Left Sidebar */}
        <aside className="lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] overflow-y-auto">
          <InputSidebar />
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 space-y-6">
          {/* Row 1: Metrics & Trade Signal */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <MetricsPanel />
            <TradeSignal />
            <TradeLogTable />
          </div>

          {/* Row 2: Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <PriceChart />
            <SpreadChart />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <PortfolioChart />
            </div>
            <BacktestSummary />
          </div>

          {/* Console Output */}
          <ConsoleOutput />
        </main>
      </div>
    </div>
  );
};

export default Index;
