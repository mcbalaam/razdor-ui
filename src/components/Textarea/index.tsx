import type { CSSProperties } from "react";
import "./styles.css";

export type TextareaProps = {
	label?: string;
	value?: string;
	onChange?: (value: string) => void;
	placeholder?: string;
	disabled?: boolean;
	error?: string;
	rows?: number;
	resize?: "none" | "vertical" | "horizontal" | "both";
	className?: string;
	style?: CSSProperties;
	id?: string;
};

export default function Textarea({
	label,
	value,
	onChange,
	placeholder,
	disabled,
	error,
	rows = 4,
	resize = "vertical",
	className,
	style,
	id,
}: TextareaProps) {
	return (
		<div className={`textarea-field${className ? " " + className : ""}`} style={style}>
			{label && (
				<label className="textarea-label" htmlFor={id}>
					{label}
				</label>
			)}
			<textarea
				id={id}
				className={`textarea-element${error ? " has-error" : ""}${disabled ? " disabled" : ""}`}
				value={value}
				placeholder={placeholder}
				disabled={disabled}
				rows={rows}
				style={{ resize }}
				onChange={(e) => onChange?.(e.target.value)}
			/>
			{error && <span className="textarea-error">{error}</span>}
		</div>
	);
}
