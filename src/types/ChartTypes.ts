interface ChartData {
    time: string;
    value: number;
}

interface ChartColors {
    backgroundColor?: string;
    lineColor?: string;
    textColor?: string;
    areaTopColor?: string;
    areaBottomColor?: string;
}

export interface ChartComponentProps {
    data: ChartData[];
    colors?: ChartColors;
}
