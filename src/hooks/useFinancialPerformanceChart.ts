import { useEffect, useRef } from "react";
import { createChart, ColorType, LineSeries } from "lightweight-charts";
import { useCashier } from "./useCashier";

export const useFinancialPerformanceChart = () => {
    const chartRef = useRef<HTMLDivElement>(null);
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
            },
            crosshair: {
                horzLine: {
                    labelBackgroundColor: "red",
                },
                vertLine: {
                    labelBackgroundColor: "red",
                },
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
                vertLine: {
                    labelVisible: false,
                },
            },
            grid: {
                horzLines: { visible: false },
            },
            timeScale: {
                timeVisible: false,
                tickMarkFormatter: (time: any) => `${time} cajero${time > 1 ? "s" : ""}`,
            },
        });

        const totalSystemCostSeries = chart.addSeries(LineSeries, {
            color: "#e81f63",
            lineWidth: 1,
        });

        const totalDailyRevenueSeries = chart.addSeries(LineSeries, {
            color: "#26a69a",
            lineWidth: 1,
        });

        const dailyNetProfitSeries = chart.addSeries(LineSeries, {
            color: "#27c6db",
            lineWidth: 1,
        });

        chart.timeScale().fitContent();

        totalSystemCostSeries.setData(cashierData.map((d) => ({ time: d.cashiers as any, value: d.totalSystemCost })));
        totalDailyRevenueSeries.setData(
            cashierData.map((d) => ({ time: d.cashiers as any, value: d.totalDailyRevenue }))
        );
        dailyNetProfitSeries.setData(cashierData.map((d) => ({ time: d.cashiers as any, value: d.dailyNetProfit })));

        return () => chart.remove();
    }, [cashierData]);

    return {
        chartRef,
    };
};
