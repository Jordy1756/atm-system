import { useState } from "react";
import { useQueueingSystemMMm } from "./hooks/useQueueingSystemMMm";

export default function QueueingModelMMM() {
    const [customerArrivalRate, setCustomerArrivalRate] = useState(20); // λ: Customers arriving per hour
    const [serviceRatePerCashier, setServiceRatePerCashier] = useState(30); // μ: Customers served by each cashier per hour
    const [numberOfCashiers, setNumberOfCashiers] = useState(2); // m: Number of cashiers (servers)
    const [dailyWorkingHours, setDailyWorkingHours] = useState(8);
    const [costPerCashierPerHour, setCostPerCashierPerHour] = useState(15);
    const [waitingCostPerCustomerPerHour, setWaitingCostPerCustomerPerHour] = useState(50);
    const [averageSpendingPerPurchase, setAverageSpendingPerPurchase] = useState(45);
    const [profitMarginPerSale, setProfitMarginPerSale] = useState(0.15);

    const {
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
    } = useQueueingSystemMMm(
        customerArrivalRate,
        serviceRatePerCashier,
        numberOfCashiers,
        dailyWorkingHours,
        costPerCashierPerHour,
        waitingCostPerCustomerPerHour,
        averageSpendingPerPurchase,
        profitMarginPerSale
    );

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6 text-center">M/M/m Model - Economic Evaluation of Cashier System</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <Input
                    label="Customer arrival rate per hour (λ)"
                    value={customerArrivalRate}
                    setValue={setCustomerArrivalRate}
                />
                <Input
                    label="Service rate per cashier per hour (μ)"
                    value={serviceRatePerCashier}
                    setValue={setServiceRatePerCashier}
                />
                <Input label="Number of cashiers (m)" value={numberOfCashiers} setValue={setNumberOfCashiers} />
                <Input label="Operating hours per day" value={dailyWorkingHours} setValue={setDailyWorkingHours} />
                <Input
                    label="Cost per cashier (₡/hour)"
                    value={costPerCashierPerHour}
                    setValue={setCostPerCashierPerHour}
                />
                <Input
                    label="Waiting cost per customer (₡/customer/hour)"
                    value={waitingCostPerCustomerPerHour}
                    setValue={setWaitingCostPerCustomerPerHour}
                />
                <Input
                    label="Average spending per purchase (₡)"
                    value={averageSpendingPerPurchase}
                    setValue={setAverageSpendingPerPurchase}
                />
                <Input
                    label="Profit margin (%)"
                    value={profitMarginPerSale}
                    setValue={setProfitMarginPerSale}
                    step={0.01}
                />
            </div>

            <div className="mb-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h2 className="text-xl font-semibold mb-4 text-blue-800">Key Formulas for M/M/m Model</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormulaCard
                        title="Utilization rate (ρ)"
                        formula="ρ = λ / (m * μ)"
                        description="Proportion of time that servers are busy"
                    />
                    <FormulaCard
                        title="Empty system probability (P₀)"
                        formula="P₀ = [Σ (λ/μ)^n/n! + (λ/μ)^m/(m!(1-ρ))]⁻¹"
                        description="Probability that there are no customers in the system"
                    />
                    <FormulaCard
                        title="Customers in queue (Lq)"
                        formula="Lq = P₀ * (λ/μ)^m * ρ / (m! * (1-ρ)²)"
                        description="Average number of customers waiting in queue"
                    />
                    <FormulaCard
                        title="Customers in system (L)"
                        formula="L = Lq + λ/μ"
                        description="Average number of customers in the entire system"
                    />
                    <FormulaCard
                        title="Waiting time in queue (Wq)"
                        formula="Wq = Lq / λ"
                        description="Average time a customer waits in queue"
                    />
                    <FormulaCard
                        title="Total time in system (W)"
                        formula="W = L / λ = Wq + 1/μ"
                        description="Average total time a customer spends in the system"
                    />
                </div>
            </div>

            <div className="overflow-auto border rounded-lg mb-8">
                <table className="min-w-full text-sm">
                    <thead className="bg-gray-100 text-left">
                        <tr>
                            <th className="p-2">Parameter</th>
                            <th className="p-2">Formula</th>
                            <th className="p-2">Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <TableRow
                            label="System utilization percentage (ρ)"
                            formula="λ / (m * μ)"
                            value={systemUtilizationRate.toFixed(4)}
                        />
                        <TableRow
                            label="Empty system probability (P₀)"
                            formula="[Σ (λ/μ)^n/n! + (λ/μ)^m/(m!(1-ρ))]⁻¹"
                            value={emptySystemProbability.toFixed(4)}
                        />
                        <TableRow
                            label="Average customers waiting in queue (Lq)"
                            formula="P₀ * (λ/μ)^m * ρ / (m! * (1-ρ)²)"
                            value={averageCustomersInQueue.toFixed(4)}
                        />
                        <TableRow
                            label="Average customers in system (L)"
                            formula="Lq + λ/μ"
                            value={averageCustomersInSystem.toFixed(4)}
                        />
                        <TableRow
                            label="Average waiting time in queue (Wq)"
                            formula="Lq / λ"
                            value={`${averageWaitingTimeInQueue.toFixed(4)} hours (${(
                                averageWaitingTimeInQueue * 60
                            ).toFixed(2)} min)`}
                        />
                        <TableRow
                            label="Average total time in system (W)"
                            formula="L / λ"
                            value={`${averageTotalTimeInSystem.toFixed(4)} hours (${(
                                averageTotalTimeInSystem * 60
                            ).toFixed(2)} min)`}
                        />
                        <TableRow
                            label="Total daily waiting cost"
                            formula="Lq * WaitingCost * Hours"
                            value={`₡${totalWaitingCost.toFixed(2)}`}
                        />
                        <TableRow
                            label="Total daily cashier cost"
                            formula="m * CashierCost * Hours"
                            value={`₡${totalCashierCost.toFixed(2)}`}
                        />
                        <TableRow
                            label="Total daily system cost"
                            formula="WaitingCost + CashierCost"
                            value={`₡${totalSystemCost.toFixed(2)}`}
                            bold
                        />
                        <TableRow
                            label="Estimated daily net revenue"
                            formula="λ * Hours * Spending * Margin"
                            value={`₡${totalDailyRevenue.toFixed(2)}`}
                        />
                        <TableRow
                            label="Daily net profit"
                            formula="Revenue - TotalCost"
                            value={`₡${dailyNetProfit.toFixed(2)}`}
                            highlight
                        />
                    </tbody>
                </table>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-lg shadow border">
                    <h3 className="font-bold mb-2">Daily Cost Breakdown</h3>
                    <div className="h-64">
                        <CostBreakdownChart
                            costs={[
                                { name: "Waiting cost", value: totalWaitingCost },
                                { name: "Cashier cost", value: totalCashierCost },
                            ]}
                            total={totalSystemCost}
                        />
                    </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow border">
                    <h3 className="font-bold mb-2">Daily Balance</h3>
                    <div className="h-64">
                        <ProfitChart revenue={totalDailyRevenue} costs={totalSystemCost} profit={dailyNetProfit} />
                    </div>
                </div>
            </div>
        </div>
    );
}

