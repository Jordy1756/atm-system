import { useEffect, useRef } from "react";
import { createChart, ColorType, LineSeries } from "lightweight-charts";
import { useCashier } from "../../hooks/useCashier";
import "./index.css";

type Props = {
    id: string;
};

const FinancialPerformanceChart = ({ id }: Props) => {
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

        const series1 = chart.addSeries(LineSeries, {
            color: "rgba( 38, 166, 154, 1)",
            lineWidth: 1,
            crosshairMarkerVisible: false,
        });

        const series2 = chart.addSeries(LineSeries, {
            color: "rgba( 255, 99, 132, 1)",
            lineWidth: 1,
            crosshairMarkerVisible: false,
        });

        const series3 = chart.addSeries(LineSeries, {
            color: "rgba( 255, 159, 64, 1)",
            lineWidth: 1,
            crosshairMarkerVisible: false,
        });

        chart.timeScale().fitContent();

        console.log(cashierData);

        series1.setData(cashierData.map((d) => ({ time: d.cashiers as any, value: d.totalSystemCost })));
        series2.setData(cashierData.map((d) => ({ time: d.cashiers as any, value: d.totalDailyRevenue })));
        series3.setData(cashierData.map((d) => ({ time: d.cashiers as any, value: d.dailyNetProfit })));

        return () => {
            chart.remove();
        };
    }, [cashierData]);

    return (
        <section id={id} className="cashier__performance-chart">
            <header className="header">
                <div className="div1">
                    <span className="earnings"></span>
                    <p>Ganancias</p>
                </div>

                <div className="div1">
                    <span className="losses"></span>
                    <p>Pérdidas</p>
                </div>

                <div className="div1">
                    <span className="utilitys"></span>
                    <p>Ganancias</p>
                </div>
            </header>
            <div ref={chartRef} />
        </section>
    );
};

export default FinancialPerformanceChart;
