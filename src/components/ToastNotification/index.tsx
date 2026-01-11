import type { PropsWithChildren, CSSProperties } from "react";
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

import Button from "../Button";
import "./styles.css";

export type ToastNotificationProps = PropsWithChildren<{
	/** Иконка слева (как в Button) */
	icon?: IconDefinition;
	/** URL изображения для иконки */
	iconUrl?: string;
	/** Тип тоста для разных стилей */
	type?: "info" | "success" | "warning" | "error";
	/** Время в миллисекундах до автоматического закрытия (0 - не закрывать автоматически) */
	duration?: number;
	/** Функция вызываемая при закрытии тоста */
	onClose?: () => void;
	/** Показывать ли кнопку закрытия */
	showCloseButton?: boolean;
	/** Дополнительные CSS классы */
	className?: string;
	/** Дополнительные стили */
	style?: CSSProperties;
	nowrap?: boolean;
	/** Позиция тоста на экране */
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
}: ToastNotificationProps) {
	const [isVisible, setIsVisible] = useState(true);
	const [isClosing, setIsClosing] = useState(false);
	const timerRef = useRef<NodeJS.Timeout | null>(null);
	const toastRef = useRef<HTMLDivElement>(null);

	const handleClose = () => {
		if (isClosing) return;

		setIsClosing(true);
		if (timerRef.current) {
			clearTimeout(timerRef.current);
			timerRef.current = null;
		}

		setTimeout(() => {
			setIsVisible(false);
			setIsClosing(false);
			onClose?.();
		}, 200);
	};

	useEffect(() => {
		if (duration > 0 && isVisible && !isClosing) {
			timerRef.current = setTimeout(() => {
				handleClose();
			}, duration);
		}

		return () => {
			if (timerRef.current) {
				clearTimeout(timerRef.current);
			}
		};
	}, [duration, isVisible, isClosing]);

	if (!isVisible) return null;

	const getTypeClass = () => {
		switch (type) {
			case "success":
				return "toast-success";
			case "warning":
				return "toast-warning";
			case "error":
				return "toast-error";
			default:
				return "toast-info";
		}
	};

	return (
		<div
			ref={toastRef}
			className={`toast-notification ${getTypeClass()} toast-${position} ${isClosing ? "closing" : ""}`}
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
