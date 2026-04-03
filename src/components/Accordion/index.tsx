import type { CSSProperties, PropsWithChildren, ReactNode } from "react";
import { Children, useMemo, useState } from "react";
import "./styles.css";

export type AccordionSectionProps = PropsWithChildren<{
	eventKey: string;
	title: ReactNode;
	disabled?: boolean;
}>;

/**
 * Helper component for `Accordion` children-slot usage.
 * It's not meant to render by itself; `Accordion` reads its props.
 */
export function AccordionSection(_props: AccordionSectionProps) {
	return null;
}

export type AccordionItem = {
	key: string;
	title: ReactNode;
	content: ReactNode;
	disabled?: boolean;
};

export type AccordionProps = PropsWithChildren<{
	items?: AccordionItem[];
	mode?: "single" | "multi";
	defaultOpenKeys?: string[];
	openKeys?: string[];
	onChange?: (keys: string[]) => void;
	className?: string;
	style?: CSSProperties;
}>;

export default function Accordion({
	items,
	children,
	mode = "single",
	defaultOpenKeys = [],
	openKeys,
	onChange,
	className,
	style,
}: AccordionProps) {
	const isControlled = openKeys !== undefined;
	const [internalOpenKeys, setInternalOpenKeys] = useState<string[]>(
		defaultOpenKeys,
	);

	const effectiveOpenKeys = isControlled ? openKeys! : internalOpenKeys;
	const openSet = useMemo(() => new Set(effectiveOpenKeys), [effectiveOpenKeys]);

	const resolvedItems: AccordionItem[] = useMemo(() => {
		if (items) return items;

		const childArray = Children.toArray(children).filter((c) => {
			return (c as any)?.props?.eventKey !== undefined;
		});

		return childArray.map((c) => {
			const el = c as any;
			const sectionProps = el.props as AccordionSectionProps;
			return {
				key: sectionProps.eventKey,
				title: sectionProps.title,
				content: sectionProps.children,
				disabled: sectionProps.disabled,
			} satisfies AccordionItem;
		});
	}, [children, items]);

	const toggleKey = (key: string) => {
		const isOpen = openSet.has(key);

		let next: string[];
		if (mode === "multi") {
			const nextSet = new Set(effectiveOpenKeys);
			if (isOpen) nextSet.delete(key);
			else nextSet.add(key);
			next = Array.from(nextSet);
		} else {
			next = isOpen ? [] : [key];
		}

		onChange?.(next);
		if (!isControlled) setInternalOpenKeys(next);
	};

	return (
		<div
			className={`accordion ${className ? " " + className : ""}`}
			style={style}
			role="presentation"
		>
			{resolvedItems.map((item) => {
				const isOpen = openSet.has(item.key);
				const buttonId = `acc-btn-${item.key}`;
				const panelId = `acc-panel-${item.key}`;

				return (
					<div key={item.key} className={`accordion-item ${isOpen ? "open" : ""}`}>
						<div className="accordion-header">
							<button
								id={buttonId}
								type="button"
								className="accordion-trigger"
								onClick={() => {
									if (item.disabled) return;
									toggleKey(item.key);
								}}
								disabled={item.disabled}
								aria-expanded={isOpen}
								aria-controls={panelId}
							>
								<span className="accordion-title">{item.title}</span>
								<span className={`accordion-chevron ${isOpen ? "open" : ""}`} aria-hidden />
							</button>
						</div>
						<div
							id={panelId}
							className={`accordion-panel ${isOpen ? "open" : ""}`}
							role="region"
							aria-labelledby={buttonId}
						>
							<div className="accordion-panel-inner">{item.content}</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}