function Input({
    label,
    value,
    setValue,
    step = 1,
}: {
    label: string;
    value: number;
    setValue: (v: number) => void;
    step?: number;
}) {
    return (
        <label className="space-y-1">
            <span className="block font-medium text-sm">{label}</span>
            <input
                type="number"
                value={value}
                step={step}
                onChange={(e) => setValue(+e.target.value)}
                className="w-full border border-gray-300 rounded p-2"
            />
        </label>
    );
}

function FormulaCard({ title, formula, description }: { title: string; formula: string; description: string }) {
    return (
        <div className="bg-white p-3 rounded border border-gray-200">
            <h4 className="font-semibold text-blue-700">{title}</h4>
            <div className="my-2 p-2 bg-gray-100 font-mono text-sm overflow-x-auto">{formula}</div>
            <p className="text-sm text-gray-600">{description}</p>
        </div>
    );
}

function TableRow({
    label,
    formula,
    value,
    bold = false,
    highlight = false,
}: {
    label: string;
    formula: string;
    value: string;
    bold?: boolean;
    highlight?: boolean;
}) {
    return (
        <tr className={highlight ? "bg-green-50" : undefined}>
            <td className={`p-2 ${bold ? "font-semibold" : ""}`}>{label}</td>
            <td className={`p-2 font-mono text-xs ${bold ? "font-semibold" : ""}`}>{formula}</td>
            <td className={`p-2 ${bold ? "font-semibold" : ""}`}>{value}</td>
        </tr>
    );
}

// Chart components (simulated - in a real implementation you would use a library like Chart.js)
function CostBreakdownChart({ costs, total }: { costs: { name: string; value: number }[]; total: number }) {
    return (
        <div className="flex flex-col h-full">
            <div className="flex-grow flex items-end space-x-2">
                {costs.map((cost, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center">
                        <div
                            className="w-full bg-blue-400 hover:bg-blue-500 transition-colors"
                            style={{ height: `${(cost.value / total) * 100}%` }}
                        ></div>
                        <span className="text-xs mt-1">{cost.name}</span>
                        <span className="text-xs font-semibold">₡{cost.value.toFixed(2)}</span>
                    </div>
                ))}
            </div>
            <div className="mt-4 text-center font-semibold border-t pt-2">Total: ₡{total.toFixed(2)}</div>
        </div>
    );
}

function ProfitChart({ revenue, costs, profit }: { revenue: number; costs: number; profit: number }) {
    const total = Math.max(revenue, costs);
    return (
        <div className="flex flex-col h-full">
            <div className="flex-grow flex items-end space-x-4 px-4">
                <div className="flex-1 flex flex-col items-center">
                    <div className="w-1/2 bg-green-400" style={{ height: `${(revenue / total) * 100}%` }}></div>
                    <span className="text-xs mt-1">Revenue</span>
                    <span className="text-xs font-semibold">₡{revenue.toFixed(2)}</span>
                </div>
                <div className="flex-1 flex flex-col items-center">
                    <div className="w-1/2 bg-red-400" style={{ height: `${(costs / total) * 100}%` }}></div>
                    <span className="text-xs mt-1">Costs</span>
                    <span className="text-xs font-semibold">₡{costs.toFixed(2)}</span>
                </div>
            </div>
            <div
                className={`mt-4 text-center font-semibold border-t pt-2 ${
                    profit >= 0 ? "text-green-600" : "text-red-600"
                }`}
            >
                Profit: ₡{profit.toFixed(2)}
            </div>
        </div>
    );
}
