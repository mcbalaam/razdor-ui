import { useToastStack } from "../ToastStack";
import type { ToastOptions } from "../ToastStack";

export function createToast(options: ToastOptions): string {
  // This is a convenience function that will be used within components
  // The actual implementation will use the context
  console.warn("createToast should be used via useCreateToast hook within ToastStack context");
  return "";
}

// Export the hook for components to use
export { useCreateToast } from "../ToastStack";

export type { ToastOptions } from "../ToastStack";