import { useCashierPerformanceChart } from "../../hooks/useCashierPerformanceChart";
import ChartTooltip from "../ChartTooltip";
import "./index.css";

type Props = {
    id: string;
};

const CashierPerformanceChart = ({ id }: Props) => {
    const {
        chartRef,
        tooltipData,
        setAverageWaitingTime,
        setAverageCustomersInQueue,
        setSystemUtilizationRate,
        setTotalWaitingCost,
        setTotalCashierCost,
    } = useCashierPerformanceChart();

    return (
        <section id={id} className="cashier__performance-chart">
            <header>
                <button onClick={setAverageWaitingTime}>Tiempo de espera promedio</button>
                <button onClick={setAverageCustomersInQueue}>Promedio de clientes en cola</button>
                <button onClick={setSystemUtilizationRate}>Tasa de utilización del sistema</button>
                <button onClick={setTotalWaitingCost}>Costo total de espera</button>
                <button onClick={setTotalCashierCost}>Costo total de cajeros</button>
            </header>
            <div ref={chartRef} className="chart-container">
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
