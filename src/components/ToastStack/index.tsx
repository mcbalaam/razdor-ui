import {
	createContext,
	useContext,
	useState,
	useCallback,
	ReactNode,
} from "react";
import ToastNotification, {
	type ToastNotificationProps,
} from "../ToastNotification";
import "./styles.css";

export type ToastOptions = Omit<ToastNotificationProps, "onClose" | "closing"> & {
	id?: string;
};

export type ToastStackContextType = {
	addToast: (options: ToastOptions) => string;
	removeToast: (id: string) => void;
};

export const ToastStackContext = createContext<ToastStackContextType | null>(null);

export function useToastStack(): ToastStackContextType {
	const context = useContext(ToastStackContext);
	if (!context) {
		throw new Error("useToastStack must be used within a ToastStackProvider");
	}
	return context;
}

export type ToastStackProps = {
	children: ReactNode;
	maxToasts?: number;
};

export default function ToastStack({
	children,
	maxToasts = 5,
}: ToastStackProps) {
	const [toasts, setToasts] = useState<Array<ToastOptions & { id: string }>>([]);

	const addToast = useCallback(
		(options: ToastOptions): string => {
			const id = options.id || Math.random().toString(36).substring(2, 9);
			setToasts((prev) => {
				const currentToasts =
					maxToasts && prev.length >= maxToasts
						? prev.slice(prev.length - maxToasts + 1)
						: prev;
				return [...currentToasts, { ...options, id }];
			});
			return id;
		},
		[maxToasts],
	);

	const removeToast = useCallback((id: string) => {
		setToasts((prev) => prev.filter((toast) => toast.id !== id));
	}, []);

	const toastsByPosition = toasts.reduce(
		(groups, toast) => {
			const position = toast.position || "top-right";
			if (!groups[position]) groups[position] = [];
			groups[position].push(toast);
			return groups;
		},
		{} as Record<string, Array<ToastOptions & { id: string }>>,
	);

	return (
		<ToastStackContext.Provider value={{ addToast, removeToast }}>
			{children}
			<div className="toast-stack-container">
				{[
					"top-right",
					"top-left",
					"top-center",
					"bottom-right",
					"bottom-left",
					"bottom-center",
				].map(
					(position) =>
						toastsByPosition[position]?.length > 0 && (
							<ToastPositionGroup
								key={position}
								position={position}
								toasts={toastsByPosition[position]}
								onRemove={removeToast}
							/>
						),
				)}
			</div>
		</ToastStackContext.Provider>
	);
}

function ToastPositionGroup({
	position,
	toasts,
	onRemove,
}: {
	position: ToastOptions["position"];
	toasts: Array<ToastOptions & { id: string }>;
	onRemove: (id: string) => void;
}) {
	const [removing, setRemoving] = useState<Set<string>>(new Set());

	const handleRemove = (id: string) => {
		setRemoving((prev) => new Set(prev).add(id));
		setTimeout(() => {
			onRemove(id);
		}, 200);
	};

	const isBottom = position?.startsWith("bottom");

	return (
		<div className={`toast-position-group toast-${position}`}>
			{toasts.map((toast) => (
				<div
					key={toast.id}
					className={`toast-wrapper${removing.has(toast.id) ? " removing" : ""} ${isBottom ? "bottom" : "top"}`}
				>
					<div>
						<ToastNotification
							{...toast}
							position={position}
							closing={removing.has(toast.id)}
							onClose={() => handleRemove(toast.id)}
						/>
					</div>
				</div>
			))}
		</div>
	);
}

export function useCreateToast() {
	const { addToast } = useToastStack();

	return {
		createToast: addToast,
		createInfoToast: (options: Omit<ToastOptions, "type">) =>
			addToast({ ...options, type: "info" }),
		createSuccessToast: (options: Omit<ToastOptions, "type">) =>
			addToast({ ...options, type: "success" }),
		createWarningToast: (options: Omit<ToastOptions, "type">) =>
			addToast({ ...options, type: "warning" }),
		createErrorToast: (options: Omit<ToastOptions, "type">) =>
			addToast({ ...options, type: "error" }),
	};
}