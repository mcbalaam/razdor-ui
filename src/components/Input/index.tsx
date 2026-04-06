import type { CSSProperties } from "react";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./styles.css";

export type InputProps = {
	label?: string;
	value?: string;
	onChange?: (value: string) => void;
	placeholder?: string;
	disabled?: boolean;
	error?: string;
	type?: "text" | "password" | "email" | "number" | "tel" | "url" | "search";
	faIcon?: IconDefinition;
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
	faIcon,
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
			<div className={`input-wrapper${faIcon ? " has-icon" : ""}${error ? " has-error" : ""}${disabled ? " disabled" : ""}`}>
				{faIcon && (
					<FontAwesomeIcon className="input-icon" icon={faIcon} />
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
