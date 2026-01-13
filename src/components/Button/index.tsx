import type { PropsWithChildren, CSSProperties } from "react";
import { faIcons } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
  faIcon,
  tiny,
  keyboard,
  type = "button",
}: PropsWithChildren<{
  color?: "primary" | "secondary" | "good" | "bad" | "danger" | "transparent" | "disabled"
  fill?: boolean;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  keyboard?: boolean;
  className?: string;
  style?: CSSProperties;
  faIcon?: typeof faIcons;
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
      {faIcon && <FontAwesomeIcon className="button-img icon" icon={faIcon} />}
      {href && <img className="button-img" src={href} alt="img" />}
      {children && <span className="fancy-button-text">{children}</span>}
    </button>
  );
}
