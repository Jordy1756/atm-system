type Props = {
    label: string;
    value: number;
    min: number;
    max: number;
    onChange: (value: number) => void;
};

const Input = ({ label, value, min, max, onChange }: Props) => {
    return (
        <div>
            <label>{label}</label>
            <input type="range" min={min} max={max} value={value} onChange={(e) => onChange(+e.target.value)} />
        </div>
    );
};

export default Input;
