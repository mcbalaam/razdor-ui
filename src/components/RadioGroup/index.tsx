import type { CSSProperties, PropsWithChildren, ReactNode } from "react";
import "./styles.css";

export type RadioGroupItem = {
	value: string;
	label: ReactNode;
	disabled?: boolean;
};

export type RadioItemProps = {
	name: string;
	value: string;
	label: ReactNode;
	checked: boolean;
	disabled?: boolean;
	onSelect: (value: string) => void;
};

export function RadioItem({
	name,
	value,
	label,
	checked,
	disabled,
	onSelect,
}: RadioItemProps) {
	return (
		<label
			className={`radio-item ${checked ? "checked" : ""} ${
				disabled ? "disabled" : ""
			}`}
		>
			<input
				className="radio-item-input"
				type="radio"
				name={name}
				value={value}
				checked={checked}
				disabled={disabled}
				onChange={() => onSelect(value)}
			/>
			<span className="radio-item-box" aria-hidden />
			<span className="radio-item-label">{label}</span>
		</label>
	);
}

export type RadioGroupProps = PropsWithChildren<{
	name: string;
	items: RadioGroupItem[];
	value?: string;
	onChange?: (next: string) => void;
	disabled?: boolean;
	layout?: "vertical" | "horizontal";
	className?: string;
	style?: CSSProperties;
}>;

export default function RadioGroup({
	name,
	items,
	value,
	onChange,
	disabled,
	layout = "vertical",
	className,
	style,
}: RadioGroupProps) {
	return (
		<div
			className={`radio-group ${layout} ${className ? " " + className : ""}`}
			style={style}
			role="radiogroup"
			aria-disabled={disabled}
		>
			{items.map((item) => (
				<RadioItem
					key={item.value}
					name={name}
					value={item.value}
					label={item.label}
					checked={value === item.value}
					disabled={disabled || item.disabled}
					onSelect={(next) => onChange?.(next)}
				/>
			))}
		</div>
	);
}

