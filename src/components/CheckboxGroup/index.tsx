import type { CSSProperties, PropsWithChildren, ReactNode } from "react";
import { useMemo } from "react";
import "./styles.css";

export type CheckboxGroupItem = {
	value: string;
	label: ReactNode;
	disabled?: boolean;
};

export type CheckboxItemProps = {
	value: string;
	label: ReactNode;
	checked: boolean;
	disabled?: boolean;
	onCheckedChange: (checked: boolean) => void;
};

export function CheckboxItem({
	value: _value,
	label,
	checked,
	disabled,
	onCheckedChange,
}: CheckboxItemProps) {
	return (
		<label
			className={`checkbox-item ${checked ? "checked" : ""} ${
				disabled ? "disabled" : ""
			}`}
		>
			<input
				className="checkbox-item-input"
				type="checkbox"
				checked={checked}
				disabled={disabled}
				onChange={(e) => onCheckedChange((e.target as any)?.checked)}
			/>
			<span className="checkbox-item-box" aria-hidden />
			<span className="checkbox-item-label">{label}</span>
		</label>
	);
}

export type CheckboxGroupProps = PropsWithChildren<{
	items: CheckboxGroupItem[];
	values?: string[];
	onChange?: (next: string[]) => void;
	disabled?: boolean;
	className?: string;
	style?: CSSProperties;
}>;

export default function CheckboxGroup({
	items,
	values,
	onChange,
	disabled,
	className,
	style,
}: CheckboxGroupProps) {
	const selectedSet = useMemo(() => new Set(values ?? []), [values]);

	const handleCheckedChange = (itemValue: string, nextChecked: boolean) => {
		const next = new Set(values ?? []);
		if (nextChecked) next.add(itemValue);
		else next.delete(itemValue);
		onChange?.(Array.from(next));
	};

	return (
		<div
			className={`checkbox-group ${className ? " " + className : ""}`}
			style={style}
			role="group"
			aria-disabled={disabled}
		>
			{items.map((item) => {
				const checked = selectedSet.has(item.value);
				return (
					<CheckboxItem
						key={item.value}
						value={item.value}
						label={item.label}
						checked={checked}
						disabled={disabled || item.disabled}
						onCheckedChange={(nextChecked) =>
							handleCheckedChange(item.value, nextChecked)
						}
					/>
				);
			})}
		</div>
	);
}

