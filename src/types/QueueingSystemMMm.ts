export interface QueueingSystemMMm {
    customerArrivalRate: number;
    serviceRatePerCashier: number;
    numberOfCashiers: number;
    dailyWorkingHours: number;
    costPerCashierPerHour: number;
    waitingCostPerCustomerPerHour: number;
    averageSpendingPerPurchase: number;
    profitMarginPerSale: number;
}
