import { useEffect, useRef, useState } from "react";
import type { ChartTooltipProps, TooltipData } from "../types/ChartTooltipTypes";

export const useTooltip = ({ chart, series, container }: ChartTooltipProps) => {
    const tooltipRef = useRef<HTMLDivElement>(null);
    const [tooltipData, setTooltipData] = useState<TooltipData>({
        price: 0,
        dateStr: "",
        x: 0,
        y: 0,
        visible: true,
    });

    useEffect(() => {
        if (!chart.current || !series || !container || !tooltipRef.current) return;

        const toolTipWidth = tooltipRef.current.clientWidth;
        const toolTipHeight = tooltipRef.current.clientHeight;
        const toolTipMargin = 15;

        const handleCrosshairMove = (param: any) => {
            if (
                param.point === undefined ||
                !param.time ||
                param.point.x < 0 ||
                param.point.x > container.clientWidth ||
                param.point.y < 0 ||
                param.point.y > container.clientHeight
            )
                return setTooltipData((prev) => ({ ...prev, visible: false }));

            const data = param.seriesData.get(series);
            const price = data.value !== undefined ? data.value : data.close;
            const coordinate = series.priceToCoordinate(price);

            if (coordinate === null) return;

            let shiftedCoordinate = param.point.x - 50;
            shiftedCoordinate = Math.max(0, Math.min(container.clientWidth - toolTipWidth, shiftedCoordinate));

            const coordinateY =
                coordinate - toolTipHeight - toolTipMargin > 0
                    ? coordinate - toolTipHeight - toolTipMargin
                    : Math.max(
                          0,
                          Math.min(container.clientHeight - toolTipHeight - toolTipMargin, coordinate + toolTipMargin)
                      );

            setTooltipData({
                price: Math.round(100 * price) / 100,
                dateStr: param.time,
                x: shiftedCoordinate,
                y: coordinateY,
                visible: true,
            });
        };

        chart.current?.timeScale().scrollToPosition(0, false);

        return () => {
            chart.current?.unsubscribeCrosshairMove(handleCrosshairMove);
        };
    }, [chart, series, container]);

    return {
        tooltipRef,
        tooltipData,
    };
};
