import Layout from "../layouts/Layout";
import CashierServiceSettings from "../components/CashierServiceSettings";
import Chart from "../components/Chart";

const Home = () => {
    return (
        <Layout>
            <CashierServiceSettings />
            <div style={{ display: "flex", gap: "2rem", justifyContent: "center", flexWrap: "wrap" }}>
                <div>
                    <h3>Métricas del Sistema por Número de Cajeros</h3>
                    <Chart />
                </div>
            </div>
        </Layout>
    );
};

export default Home;
