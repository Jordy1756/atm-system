import { useEffect, useRef } from "react";
import { createChart, ColorType, AreaSeries } from "lightweight-charts";
import { useCashier } from "../../hooks/useCashier";
import "./index.css";

const CashierPerformanceChart = () => {
    const chartRef = useRef<HTMLDivElement>(null);
    const seriesRef = useRef<any>(null);
    const { cashierData } = useCashier();

    useEffect(() => {
        if (!chartRef.current) return;

        const chart = createChart(chartRef.current, {
            layout: {
                background: { type: ColorType.Solid, color: "#1a1a1a" },
                textColor: "#ffffff",
            },
            width: chartRef.current.clientWidth,
            height: chartRef.current.clientHeight,
            grid: {
                vertLines: { color: "#333" },
                horzLines: { color: "#333" },
            },
        });

        chart.applyOptions({
            rightPriceScale: {
                scaleMargins: {
                    top: 0.3,
                    bottom: 0.25,
                },
            },
            crosshair: {
                horzLine: {
                    visible: false,
                    labelVisible: false,
                },
                vertLine: {
                    labelVisible: false,
                },
            },
            grid: {
                vertLines: {
                    visible: false,
                },
                horzLines: {
                    visible: false,
                },
            },
            timeScale: {
                timeVisible: false,
                tickMarkFormatter: (time: any) => `${time} cajero${time > 1 ? "s" : ""}`,
            },
        });

        const series = chart.addSeries(AreaSeries, {
            topColor: "rgba( 38, 166, 154, 0.28)",
            bottomColor: "rgba( 38, 166, 154, 0.05)",
            lineColor: "rgba( 38, 166, 154, 1)",
            lineWidth: 1,
            crosshairMarkerVisible: false,
        });

        seriesRef.current = series;

        chart.timeScale().fitContent();

        series.setData(cashierData.map((d) => ({ time: d.cashiers as any, value: d.averageWaitingTimeInQueue })));

        return () => {
            chart.remove();
        };
    }, [cashierData]);

    const setAverageWaitingTime = () =>
        seriesRef.current.setData(
            cashierData.map((d) => ({ time: d.cashiers as any, value: d.averageWaitingTimeInQueue }))
        );

    const setAverageCustomersInQueue = () =>
        seriesRef.current.setData(
            cashierData.map((d) => ({ time: d.cashiers as any, value: d.averageCustomersInQueue }))
        );

    const setSystemUtilizationRate = () =>
        seriesRef.current.setData(
            cashierData.map((d) => ({ time: d.cashiers as any, value: d.systemUtilizationRate }))
        );

    const setTotalWaitingCost = () =>
        seriesRef.current.setData(cashierData.map((d) => ({ time: d.cashiers as any, value: d.totalWaitingCost })));

    const setTotalCashierCost = () =>
        seriesRef.current.setData(cashierData.map((d) => ({ time: d.cashiers as any, value: d.totalCashierCost })));

    return (
        <section className="cashier__performance-chart">
            <header>
                <button onClick={setAverageWaitingTime}>Tiempo de espera promedio</button>
                <button onClick={setAverageCustomersInQueue}>Promedio de clientes en cola</button>
                <button onClick={setSystemUtilizationRate}>Tasa de utilización del sistema</button>
                <button onClick={setTotalWaitingCost}>E</button>
                <button onClick={setTotalCashierCost}>F</button>
            </header>
            <div ref={chartRef} />
        </section>
    );
};

export default CashierPerformanceChart;
