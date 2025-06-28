import { useState } from "react";
import { useCashierPerformanceChart } from "../../hooks/useCashierPerformanceChart";
import ChartTooltip from "../ChartTooltip";
import "./index.css";

type Props = {
    id: string;
};

const CashierPerformanceChart = ({ id }: Props) => {
    const [activeButton, setActiveButton] = useState<string>("averageWaitingTime");
    const {
        chartRef,
        tooltipData,
        setAverageWaitingTime,
        setAverageCustomersInQueue,
        setSystemUtilizationRate,
        setTotalWaitingCost,
        setTotalCashierCost,
    } = useCashierPerformanceChart();

    const handleButtonClick = (buttonType: string, callback: () => void) => {
        setActiveButton(buttonType);
        callback();
    };

    return (
        <section id={id} className="cashier__performance-chart">
            <header>
                <button 
                    className={activeButton === "averageWaitingTime" ? "active" : ""}
                    onClick={() => handleButtonClick("averageWaitingTime", setAverageWaitingTime)}
                >
                    Tiempo de espera promedio
                </button>
                <button 
                    className={activeButton === "averageCustomersInQueue" ? "active" : ""}
                    onClick={() => handleButtonClick("averageCustomersInQueue", setAverageCustomersInQueue)}
                >
                    Promedio de clientes en cola
                </button>
                <button 
                    className={activeButton === "systemUtilizationRate" ? "active" : ""}
                    onClick={() => handleButtonClick("systemUtilizationRate", setSystemUtilizationRate)}
                >
                    Tasa de utilización del sistema
                </button>
                <button 
                    className={activeButton === "totalWaitingCost" ? "active" : ""}
                    onClick={() => handleButtonClick("totalWaitingCost", setTotalWaitingCost)}
                >
                    Costo total de espera
                </button>
                <button 
                    className={activeButton === "totalCashierCost" ? "active" : ""}
                    onClick={() => handleButtonClick("totalCashierCost", setTotalCashierCost)}
                >
                    Costo total de cajeros
                </button>
            </header>
            <div ref={chartRef}>
                <ChartTooltip
                    title={tooltipData.title}
                    value={tooltipData.value}
                    cashiers={tooltipData.cashiers}
                    x={tooltipData.x}
                    y={tooltipData.y}
                    visible={tooltipData.visible}
                />
            </div>
        </section>
    );
};

export default CashierPerformanceChart;
