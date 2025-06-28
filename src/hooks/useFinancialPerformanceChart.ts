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
                textColor: "#fefeff",
            },
            width: chartRef.current.clientWidth,
            height: chartRef.current.clientHeight,
            grid: {
                vertLines: { color: "#2b2b30" },
            },
            crosshair: {
                horzLine: {
                    labelBackgroundColor: "#26a69a",
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
            localization: {
                priceFormatter: (price: number) => `$${price.toFixed(2)}`,
            },
        });

        const totalSystemCostSeries = chart.addSeries(LineSeries, {
            color: "#e41b29",
            lastValueVisible: false,
            lineWidth: 2,
            priceLineVisible: false,
        });

        const totalDailyRevenueSeries = chart.addSeries(LineSeries, {
            color: "#01C852",
            lastValueVisible: false,
            lineWidth: 2,
            priceLineVisible: false,
        });

        const dailyNetProfitSeries = chart.addSeries(LineSeries, {
            color: "#24C2D7",
            lastValueVisible: false,
            lineWidth: 2,
            priceLineVisible: false,
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
