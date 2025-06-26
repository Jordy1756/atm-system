import { createContext, type ReactNode, useState } from "react";

type CashierContextType = {
    customerArrivalRate: number;
    serviceRatePerCashier: number;
    numberOfCashiers: number;
    dailyWorkingHours: number;
    costPerCashierPerHour: number;
    waitingCostPerCustomerPerHour: number;
    averageSpendingPerPurchase: number;
    profitMarginPerSale: number;
    setCustomerArrivalRate: (value: number) => void;
    setServiceRatePerCashier: (value: number) => void;
    setNumberOfCashiers: (value: number) => void;
    setDailyWorkingHours: (value: number) => void;
    setCostPerCashierPerHour: (value: number) => void;
    setWaitingCostPerCustomerPerHour: (value: number) => void;
    setAverageSpendingPerPurchase: (value: number) => void;
    setProfitMarginPerSale: (value: number) => void;
};

// eslint-disable-next-line react-refresh/only-export-components
export const CashierContext = createContext<CashierContextType | undefined>(undefined);

export const CashierProvider = ({ children }: { children: ReactNode }) => {
    const [customerArrivalRate, setCustomerArrivalRate] = useState<number>(20);
    const [serviceRatePerCashier, setServiceRatePerCashier] = useState<number>(30);
    const [numberOfCashiers, setNumberOfCashiers] = useState<number>(4);
    const [dailyWorkingHours, setDailyWorkingHours] = useState<number>(8);
    const [costPerCashierPerHour, setCostPerCashierPerHour] = useState<number>(15);
    const [waitingCostPerCustomerPerHour, setWaitingCostPerCustomerPerHour] = useState<number>(50);
    const [averageSpendingPerPurchase, setAverageSpendingPerPurchase] = useState<number>(45);
    const [profitMarginPerSale, setProfitMarginPerSale] = useState<number>(0.15);

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
