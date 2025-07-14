import React from "react";
import Button from "@/components/button/Button";

const Modal = ({
  title,
  description,
  children,
  show,
  onClose,
}) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">

        <div className="modal-icon" />

        <h2 className="modal-title">{title}</h2>
        <p className="modal-description">{description}</p>

        <div className="modal-buttons">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
