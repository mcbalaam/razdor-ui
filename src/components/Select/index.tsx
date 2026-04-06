import type { CSSProperties } from "react";
import "./styles.css";

export type SelectOption = {
	value: string;
	label: string;
	disabled?: boolean;
};

export type SelectProps = {
	label?: string;
	value?: string;
	onChange?: (value: string) => void;
	options: SelectOption[];
	placeholder?: string;
	disabled?: boolean;
	error?: string;
	className?: string;
	style?: CSSProperties;
	id?: string;
};

export default function Select({
	label,
	value,
	onChange,
	options,
	placeholder,
	disabled,
	error,
	className,
	style,
	id,
}: SelectProps) {
	return (
		<div className={`select-field${className ? " " + className : ""}`} style={style}>
			{label && (
				<label className="select-label" htmlFor={id}>
					{label}
				</label>
			)}
			<div className={`select-wrapper${error ? " has-error" : ""}${disabled ? " disabled" : ""}`}>
				<select
					id={id}
					className="select-element"
					value={value ?? ""}
					disabled={disabled}
					onChange={(e) => onChange?.(e.target.value)}
				>
					{placeholder && (
						<option value="" disabled>
							{placeholder}
						</option>
					)}
					{options.map((opt) => (
						<option key={opt.value} value={opt.value} disabled={opt.disabled}>
							{opt.label}
						</option>
					))}
				</select>
				<span className="select-arrow" aria-hidden>▾</span>
			</div>
			{error && <span className="select-error">{error}</span>}
		</div>
	);
}
