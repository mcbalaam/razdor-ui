import type { PropsWithChildren } from "react";
import { useState, useEffect, useRef } from "react";
import "./styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../Button";
import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark";

export type ModalControl = {
  isOpen: boolean;
  onClose: () => void;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  showCloseButton?: boolean;
  title?: React.ReactNode;
  footerButtons?: React.ReactNode;
};

export default function ModalPopup({
  children,
  control,
  className = "",
}: PropsWithChildren<{
  control: ModalControl;
  className?: string;
}>) {
  const {
    isOpen,
    onClose,
    closeOnOverlayClick = true,
    closeOnEscape = true,
    showCloseButton = true,
    title,
    footerButtons,
  } = control;

  const [isClosing, setIsClosing] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (closeOnEscape && e.key === "Escape" && isOpen && !isClosing) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, closeOnEscape, isClosing]);

  const handleClose = () => {
    if (isClosing) return;

    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 200);
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnOverlayClick && e.target === overlayRef.current && !isClosing) {
      handleClose();
    }
  };

  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  if (!isOpen && !isClosing) return null;

  return (
    <div
      ref={overlayRef}
      className={`modal-overlay ${isClosing ? "closing" : ""}`}
      onClick={handleOverlayClick}
    >
      <div
        ref={modalRef}
        className={`modal-popup ${className} ${isClosing ? "closing" : ""}`}
        onClick={handleModalClick}
      >
        {(title || showCloseButton) && (
          <div className="modal-header">
            {title && <h2 className="modal-title">{title}</h2>}
            {showCloseButton && (
              <Button
                className="modal-close-button"
                onClick={handleClose}
                faIcon={faXmark}
              />
            )}
          </div>
        )}

        <div className="modal-content">{children}</div>

        {footerButtons && <div className="modal-footer">{footerButtons}</div>}
      </div>
    </div>
  );
}
