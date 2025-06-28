import type { TooltipData } from "../../types/ChartTooltipTypes";
import "./index.css";

const ChartTooltip = ({ title, value, cashiers, x, y, visible }: TooltipData) => {
    if (!visible) return null;

    return (
        <div
            className="chart-tooltip"
            style={{
                position: "absolute",
                left: x,
                top: y,
                zIndex: 1000,
            }}
        >
            <div className="tooltip-title">{title}</div>
            <div className="tooltip-value">{value.toFixed(2)}</div>
            <div className="tooltip-cashiers">Cajeros: {cashiers}</div>
        </div>
    );
};

export default ChartTooltip;
