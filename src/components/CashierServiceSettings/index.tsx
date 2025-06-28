import { useCashier } from "../../hooks/useCashier";
import Input from "../Input";
import "./index.css";

const CashierServiceSettings = () => {
    const {
        serviceRatePerCashier,
        numberOfCashiers,
        dailyWorkingHours,
        costPerCashierPerHour,
        waitingCostPerCustomerPerHour,
        averageSpendingPerPurchase,
        profitMarginPerSale,
        customerArrivalRate,
        setCustomerArrivalRate,
        setServiceRatePerCashier,
        setNumberOfCashiers,
        setDailyWorkingHours,
        setCostPerCashierPerHour,
        setWaitingCostPerCustomerPerHour,
        setAverageSpendingPerPurchase,
        setProfitMarginPerSale,
    } = useCashier();

    return (
        <section className="cashier__service-settings">
            <Input
                label={`Tasa de Llegada (λ): ${customerArrivalRate} clientes/hora`}
                value={customerArrivalRate}
                min={10}
                max={serviceRatePerCashier - 1}
                onChange={setCustomerArrivalRate}
            />
            <Input
                label={`Tasa de Servicio (μ): ${serviceRatePerCashier} clientes/hora`}
                value={serviceRatePerCashier}
                min={11}
                max={30}
                onChange={(value) => {
                    if (value > 30 || value <= customerArrivalRate) return;
                    setServiceRatePerCashier(value);
                }}
            />
            <Input
                label={`Número de Cajeros: ${numberOfCashiers}`}
                value={numberOfCashiers}
                min={1}
                max={8}
                onChange={setNumberOfCashiers}
            />
            <Input
                label={`Horas de Trabajo: ${dailyWorkingHours} horas`}
                value={dailyWorkingHours}
                min={6}
                max={12}
                onChange={setDailyWorkingHours}
            />
            <Input
                label={`Costo por Cajero: ${costPerCashierPerHour}/hora`}
                value={costPerCashierPerHour}
                min={10}
                max={30}
                onChange={setCostPerCashierPerHour}
            />
            <Input
                label={`Costo de Espera: ${waitingCostPerCustomerPerHour}/hora`}
                value={waitingCostPerCustomerPerHour}
                min={20}
                max={100}
                onChange={setWaitingCostPerCustomerPerHour}
            />
            <Input
                label={`Gasto Promedio por Compra: ${averageSpendingPerPurchase}`}
                value={averageSpendingPerPurchase}
                min={20}
                max={100}
                onChange={setAverageSpendingPerPurchase}
            />
            <Input
                label={`Margen de Ganancia por Venta: ${Math.round(profitMarginPerSale * 100)}%`}
                value={Math.round(profitMarginPerSale * 100)}
                min={1}
                max={3}
                onChange={(value) => setProfitMarginPerSale(value / 100)}
            />
        </section>
    );
};

export default CashierServiceSettings;
