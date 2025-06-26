import Layout from "../../layouts/Layout";
import CashierServiceSettings from "../../components/CashierServiceSettings";
import CashierPerformanceChart from "../../components/CashierPerformanceChart";
import "./index.css";

const Home = () => {
    return (
        <Layout>
            <aside className="dashboard__sidebar">
                <CashierServiceSettings />
            </aside>
            <section className="dashboards__container">
                <CashierPerformanceChart />
                <CashierPerformanceChart />
            </section>
        </Layout>
    );
};

export default Home;
