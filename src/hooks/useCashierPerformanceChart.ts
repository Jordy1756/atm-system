import { useEffect, useRef, useState } from "react";
import { createChart, ColorType, type IChartApi, type ISeriesApi, type AreaData, AreaSeries } from "lightweight-charts";
import { useCashier } from "./useCashier";

export const useCashierPerformanceChart = () => {
    const chartRef = useRef<HTMLDivElement | null>(null);
    const chartInstanceRef = useRef<IChartApi | null>(null);
    const seriesRef = useRef<ISeriesApi<"Area"> | null>(null);
    const toolTipRef = useRef<HTMLDivElement | null>(null);
    const { cashierData } = useCashier();
    const [currentMetric, setCurrentMetric] = useState<string>("");

    useEffect(() => {
        if (!chartRef.current) return;

        // Crear gráfico
        const chart = createChart(chartRef.current, {
            layout: {
                background: { type: ColorType.Solid, color: "#1a1a1a" },
                textColor: "#ffffff",
            },
            width: chartRef.current.clientWidth,
            height: chartRef.current.clientHeight,
            grid: {
                vertLines: { visible: false },
                horzLines: { visible: false },
            },
        });

        chart.applyOptions({
            rightPriceScale: {
                scaleMargins: { top: 0.3, bottom: 0.25 },
            },
            crosshair: {
                horzLine: { visible: false, labelVisible: false },
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
            lineWidth: 1,
            crosshairMarkerVisible: false,
        });

        const toolTip = document.createElement("div");
        toolTip.className = "chart-tooltip";
        chartRef.current.appendChild(toolTip);
        toolTipRef.current = toolTip;

        // Suscribirse a eventos del cursor
        chart.subscribeCrosshairMove((param) => {
            if (
                !param.point ||
                !param.time ||
                param.point.x < 0 ||
                param.point.x > chartRef.current!.clientWidth ||
                param.point.y < 0 ||
                param.point.y > chartRef.current!.clientHeight
            ) {
                toolTip.style.display = "none";
                return;
            }

            const data = param.seriesData.get(series) as AreaData<any>;
            if (!data || data.value === undefined) {
                toolTip.style.display = "none";
                return;
            }

            toolTip.style.display = "block";
            toolTip.innerHTML = `
                <div class="tooltip-title">${currentMetric}</div>
                <div class="tooltip-value">${data.value.toFixed(2)}</div>
                <div class="tooltip-cashiers">Cajeros: ${param.time}</div>
            `;

            // Posicionamiento del tooltip
            const coordinate = series.priceToCoordinate(data.value);
            if (coordinate === null) return;

            const y = coordinate - toolTip.offsetHeight - 10;
            const x = Math.max(
                0,
                Math.min(chartRef.current!.clientWidth - toolTip.offsetWidth, param.point.x - toolTip.offsetWidth / 2)
            );

            toolTip.style.left = `${x}px`;
            toolTip.style.top = `${y}px`;
        });

        chartInstanceRef.current = chart;
        seriesRef.current = series;
        setCurrentMetric("Tiempo de espera promedio");
        series.setData(cashierData.map((d) => ({ time: d.cashiers as any, value: d.averageWaitingTimeInQueue })));
        chart.timeScale().fitContent();

        return () => {
            chart.remove();
            if (toolTipRef.current) toolTipRef.current.remove();
        };
    }, [cashierData]);

    const updateMetric = (dataKey: keyof (typeof cashierData)[0], metricName: string) => {
        if (!seriesRef.current) return;
        seriesRef.current.setData(cashierData.map((d) => ({ time: d.cashiers as any, value: d[dataKey] as number })));
        setCurrentMetric(metricName);
    };

    const setAverageWaitingTime = () => updateMetric("averageWaitingTimeInQueue", "Tiempo de espera promedio");
    const setAverageCustomersInQueue = () => updateMetric("averageCustomersInQueue", "Promedio de clientes en cola");
    const setSystemUtilizationRate = () => updateMetric("systemUtilizationRate", "Tasa de utilización del sistema");
    const setTotalWaitingCost = () => updateMetric("totalWaitingCost", "Costo total de espera");
    const setTotalCashierCost = () => updateMetric("totalCashierCost", "Costo total de cajeros");

    return {
        chartRef,
        setAverageWaitingTime,
        setAverageCustomersInQueue,
        setSystemUtilizationRate,
        setTotalWaitingCost,
        setTotalCashierCost,
    };
};
