import type { PropsWithChildren, CSSProperties } from "react";
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import Button from "../Button";
import "./styles.css";

export type ToastNotificationProps = PropsWithChildren<{
	icon?: IconDefinition;
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
	icon,
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
		setTimeout(() => {
			onClose?.();
		}, 200);
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
				{(icon || iconUrl) && (
					<div className="toast-icon">
						{icon && <FontAwesomeIcon className="toast-icon-svg" icon={icon} />}
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
					faIcon={faXmark}
				/>
			)}
		</div>
	);
}