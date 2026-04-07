import type { PropsWithChildren } from "react";
import "./styles.css";

export default function Card({
  children,
  title,
}: PropsWithChildren<{
  title?: string;
}>) {
  return (
    <div className="card">
      {title && <div className="card-title">{title}</div>}
      <div className="card-content">
        {children}
      </div>
    </div>
  );
}
