import { useEffect, useRef, useState } from "react";
import { useQueueingSystemMMm } from "../hooks/useQueueingSystemMMm";
import { createChart, ColorType, LineSeries, AreaSeries } from "lightweight-charts";

const Home = () => {
    const [customerArrivalRate, setCustomerArrivalRate] = useState(20);
    const [serviceRatePerCashier, setServiceRatePerCashier] = useState(30);
    const [dailyWorkingHours, setDailyWorkingHours] = useState(8);
    const [costPerCashierPerHour, setCostPerCashierPerHour] = useState(15);
    const [waitingCostPerCustomerPerHour, setWaitingCostPerCustomerPerHour] = useState(50);
    const [averageSpendingPerPurchase, setAverageSpendingPerPurchase] = useState(45);
    const [profitMarginPerSale, setProfitMarginPerSale] = useState(0.15);

    const lineChartRef = useRef(null);
    const areaChartRef = useRef(null);

    const generateDataForCashiers = () => {
        const data = [];
        for (let cashiers = 1; cashiers <= 8; cashiers++) {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const result = useQueueingSystemMMm({
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
                cashiers,
                waitingTime: result.averageWaitingTimeInQueue * 60, // Convert to minutes
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

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        waitingTimeSeries.setData(data.map((d) => ({ time: d.cashiers as any, value: d.waitingTime })));
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        customersInQueueSeries.setData(data.map((d) => ({ time: d.cashiers as any, value: d.customersInQueue })));
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        waitingCostSeries.setData(data.map((d) => ({ time: d.cashiers as any, value: d.waitingCost })));
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        cashierCostSeries.setData(data.map((d) => ({ time: d.cashiers as any, value: d.cashierCost })));
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        profitSeries.setData(data.map((d) => ({ time: d.cashiers as any, value: d.profit })));

        return () => {
            lineChart.remove();
            areaChart.remove();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <div>
            <h1>Sistema de Colas ATM - Análisis M/M/m</h1>
            <div>
                <div>
                    <label>Tasa de Llegada (λ): {customerArrivalRate} clientes/hora</label>
                    <input
                        type="range"
                        min="10"
                        max="50"
                        value={customerArrivalRate}
                        onChange={(e) => setCustomerArrivalRate(Number(e.target.value))}
                        style={{ width: "100%", marginTop: "5px" }}
                    />
                </div>

                <div>
                    <label>Tasa de Servicio (μ): {serviceRatePerCashier} clientes/hora</label>
                    <input
                        type="range"
                        min="20"
                        max="60"
                        value={serviceRatePerCashier}
                        onChange={(e) => setServiceRatePerCashier(Number(e.target.value))}
                        style={{ width: "100%", marginTop: "5px" }}
                    />
                </div>

                <div>
                    <label>Horas de Trabajo: {dailyWorkingHours} horas</label>
                    <input
                        type="range"
                        min="6"
                        max="12"
                        value={dailyWorkingHours}
                        onChange={(e) => setDailyWorkingHours(Number(e.target.value))}
                        style={{ width: "100%", marginTop: "5px" }}
                    />
                </div>

                <div>
                    <label>Costo por Cajero: ${costPerCashierPerHour}/hora</label>
                    <input
                        type="range"
                        min="10"
                        max="30"
                        value={costPerCashierPerHour}
                        onChange={(e) => setCostPerCashierPerHour(Number(e.target.value))}
                        style={{ width: "100%", marginTop: "5px" }}
                    />
                </div>
            </div>

            <div>
                <div>
                    <h3>Métricas del Sistema por Número de Cajeros</h3>
                    <div ref={lineChartRef} />
                </div>

                <div>
                    <h3>Análisis de Costos y Ganancias</h3>
                    <div ref={areaChartRef} />
                </div>
            </div>
        </div>
    );
};

export default Home;
