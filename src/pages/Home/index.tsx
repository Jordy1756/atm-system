import CashierServiceSettings from "../../components/CashierServiceSettings";
import CashierPerformanceChart from "../../components/CashierPerformanceChart";
import FinancialPerformanceChart from "../../components/FinancialPerformanceChart";
import "./index.css";

const Home = () => {
    return (
        <>
            <header className="header">
                <nav>
                    <h1>M3Line</h1>
                    <ul>
                        <li>
                            <a href="#cashier-performance-chart">Rendimiento de Cajeros</a>
                        </li>
                        <li>
                            <a href="#financial-performance-chart">Rendimiento Financiero</a>
                        </li>
                    </ul>
                </nav>
            </header>
            <main className="main">
                <aside className="dashboard__sidebar">
                    <CashierServiceSettings />
                </aside>
                <section className="dashboards__container">
                    <CashierPerformanceChart id="cashier-performance-chart" />
                    <FinancialPerformanceChart id="financial-performance-chart" />
                </section>
            </main>
        </>
    );
};

export default Home;
