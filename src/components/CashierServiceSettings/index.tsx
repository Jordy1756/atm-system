import { useCashier } from "../../hooks/useCashier";
import Input from "../Input";

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
        <section>
            <Input
                label={`Tasa de Llegada (λ): ${customerArrivalRate} clientes/hora`}
                value={customerArrivalRate}
                min={10}
                max={50}
                onChange={setCustomerArrivalRate}
            />
            <Input
                label={`Tasa de Servicio (μ): ${serviceRatePerCashier} clientes/hora`}
                value={serviceRatePerCashier}
                min={20}
                max={60}
                onChange={setServiceRatePerCashier}
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
                label={`Margen de Ganancia por Venta: ${profitMarginPerSale * 100}%`}
                value={profitMarginPerSale * 100}
                min={0}
                max={100}
                onChange={(value) => setProfitMarginPerSale(value / 100)}
            />
        </section>
    );
};

export default CashierServiceSettings;
