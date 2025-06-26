import { useCashier } from "./useCashier";

export const useQueueingSystemMMm = () => {
    const {
        customerArrivalRate,
        serviceRatePerCashier,
        numberOfCashiers,
        dailyWorkingHours,
        costPerCashierPerHour,
        waitingCostPerCustomerPerHour,
        averageSpendingPerPurchase,
        profitMarginPerSale,
    } = useCashier();

    // Formula: ρ = λ / (m * μ)
    const systemUtilizationRate = customerArrivalRate / (numberOfCashiers * serviceRatePerCashier);

    function factorial(n: number): number {
        return n <= 1 ? 1 : n * factorial(n - 1);
    }

    function calculateEmptySystemProbability(): number {
        // Formula: P₀ = [Σ (n=0 to m-1) (λ/μ)^n / n! + (λ/μ)^m / (m! * (1 - ρ))]^-1
        let sum = 0;
        for (let n = 0; n < numberOfCashiers; n++) {
            sum += Math.pow(customerArrivalRate / serviceRatePerCashier, n) / factorial(n);
        }
        const finalPart =
            Math.pow(customerArrivalRate / serviceRatePerCashier, numberOfCashiers) /
            (factorial(numberOfCashiers) * (1 - systemUtilizationRate));
        return 1 / (sum + finalPart);
    }

    const emptySystemProbability = calculateEmptySystemProbability();

    // Formula: Lq = P₀ * (λ/μ)^m * ρ / (m! * (1 - ρ)^2)
    const averageCustomersInQueue =
        (emptySystemProbability *
            Math.pow(customerArrivalRate / serviceRatePerCashier, numberOfCashiers) *
            systemUtilizationRate) /
        (factorial(numberOfCashiers) * Math.pow(1 - systemUtilizationRate, 2));

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

        // Costs and profits
        totalWaitingCost,
        totalCashierCost,
        totalSystemCost,

        // Profit and Economic Analysis
        netProfitPerCustomer,
        customersServedPerDay,
        totalDailyRevenue,
        dailyNetProfit,
    };
};
