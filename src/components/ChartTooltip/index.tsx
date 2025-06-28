import type { TooltipData } from "../../types/ChartTooltipTypes";
import "./index.css";

const ChartTooltip = ({ title, value, cashiers, x, y, visible }: TooltipData) => {
    if (!visible) return null;

    return (
        <div
            className="chart__tooltip"
            style={{
                
                left: x,
                top: y,
                
            }}
        >
            <h2 className="tooltip__title">{title}</h2>
            <p className="tooltip__value">{value.toFixed(2)}</p>
            <p className="tooltip__cashiers">Cajeros: {cashiers}</p>
        </div>
    );
};

export default ChartTooltip;
