import type { PropsWithChildren, CSSProperties, FormEvent } from "react";
import "./styles.css";

export type FormProps = PropsWithChildren<{
	onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
	gap?: number;
	className?: string;
	style?: CSSProperties;
}>;

export default function Form({
	children,
	onSubmit,
	gap = 16,
	className,
	style,
}: FormProps) {
	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onSubmit?.(e);
	};

	return (
		<form
			className={`form${className ? " " + className : ""}`}
			style={{ gap, ...style }}
			onSubmit={handleSubmit}
			noValidate
		>
			{children}
		</form>
	);
}
