import Layout from "../layouts/Layout";
import CashierServiceSettings from "../components/CashierServiceSettings";
import Chart from "../components/Chart";
import "./index.css"

const Home = () => {
    return (
        <Layout>
            <div className="dashboard-container">
                <aside className="dashboard-sidebar">
                    <div className="fix">
                        <CashierServiceSettings />
                    </div>
                </aside>
                <main className="dashboard-main">
                    <div className="dashboard-charts">
                        <Chart />
                    </div>
                </main>
            </div>
        </Layout>
    );
};

export default Home;
