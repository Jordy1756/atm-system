import { createContext, type ReactNode, useEffect, useState } from "react";
import { calculateQueueingMetrics } from "../utils/handleQueueingMetrics";
import type { CashierData } from "../types/CashierTypes";

type CashierContextType = {
    customerArrivalRate: number;
    serviceRatePerCashier: number;
    numberOfCashiers: number;
    dailyWorkingHours: number;
    costPerCashierPerHour: number;
    waitingCostPerCustomerPerHour: number;
    averageSpendingPerPurchase: number;
    profitMarginPerSale: number;
    cashierData: CashierData[];
    setCustomerArrivalRate: (value: number) => void;
    setServiceRatePerCashier: (value: number) => void;
    setNumberOfCashiers: (value: number) => void;
    setDailyWorkingHours: (value: number) => void;
    setCostPerCashierPerHour: (value: number) => void;
    setWaitingCostPerCustomerPerHour: (value: number) => void;
    setAverageSpendingPerPurchase: (value: number) => void;
    setProfitMarginPerSale: (value: number) => void;
};

export const CashierContext = createContext<CashierContextType | undefined>(undefined);

export const CashierProvider = ({ children }: { children: ReactNode }) => {
    const [customerArrivalRate, setCustomerArrivalRate] = useState<number>(20);
    const [serviceRatePerCashier, setServiceRatePerCashier] = useState<number>(30);
    const [numberOfCashiers, setNumberOfCashiers] = useState<number>(8);
    const [dailyWorkingHours, setDailyWorkingHours] = useState<number>(8);
    const [costPerCashierPerHour, setCostPerCashierPerHour] = useState<number>(15);
    const [waitingCostPerCustomerPerHour, setWaitingCostPerCustomerPerHour] = useState<number>(50);
    const [averageSpendingPerPurchase, setAverageSpendingPerPurchase] = useState<number>(45);
    const [profitMarginPerSale, setProfitMarginPerSale] = useState<number>(0.15);
    const [cashierData, setCashierData] = useState<CashierData[]>([]);

    useEffect(() => {
        const generateDataForCashiers = () => {
            const data = [];
            for (let cashiers = 1; cashiers <= numberOfCashiers; cashiers++) {
                const result = calculateQueueingMetrics({
                    customerArrivalRate,
                    serviceRatePerCashier,
                    numberOfCashiers: cashiers,
                    dailyWorkingHours,
                    costPerCashierPerHour,
                    waitingCostPerCustomerPerHour,
                    averageSpendingPerPurchase,
                    profitMarginPerSale,
                });

                data.push({
                    cashiers,
                    averageWaitingTimeInQueue: result.averageWaitingTimeInQueue * 60,
                    averageCustomersInQueue: result.averageCustomersInQueue,
                    systemUtilizationRate: result.systemUtilizationRate * 100,
                    totalSystemCost: result.totalSystemCost,
                    totalWaitingCost: result.totalWaitingCost,
                    totalCashierCost: result.totalCashierCost,
                    dailyNetProfit: result.dailyNetProfit,
                });
            }
            setCashierData(data);
        };

        generateDataForCashiers();
    }, [
        customerArrivalRate,
        serviceRatePerCashier,
        dailyWorkingHours,
        costPerCashierPerHour,
        waitingCostPerCustomerPerHour,
        averageSpendingPerPurchase,
        profitMarginPerSale,
        numberOfCashiers,
    ]);

    return (
        <CashierContext.Provider
            value={{
                serviceRatePerCashier,
                numberOfCashiers,
                dailyWorkingHours,
                costPerCashierPerHour,
                waitingCostPerCustomerPerHour,
                averageSpendingPerPurchase,
                profitMarginPerSale,
                customerArrivalRate,
                cashierData,
                setCustomerArrivalRate,
                setServiceRatePerCashier,
                setNumberOfCashiers,
                setDailyWorkingHours,
                setCostPerCashierPerHour,
                setWaitingCostPerCustomerPerHour,
                setAverageSpendingPerPurchase,
                setProfitMarginPerSale,
            }}
        >
            {children}
        </CashierContext.Provider>
    );
};
