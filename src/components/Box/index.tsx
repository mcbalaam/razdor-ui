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
      {actions && (
        <div className="box-actions">
          {actions}
        </div>
      )}
      <div className="box-content">
        {children}
      </div>
    </div>
  );
}
