import type { PropsWithChildren, CSSProperties } from "react";
import "./styles.css";

export function ButtonBlock({
  children,
  className,
  style,
}: PropsWithChildren<{
  className?: string;
  style?: CSSProperties;
}>) {
  return (
    <div
      className={`button-block${className ? " " + className : ""}`}
      style={style}
    >
      {children}
    </div>
  );
}
