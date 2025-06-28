import { useEffect, useRef, useState } from "react";
import { createChart, ColorType, type IChartApi, type ISeriesApi, AreaSeries } from "lightweight-charts";
import { useCashier } from "./useCashier";
import type { TooltipData } from "../types/ChartTooltipTypes";

export const useCashierPerformanceChart = () => {
    const chartRef = useRef<HTMLDivElement | null>(null);
    const chartInstanceRef = useRef<IChartApi | null>(null);
    const seriesRef = useRef<ISeriesApi<"Area"> | null>(null);
    const { cashierData } = useCashier();
    const [tooltipData, setTooltipData] = useState<TooltipData>({
        title: "Tiempo de espera promedio",
        value: 0,
        cashiers: 0,
        visible: false,
        x: 0,
        y: 0,
    });

    useEffect(() => {
        if (!chartRef.current || !cashierData.length) return;

        const chart = createChart(chartRef.current, {
            layout: {
                background: { type: ColorType.Solid, color: "#1a1a1a" },
                textColor: "#fefeff",
            },
            width: chartRef.current.clientWidth,
            height: chartRef.current.clientHeight,
            grid: {
                vertLines: { color: "#2b2b30" },
                horzLines: { visible: false },
            },
        });

        chart.applyOptions({
            rightPriceScale: { scaleMargins: { top: 0.3, bottom: 0.25 } },
            crosshair: {
                // horzLine: { visible: false, labelVisible: false },
                vertLine: { labelVisible: false },
            },
            timeScale: {
                timeVisible: false,
                tickMarkFormatter: (time: any) => `${time} cajero${time > 1 ? "s" : ""}`,
            },
        });

        const series = chart.addSeries(AreaSeries, {
            topColor: "rgba(38, 166, 154, 0.28)",
            bottomColor: "rgba(38, 166, 154, 0.05)",
            lineColor: "rgba(38, 166, 154, 1)",
            lastValueVisible: false,
            lineWidth: 2,
            priceLineVisible: false,
        });

        chart.subscribeCrosshairMove((param) => {
            if (
                !param.point ||
                !param.time ||
                param.point.x < 0 ||
                param.point.x > chartRef.current!.clientWidth ||
                param.point.y < 0 ||
                param.point.y > chartRef.current!.clientHeight
            )
                return setTooltipData((prev) => ({ ...prev, visible: false }));

            const data = param.seriesData.get(series);
            if (!data || !("value" in data) || data.value === undefined)
                return setTooltipData((prev) => ({ ...prev, visible: false }));

            setTooltipData({
                title: tooltipData.title,
                value: data.value,
                cashiers: param.time as number,
                visible: true,
                x: param.point.x,
                y: param.point.y - 50,
            });
        });

        chartInstanceRef.current = chart;
        seriesRef.current = series;
        series.setData(cashierData.map((d) => ({ time: d.cashiers as any, value: d.averageWaitingTimeInQueue })));
        chart.timeScale().fitContent();

        return () => chart.remove();
    }, [cashierData]);

    const updateMetric = (dataKey: keyof (typeof cashierData)[0]) =>
        seriesRef.current?.setData(cashierData.map((d) => ({ time: d.cashiers as any, value: d[dataKey] as number })));

    return {
        chartRef,
        tooltipData,
        setAverageWaitingTime: () => updateMetric("averageWaitingTimeInQueue"),
        setAverageTotalTimeInSystem: () => updateMetric("averageTotalTimeInSystem"),
        setAverageCustomersInSystem: () => updateMetric("averageCustomersInSystem"),
        setAverageCustomersInQueue: () => updateMetric("averageCustomersInQueue"),
        setSystemUtilizationRate: () => updateMetric("systemUtilizationRate"),
        setTotalWaitingCost: () => updateMetric("totalWaitingCost"),
        setTotalCashierCost: () => updateMetric("totalCashierCost"),
    };
};
