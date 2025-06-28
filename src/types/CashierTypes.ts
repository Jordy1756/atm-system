export interface CashierData {
    cashiers: number;
    averageWaitingTimeInQueue: number;
    averageTotalTimeInSystem: number;
    averageCustomersInQueue: number;
    averageCustomersInSystem: number;
    systemUtilizationRate: number;
    totalWaitingCost: number;
    totalCashierCost: number;
    totalSystemCost: number;
    totalDailyRevenue: number;
    dailyNetProfit: number;
}
