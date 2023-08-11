import React from 'react';
import PopupWithForm from './PopupWithForm';
import closeIcon from '../images/close-icon.png';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditAvatarPopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [avatar, setAvatar] = React.useState();

  React.useEffect(() => {
    setAvatar(currentUser.avatar);
  }, []);


  function handleInputChange(e) {
    setAvatar(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: avatar,
    });
  }
  return (
    <PopupWithForm name={'avatar'}
      isOpen={props.isOpen}>
      <form onSubmit={handleSubmit} className="popup__container popup__container-avatar" noValidate>
        <img
          src={closeIcon}
          className="popup__close-icon close-avatar" onClick={props.onClose}
          alt="boton para cerrar el formulario"
        />
        <h3 className="popup__title popup__title-avatar">Cambiar foto de perfil</h3>
        <input
          onChange={handleInputChange}
          id="popup__avatar-input"
          type="url"
          className="popup__url popup__input"
          placeholder="Enlace a la imagen"
        />
        <span className="popup__avatar-input-error"></span>
        <button className="popup__button popup__button-avatar">Guardar</button>
      </form>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;