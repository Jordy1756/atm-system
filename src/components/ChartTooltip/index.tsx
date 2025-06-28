import "./index.css";
import type { ChartTooltipProps } from "../../types/ChartTooltipTypes";
import { useTooltip } from "../../hooks/useTooltip";

const ChartTooltip = ({ chart, series, container }: ChartTooltipProps) => {
    const { tooltipRef, tooltipData } = useTooltip({ chart, series, container });
    return (
        <div
            ref={tooltipRef}
            className="chart-tooltip"
            style={{
                left: `${tooltipData.x}px`,
                top: `${tooltipData.y}px`,
                display: tooltipData.visible ? "block" : "none",
            }}
        >
            <p>Cajeros</p>
            <p>{tooltipData.price}</p>
            <p>
                {tooltipData.dateStr} cajero{tooltipData.dateStr > "1" ? "s" : ""}
            </p>
        </div>
    );
};

export default ChartTooltip;
