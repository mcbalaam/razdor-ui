import type { PropsWithChildren } from "react";
import "./styles.css";

export default function Badge({
  children,
  src,
  contrast,
  small,
  href,
}: PropsWithChildren<{
  contrast?: boolean;
  small?: boolean;
  src?: string;
  href?: string;
}>) {
  const content = (
    <>
      <img className={`badge-img ${small ? " small" : ""}`} src={src} />
      <p className={`badge-text ${small ? " small" : ""}`}>{children}</p>
    </>
  );

  return href ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`badge${contrast ? " blue" : ""}${small ? " small" : ""}`}
    >
      {content}
    </a>
  ) : (
    <div className={`badge${contrast ? " blue" : ""}${small ? " small" : ""}`}>
      {content}
    </div>
  );
}
