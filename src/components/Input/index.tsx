import "./index.css";

type Props = {
    label: string;
    value: number;
    min: number;
    max: number;
    onChange: (value: number) => void;
};

const Input = ({ label, value, min, max, onChange }: Props) => {
    return (
        <div className="input-container">
            <label className="input-label">{label}</label>
            <div className="input-wrapper">
                <input
                    type="range"
                    className="input-range"
                    min={min}
                    max={max}
                    value={value}
                    onChange={(e) => onChange(+e.target.value)}
                />
            </div>
        </div>
    );
};

export default Input;
