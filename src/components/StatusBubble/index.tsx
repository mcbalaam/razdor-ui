import type { PropsWithChildren } from "react";
import "./styles.css";

export default function StatusBubble({ children }: PropsWithChildren<{}>) {
  return <div className="status-bubble">{children}</div>;
}
