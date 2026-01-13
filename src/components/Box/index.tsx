import type { PropsWithChildren, CSSProperties, ReactNode } from "react";
import "./styles.css";

export function Box({
  children,
  className,
  style,
  actions,
}: PropsWithChildren<{
  className?: string;
  style?: CSSProperties;
  actions?: ReactNode;
}>) {
  return (
    <div
      className={`box${className ? " " + className : ""}`}
      style={style}
    >
      <div className="box-content">
        {children}
      </div>
      {actions && (
        <div className="box-actions">
          {actions}
        </div>
      )}
    </div>
  );
}
