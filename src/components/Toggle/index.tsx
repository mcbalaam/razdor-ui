import type { CSSProperties } from "react";
import "./styles.css";

export type ToggleProps = {
	checked: boolean;
	onChange: (checked: boolean) => void;
	label?: string;
	disabled?: boolean;
	className?: string;
	style?: CSSProperties;
};

export default function Toggle({
	checked,
	onChange,
	label,
	disabled,
	className,
	style,
}: ToggleProps) {
	return (
		<label
			className={`toggle${checked ? " checked" : ""}${disabled ? " disabled" : ""}${className ? " " + className : ""}`}
			style={style}
		>
			<input
				className="toggle-input"
				type="checkbox"
				checked={checked}
				disabled={disabled}
				onChange={(e) => onChange(e.target.checked)}
			/>
			<span className="toggle-track" aria-hidden>
				<span className="toggle-thumb" />
			</span>
			{label && <span className="toggle-label">{label}</span>}
		</label>
	);
}
