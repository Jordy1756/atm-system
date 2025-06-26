import { useEffect, useRef } from "react";
import { createChart, ColorType, LineSeries, AreaSeries } from "lightweight-charts";
import Layout from "../layouts/Layout";
import { useCashier } from "../hooks/useCashier";
import CashierServiceSettings from "../components/CashierServiceSettings";
import { calculateQueueingMetrics } from "../utils/handleQueueingMetrics";
import "./index.css";

const Home = () => {
    const {
        serviceRatePerCashier,
        dailyWorkingHours,
        costPerCashierPerHour,
        waitingCostPerCustomerPerHour,
        averageSpendingPerPurchase,
        profitMarginPerSale,
        customerArrivalRate,
    } = useCashier();

    const lineChartRef = useRef<HTMLDivElement>(null);
    const areaChartRef = useRef<HTMLDivElement>(null);

    const generateDataForCashiers = () => {
        const data = [];
        for (let cashiers = 1; cashiers <= 8; cashiers++) {
            const result = calculateQueueingMetrics({
                customerArrivalRate,
                serviceRatePerCashier,
                numberOfCashiers: cashiers,
                dailyWorkingHours,
                costPerCashierPerHour,
                waitingCostPerCustomerPerHour,
                averageSpendingPerPurchase,
                profitMarginPerSale,
            });

            data.push({
                cashiers: cashiers,
                waitingTime: result.averageWaitingTimeInQueue * 60,
                customersInQueue: result.averageCustomersInQueue,
                utilization: result.systemUtilizationRate * 100,
                totalCost: result.totalSystemCost,
                waitingCost: result.totalWaitingCost,
                cashierCost: result.totalCashierCost,
                profit: result.dailyNetProfit,
            });
        }
        return data;
    };

    useEffect(() => {
        if (!lineChartRef.current || !areaChartRef.current) return;

        const data = generateDataForCashiers();
        console.log(data);

        // Line Chart - System Metrics
        const lineChart = createChart(lineChartRef.current, {
            layout: {
                background: { type: ColorType.Solid, color: "#1a1a1a" },
                textColor: "#ffffff",
            },
            width: 600,
            height: 400,
            grid: {
                vertLines: { color: "#333" },
                horzLines: { color: "#333" },
            },
        });

        lineChart.applyOptions({
            timeScale: {
                timeVisible: false,
                tickMarkFormatter: (time: any) => `${time} cajero${time > 1 ? "s" : ""}`,
            },
        });

        const waitingTimeSeries = lineChart.addSeries(LineSeries, {
            color: "#ff6b6b",
            title: "Tiempo de Espera (min)",
        });

        const customersInQueueSeries = lineChart.addSeries(LineSeries, {
            color: "#4ecdc4",
            title: "Clientes en Cola",
        });

        const utilizationSeries = lineChart.addSeries(LineSeries, {
            color: "#45b7d1",
            title: "Utilización (%)",
        });

        waitingTimeSeries.setData(data.map((d) => ({ time: d.cashiers as any, value: d.waitingTime })));
        customersInQueueSeries.setData(data.map((d) => ({ time: d.cashiers as any, value: d.customersInQueue })));
        utilizationSeries.setData(data.map((d) => ({ time: d.cashiers as any, value: d.utilization })));

        // Area Chart - Cost Analysis
        const areaChart = createChart(areaChartRef.current, {
            layout: {
                background: { type: ColorType.Solid, color: "#1a1a1a" },
                textColor: "#ffffff",
            },
            width: 600,
            height: 400,
            grid: {
                vertLines: { color: "#333" },
                horzLines: { color: "#333" },
            },
        });

        const waitingCostSeries = areaChart.addSeries(AreaSeries, {
            topColor: "rgba(255, 107, 107, 0.8)",
            bottomColor: "rgba(255, 107, 107, 0.1)",
            lineColor: "#ff6b6b",
            title: "Costo de Espera",
        });

        const cashierCostSeries = areaChart.addSeries(AreaSeries, {
            topColor: "rgba(78, 205, 196, 0.8)",
            bottomColor: "rgba(78, 205, 196, 0.1)",
            lineColor: "#4ecdc4",
            title: "Costo de Cajeros",
        });

        const profitSeries = areaChart.addSeries(LineSeries, {
            color: "#96f97b",
            lineWidth: 3,
            title: "Ganancia Neta",
        });

        waitingCostSeries.setData(data.map((d) => ({ time: d.cashiers as any, value: d.waitingCost })));
        cashierCostSeries.setData(data.map((d) => ({ time: d.cashiers as any, value: d.cashierCost })));
        profitSeries.setData(data.map((d) => ({ time: d.cashiers as any, value: d.profit })));

        return () => {
            lineChart.remove();
            areaChart.remove();
        };
    }, [
        customerArrivalRate,
        serviceRatePerCashier,
        dailyWorkingHours,
        costPerCashierPerHour,
        waitingCostPerCustomerPerHour,
        averageSpendingPerPurchase,
        profitMarginPerSale,
    ]);

    return (
        <Layout>
            <div className="dashboard-container">
                <aside className="dashboard-sidebar">
                    <div className="fix">
                        <CashierServiceSettings />
                    </div>
                </aside>

                <main className="dashboard-main">
                    <div className="dashboard-charts">
                        <div>
                            <h3>Métricas del Sistema por Número de Cajeros</h3>
                            <div ref={lineChartRef} style={{ width: "600px", height: "400px" }} />
                        </div>
                        <div>
                            <h3>Análisis de Costos y Ganancias</h3>
                            <div ref={areaChartRef} style={{ width: "600px", height: "400px" }} />
                        </div>
                    </div>
                </main>
            </div>
        </Layout>
    );
};

export default Home;
