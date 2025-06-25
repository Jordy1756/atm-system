import { useState } from "react";
import { useQueueingSystemMMm } from "../hooks/useQueueingSystemMMm";

const Home = () => {
    // NOTA: λ < μ
    const [customerArrivalRate, setCustomerArrivalRate] = useState<number>(20); // λ: Customers arriving per hour
    const [serviceRatePerCashier, setServiceRatePerCashier] = useState<number>(30); // μ: Customers served by each cashier per hour
    const [numberOfCashiers, setNumberOfCashiers] = useState<number>(2); // m: Number of cashiers (servers)
    const [dailyWorkingHours, setDailyWorkingHours] = useState<number>(8);
    const [costPerCashierPerHour, setCostPerCashierPerHour] = useState<number>(15);
    const [waitingCostPerCustomerPerHour, setWaitingCostPerCustomerPerHour] = useState<number>(50);
    const [averageSpendingPerPurchase, setAverageSpendingPerPurchase] = useState<number>(45);
    const [profitMarginPerSale, setProfitMarginPerSale] = useState<number>(0.15);

    const {
        systemUtilizationRate,
        averageCustomersInQueue,
        averageCustomersInSystem,
        averageWaitingTimeInQueue,
        averageTotalTimeInSystem,
        emptySystemProbability,
        totalWaitingCost,
        totalCashierCost,
        totalSystemCost,
        netProfitPerCustomer,
        customersServedPerDay,
        totalDailyRevenue,
        dailyNetProfit,
    } = useQueueingSystemMMm({
        customerArrivalRate,
        serviceRatePerCashier,
        numberOfCashiers,
        dailyWorkingHours,
        costPerCashierPerHour,
        waitingCostPerCustomerPerHour,
        averageSpendingPerPurchase,
        profitMarginPerSale,
    });

    return (
        <>
            <h1>Home</h1>
        </>
    );
};

export default Home;
