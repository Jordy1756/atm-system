import Layout from "../../layouts/Layout";
import CashierServiceSettings from "../../components/CashierServiceSettings";
import CashierPerformanceChart from "../../components/CashierPerformanceChart";
import "./index.css";
import FinancialPerformanceChart from "../../components/FinancialPerformanceChart";

const Home = () => {
    return (
        <Layout>
            <aside className="dashboard__sidebar">
                <CashierServiceSettings />
            </aside>
            <section className="dashboards__container">
                <CashierPerformanceChart />
                <FinancialPerformanceChart />
            </section>
        </Layout>
    );
};

export default Home;
