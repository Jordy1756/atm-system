import type { QueueingMetrics } from "../types/QueueingMetricsTypes";

const calculateFactorial = (num: number): number => (num <= 1 ? 1 : num * calculateFactorial(num - 1));

const calculateEmptySystemProbability = (
    customerArrivalRate: number,
    serviceRatePerCashier: number,
    numberOfCashiers: number,
    systemUtilizationRate: number
): number => {
    // Formula: P₀ = [Σ (n=0 to m-1) (λ/μ)^n / n! + (λ/μ)^m / (m! * (1 - ρ))]^-1
    let sum = 0;
    for (let n = 0; n < numberOfCashiers; n++) {
        sum += Math.pow(customerArrivalRate / serviceRatePerCashier, n) / calculateFactorial(n);
    }
    const finalPart =
        Math.pow(customerArrivalRate / serviceRatePerCashier, numberOfCashiers) /
        (calculateFactorial(numberOfCashiers) * (1 - systemUtilizationRate));
    return 1 / (sum + finalPart);
};

export const calculateQueueingMetrics = ({
    customerArrivalRate,
    serviceRatePerCashier,
    numberOfCashiers,
    dailyWorkingHours,
    costPerCashierPerHour,
    waitingCostPerCustomerPerHour,
    averageSpendingPerPurchase,
    profitMarginPerSale,
}: QueueingMetrics) => {
    // Formula: ρ = λ / (m * μ)
    const systemUtilizationRate = customerArrivalRate / (numberOfCashiers * serviceRatePerCashier);

    const emptySystemProbability = calculateEmptySystemProbability(
        customerArrivalRate,
        serviceRatePerCashier,
        numberOfCashiers,
        systemUtilizationRate
    );

    // Formula: Lq = P₀ * (λ/μ)^m * ρ / (m! * (1 - ρ)^2)
    const averageCustomersInQueue =
        (emptySystemProbability *
            Math.pow(customerArrivalRate / serviceRatePerCashier, numberOfCashiers) *
            systemUtilizationRate) /
        (calculateFactorial(numberOfCashiers) * Math.pow(1 - systemUtilizationRate, 2));

    // Formula: L = Lq + λ/μ
    const averageCustomersInSystem = averageCustomersInQueue + customerArrivalRate / serviceRatePerCashier;

    // Formula: Wq = Lq / λ
    const averageWaitingTimeInQueue = averageCustomersInQueue / customerArrivalRate;

    // Formula: W = L / λ
    const averageTotalTimeInSystem = averageCustomersInSystem / customerArrivalRate;

    // Costs and profits
    const totalWaitingCost = averageCustomersInQueue * waitingCostPerCustomerPerHour * dailyWorkingHours;
    const totalCashierCost = numberOfCashiers * costPerCashierPerHour * dailyWorkingHours;
    const totalSystemCost = totalWaitingCost + totalCashierCost;

    const netProfitPerCustomer = averageSpendingPerPurchase * profitMarginPerSale;
    const customersServedPerDay = customerArrivalRate * dailyWorkingHours;
    const totalDailyRevenue = netProfitPerCustomer * customersServedPerDay;
    const dailyNetProfit = totalDailyRevenue - totalSystemCost;

    return {
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
    };
};
