import React from 'react';
import PopupWithForm from './PopupWithForm';
import closeIcon from '../images/close-icon.png';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState(currentUser.name || '');
  const [description, setDescription] = React.useState(currentUser.about || '');

  React.useEffect(() => {
    setName(currentUser.name || '');
    setDescription(currentUser.about || '');
  }, [currentUser.name, currentUser.about]);


  React.useEffect(() => {
    setName("");
    setDescription("");
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  function handleInputChangeName(e) {
    setName(e.target.value);
  }
  function handleInputChangeAbout(e) {
    setDescription(e.target.value);
  }

  return (
    <PopupWithForm name={'profile'}
      isOpen={props.isOpen} >
      <form onSubmit={handleSubmit} className="popup__container" noValidate>
        <img
          src={closeIcon}
          className="popup__close-icon" onClick={props.onClose}
          alt="boton para cerrar el formulario"
        />
        <h3 className="popup__title">Editar perfil</h3>
        <input
          onChange={handleInputChangeName}
          name="name"
          id="popup__name-input"
          type="text"
          className="popup__name popup__input"
          placeholder="Inserte su Nombre"
          minLength="2"
          maxength="40"
          required
          value={name}
        />
        <span className="popup__name-input-error"></span>
        <input
          onChange={handleInputChangeAbout}
          name="about"
          id="popup__skill-input"
          type="text"
          className="popup__skill popup__input"
          placeholder="Inserte su Skill"
          minLength="2"
          maxength="200"
          required
          value={description}
        />
        <span className="popup__skill-input-error"></span>
        <button type="submit" className="popup__button">Guardar</button>
      </form>
    </PopupWithForm>
  );
}
