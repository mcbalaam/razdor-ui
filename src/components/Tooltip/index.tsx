import type { PropsWithChildren } from "react";
import "./styles.css";

interface TooltipProps {
  children: React.ReactNode;
  text: string;
  className: string;
}

export default function Tooltip({ children, text, className }: TooltipProps) {
  return (
    <span className="tooltip-wrapper">
      {children}
      <span className={"tooltip-text " + className}>{text}</span>
    </span>
  );
}
