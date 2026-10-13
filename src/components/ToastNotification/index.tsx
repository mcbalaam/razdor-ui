import type { PropsWithChildren, CSSProperties } from "react";
import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import type { IconType } from "../../icons";
import Button from "../Button";
import "./styles.css";

export type ToastNotificationProps = PropsWithChildren<{
	icon?: IconType;
	iconUrl?: string;
	type?: "info" | "success" | "warning" | "error";
	duration?: number;
	onClose?: () => void;
	showCloseButton?: boolean;
	className?: string;
	style?: CSSProperties;
	nowrap?: boolean;
	closing?: boolean;
	position?:
		| "top-right"
		| "top-left"
		| "bottom-right"
		| "bottom-left"
		| "top-center"
		| "bottom-center";
}>;

export default function ToastNotification({
	children,
	icon: Icon,
	iconUrl,
	type = "info",
	duration = 5000,
	onClose,
	showCloseButton = true,
	className = "",
	style,
	position = "top-right",
	nowrap,
	closing: externalClosing = false,
}: ToastNotificationProps) {
	const [isClosing, setIsClosing] = useState(false);
	const timerRef = useRef<NodeJS.Timeout | null>(null);

	const effectiveClosing = externalClosing || isClosing;

	const handleClose = () => {
		if (effectiveClosing) return;
		setIsClosing(true);
		if (timerRef.current) {
			clearTimeout(timerRef.current);
			timerRef.current = null;
		}
		onClose?.();
	};

	useEffect(() => {
		if (duration > 0 && !effectiveClosing) {
			timerRef.current = setTimeout(handleClose, duration);
		}
		return () => {
			if (timerRef.current) clearTimeout(timerRef.current);
		};
	}, [duration, effectiveClosing]);

	const getTypeClass = () => {
		switch (type) {
			case "success": return "toast-success";
			case "warning": return "toast-warning";
			case "error": return "toast-error";
			default: return "toast-info";
		}
	};

	return (
		<div
			className={`toast-notification ${getTypeClass()} toast-${position} ${effectiveClosing ? "closing" : ""}`}
			style={style}
		>
			<div className="toast-content">
				{(Icon || iconUrl) && (
					<div className="toast-icon">
						{Icon && <Icon className="toast-icon-svg" size={20} />}
						{iconUrl && <img className="toast-icon-img" src={iconUrl} alt="" />}
					</div>
				)}
				<div className={`toast-message ${className} ${nowrap ? "nowrap" : ""}`}>
					{children}
				</div>
			</div>
			{showCloseButton && (
				<Button
					className="toast-close-button"
					onClick={handleClose}
					icon={X}
				/>
			)}
		</div>
	);
}