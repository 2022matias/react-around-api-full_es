import React from "react";
import closeIcon from "../images/close-icon.png";
import PopupWithForm from "./PopupWithForm";
import tilde from "../images/tilde.png";
import cruz from "../images/cruz.jpg";

export default function InfoTooltip({ isRegister, onClose, isOpen }) {

    return (
        <PopupWithForm name={'info'} 
        isOpen={isOpen}>
        <form className="popup__container popup__container-info" noValidate>
          <img
            src={closeIcon}
            className="popup__close-icon close-info" onClick={onClose}
            alt="boton para cerrar el formulario"
          />
          <img
            src={isRegister ? tilde : cruz}
            className="popup__image"
            alt="imagen que indica si falló o no el registro"
          />
          <span className="popup__info">{isRegister ? '¡Correcto! Ya estás registrado.' : 'Uy, algo salio mal. Por favor, intentelo de nuevo.'}</span>
        </form>
        </PopupWithForm>
  );
}