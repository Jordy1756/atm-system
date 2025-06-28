import type { IChartApi, ISeriesApi } from "lightweight-charts";
import type { RefObject } from "react";

export type ChartTooltipProps = {
    chart: RefObject<IChartApi | null>;
    series: ISeriesApi<any> | null;
    container: HTMLDivElement | null;
};

export type TooltipData = {
    price: number;
    dateStr: string;
    x: number;
    y: number;
    visible: boolean;
};
