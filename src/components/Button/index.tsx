import type { PropsWithChildren, CSSProperties } from "react";
import type { IconType } from "../../icons";
import "./styles.css";

export default function Button({
  children,
  color,
  fill,
  href,
  onClick,
  disabled,
  className,
  style,
  icon: Icon,
  tiny,
  keyboard,
  type = "button",
}: PropsWithChildren<{
  color?: "primary" | "secondary" | "good" | "bad" | "danger" | "transparent" | "disabled" | "contrast"
  fill?: boolean;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  keyboard?: boolean;
  className?: string;
  style?: CSSProperties;
  icon?: IconType;
  type?: "button" | "submit" | "reset";
  tiny?: boolean;
}>) {
  return (
    <button
      className={`fancy-button${fill ? " fill" : ""}${className ? " " + className : ""}${" " + color}${tiny ? " tiny" : ""}${keyboard ? " keyboard" : ""}`}
      onClick={onClick}
      disabled={disabled}
      style={style}
      type={type}
    >
      {Icon && <Icon className="button-img icon" size={20} />}
      {href && <img className="button-img" src={href} alt="img" />}
      {children && <span className="fancy-button-text">{children}</span>}
    </button>
  );
}
