import type { CSSProperties, PropsWithChildren, ReactNode } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import "./styles.css";
import { CheckboxItem } from "../CheckboxGroup";

export type MenuPickerItem = {
	value: string;
	label: ReactNode;
	disabled?: boolean;
};

export type MenuPickerProps = PropsWithChildren<{
	/**
	 * Selection mode.
	 * - `single`: behaves like a dropdown select.
	 * - `multi`: shows checkboxes inside the dropdown.
	 */
	mode?: "single" | "multi";
	items: MenuPickerItem[];

	/**
	 * Controlled selected value(s).
	 * - `single`: string
	 * - `multi`: string[]
	 */
	value?: string | string[];
	onChange?: (next: string | string[]) => void;

	placeholder?: string;
	disabled?: boolean;
	className?: string;
	style?: CSSProperties;
}>;

export default function MenuPicker({
	mode = "single",
	items,
	value,
	onChange,
	placeholder = "Select...",
	disabled,
	className,
	style,
}: MenuPickerProps) {
	const [isOpen, setIsOpen] = useState(false);
	const rootRef = useRef<any>(null);

	const isMulti = mode === "multi";

	const selectedValues = useMemo(() => {
		if (isMulti) {
			return Array.isArray(value) ? value : [];
		}
		return typeof value === "string" ? [value] : [];
	}, [isMulti, value]);

	const selectedSet = useMemo(() => new Set(selectedValues), [selectedValues]);

	const selectedLabels = useMemo(() => {
		const map = new Map(items.map((it) => [it.value, it.label] as const));
		const labels = selectedValues
			.map((v) => map.get(v))
			.filter(Boolean)
			.map((l) => l as ReactNode);
		return labels;
	}, [items, selectedValues]);

	const getToggleText = () => {
		if (selectedLabels.length === 0) return placeholder;
		if (!isMulti) return selectedLabels[0];
		if (selectedLabels.length === 1) return selectedLabels[0];
		return `${selectedLabels.length} selected`;
	};

	const close = () => setIsOpen(false);

	useEffect(() => {
		if (!isOpen) return;

		const handlePointerDown = (e: any) => {
			const node = rootRef.current;
			if (!node) return;
			const target = e?.target;
			const contains = typeof (node as any).contains === "function";
			if (contains && !(node as any).contains(target)) close();
		};

		const handleKeyDown = (e: any) => {
			if (e?.key === "Escape") close();
		};

		const win = globalThis as any;
		win.addEventListener("pointerdown", handlePointerDown);
		win.addEventListener("keydown", handleKeyDown);
		return () => {
			win.removeEventListener("pointerdown", handlePointerDown);
			win.removeEventListener("keydown", handleKeyDown);
		};
	}, [isOpen]);

	const toggleOpen = () => {
		if (disabled) return;
		setIsOpen((v) => !v);
	};

	const handleSinglePick = (nextValue: string) => {
		if (disabled) return;
		onChange?.(nextValue);
		close();
	};

	const handleMultiToggle = (nextValue: string, checked: boolean) => {
		if (disabled) return;
		const next = checked
			? Array.from(selectedSet).concat(nextValue).filter((v, i, a) => a.indexOf(v) === i)
			: Array.from(selectedSet).filter((v) => v !== nextValue);
		onChange?.(next);
	};

	return (
		<div
			ref={rootRef}
			className={`menu-picker ${className ? " " + className : ""}`}
			style={style}
		>
			<button
				type="button"
				className={`menu-picker-toggle ${disabled ? "disabled" : ""}`}
				onClick={toggleOpen}
				disabled={disabled}
				aria-haspopup="listbox"
				aria-expanded={isOpen}
			>
				<span className="menu-picker-toggle-text">{getToggleText()}</span>
				<span className={`menu-picker-chevron ${isOpen ? "open" : ""}`} aria-hidden />
			</button>

			{isOpen && (
				<div
					className="menu-picker-popover"
					role="listbox"
					aria-multiselectable={isMulti}
				>
					{items.map((item) => {
						const checked = selectedSet.has(item.value);
						if (isMulti) {
							return (
								<div
									key={item.value}
									role="option"
									aria-selected={checked}
									aria-disabled={item.disabled || disabled}
									className={`menu-picker-option ${checked ? "selected" : ""} ${
										item.disabled || disabled ? "disabled" : ""
									}`}
								>
									<CheckboxItem
										value={item.value}
										label={item.label}
										disabled={item.disabled || disabled}
										checked={checked}
										onCheckedChange={(nextChecked) =>
											handleMultiToggle(item.value, nextChecked)
										}
									/>
								</div>
							);
						}

						return (
							<button
								key={item.value}
								type="button"
								className={`menu-picker-option-button ${
									checked ? "selected" : ""
								} ${item.disabled || disabled ? "disabled" : ""}`}
								onClick={() => handleSinglePick(item.value)}
								disabled={item.disabled || disabled}
								role="option"
								aria-selected={checked}
							>
								{item.label}
							</button>
						);
					})}
				</div>
			)}
		</div>
	);
}

