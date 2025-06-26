import { useContext } from "react";
import { CashierContext } from "../context/CashierContext";

export const useCashier = () => {
    const cashierContext = useContext(CashierContext);
    if (!cashierContext) throw new Error("useCashier must be used within a CashierProvider");

    return cashierContext;
};
