import { useToastStack } from "../ToastStack";
import type { ToastOptions } from "../ToastStack";

/// Creates a site-wide toast notification that will appear inside the toast stack.
export function createToast(options: ToastOptions): string {
	console.warn("createToast should be used via useCreateToast hook within ToastStack context");
	return "";
}

export { useCreateToast } from "../ToastStack";
export type { ToastOptions } from "../ToastStack";