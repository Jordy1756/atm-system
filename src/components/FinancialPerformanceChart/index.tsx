import { useFinancialPerformanceChart } from "../../hooks/useFinancialPerformanceChart";
import "./index.css";

type Props = {
    id: string;
};

const FinancialPerformanceChart = ({ id }: Props) => {
    const { chartRef } = useFinancialPerformanceChart();

    return (
        <section id={id} className="cashier__financial-chart">
            <header className="cashier__financial-chart-header">
                <div>
                    <span className="earnings"></span>
                    <p>Ganancias</p>
                </div>
                <div>
                    <span className="losses"></span>
                    <p>Pérdidas</p>
                </div>
                <div>
                    <span className="utilities"></span>
                    <p>Utilidades</p>
                </div>
            </header>
            <div ref={chartRef} />
        </section>
    );
};

export default FinancialPerformanceChart;
