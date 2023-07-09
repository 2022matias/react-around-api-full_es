import React from 'react';
import PopupWithForm from "./PopupWithForm";
import closeIcon from "../images/close-icon.png";

function AddPlacePopup(props) {
  const [place, setPlace] = React.useState();
  const [url, setUrl] = React.useState();

  function handleAddPlaceSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      place: place,
      url: url,
    })
  }

  function handleInputChangePlace(e) {
    setPlace(e.target.value);
  }
  function handleInputChangeUrl(e) {
    setUrl(e.target.value);
  }
  return (
    <PopupWithForm name={'card'}
      isOpen={props.isOpen}>
      <form onSubmit={handleAddPlaceSubmit} className="popup__container popup__container_card">
        <img
          src={closeIcon}
          className="popup__close-icon" onClick={props.onClose}
          alt="boton para cerrar el formulario"
        />
        <h3 className="popup__title">Nuevo lugar</h3>
        <input
          onChange={handleInputChangePlace}
          id="popup__place-input"
          type="text"
          className="popup__place popup__input"
          placeholder="Título"
          minLength="2"
          maxLength="30"
          required
        />
        <span className="popup__place-input-error"></span>
        <input
          onChange={handleInputChangeUrl}
          id="popup__url-input"
          type="url"
          className="popup__url popup__input"
          placeholder="Enlace a la imagen"
        />
        <span className="popup__url-input-error"></span>
        <button className="popup__button">Crear</button>
      </form>
    </PopupWithForm>
  )
}

export default AddPlacePopup;