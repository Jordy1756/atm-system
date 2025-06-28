import { useCashierPerformanceChart } from "../../hooks/useCashierPerformanceChart";
import "./index.css";

type Props = {
    id: string;
};

const CashierPerformanceChart = ({ id }: Props) => {
    const {
        chartRef,
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
            <div ref={chartRef} className="chart-container" />
        </section>
    );
};

export default CashierPerformanceChart;
