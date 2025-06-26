import { useEffect, useRef } from "react";
import { createChart, ColorType, AreaSeries } from "lightweight-charts";
import { useCashier } from "../../hooks/useCashier";

const Chart = () => {
    const chartRef = useRef<HTMLDivElement>(null);
    const { cashierData } = useCashier();

    useEffect(() => {
        console.log(cashierData);
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
                    top: 0.3, // leave some space for the legend
                    bottom: 0.25,
                },
            },
            crosshair: {
                // hide the horizontal crosshair line
                horzLine: {
                    visible: false,
                    labelVisible: false,
                },
                // hide the vertical crosshair label
                vertLine: {
                    labelVisible: false,
                },
            },
            // hide the grid lines
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

        chart.timeScale().fitContent();

        series.setData(cashierData.map((d) => ({ time: d.cashiers as any, value: d.averageWaitingTimeInQueue })));

        return () => {
            chart.remove();
        };
    }, [cashierData]);

    return <div className="prueba" ref={chartRef} />;
};

export default Chart;
