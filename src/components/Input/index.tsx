import type { CSSProperties } from "react";
import type { IconType } from "../../icons";
import "./styles.css";

export type InputProps = {
	label?: string;
	value?: string;
	onChange?: (value: string) => void;
	placeholder?: string;
	disabled?: boolean;
	error?: string;
	type?: "text" | "password" | "email" | "number" | "tel" | "url" | "search";
	icon?: IconType;
	className?: string;
	style?: CSSProperties;
	id?: string;
};

export default function Input({
	label,
	value,
	onChange,
	placeholder,
	disabled,
	error,
	type = "text",
	icon: Icon,
	className,
	style,
	id,
}: InputProps) {
	return (
		<div className={`input-field${className ? " " + className : ""}`} style={style}>
			{label && (
				<label className="input-label" htmlFor={id}>
					{label}
				</label>
			)}
			<div className={`input-wrapper${Icon ? " has-icon" : ""}${error ? " has-error" : ""}${disabled ? " disabled" : ""}`}>
				{Icon && (
					<Icon className="input-icon" size={16} />
				)}
				<input
					id={id}
					className="input-element"
					type={type}
					value={value}
					placeholder={placeholder}
					disabled={disabled}
					onChange={(e) => onChange?.(e.target.value)}
				/>
			</div>
			{error && <span className="input-error">{error}</span>}
		</div>
	);
}
