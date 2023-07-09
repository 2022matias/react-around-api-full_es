import React from "react";
import api from "../utils/api";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import closeIcon from "../images/close-icon.png";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import InfoTooltip from "./InfoTooltip";
import { Route, Routes, Navigate } from 'react-router-dom';
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import { useNavigate } from 'react-router-dom';
import * as auth from "../utils/auth";

export default function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(true);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(true);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(true);
  const [isConfirmPopupOpen, setIsconfirmPopupOpen] = React.useState(true);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(true);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(true);

  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState([]);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [isRegister, setIsRegister] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    api.getUserInfo().then((res) => {
      setCurrentUser(res);
    })
    api.getCards().then((res) => {
      setCards(res);
    })
  }, []);

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      auth.checkToken(token)
        .then((data) => {
          if (data) {
            setEmail(data.data.email);
            setIsLoggedIn(true);
            navigate('/');
          } else {
            console.log('El token no es válido.');
            navigate('/signin');
          }
        })
    }
  }, [navigate]);


  function onEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function onEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function onAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function onConfirmClick() {
    setIsconfirmPopupOpen(!isConfirmPopupOpen);
  }

  function onInfoTooltipClick() {
    setIsInfoTooltipOpen(!isInfoTooltipOpen);
  }

  function onIsRegister(value) {
    setIsRegister(value);
  }

  function onCardClick(card) {
    setIsImagePopupOpen(!isImagePopupOpen);
    setSelectedCard(card)
  }

  function handleUpdateUser({ name, about }) {
    api.editProfile(name, about).then((res) => {
      setCurrentUser(res);
      onEditProfileClick();
    })
  }

  function handleUpdateAvatar(avatar) {
    api.updateAvatar(avatar).then((res) => {
      setCurrentUser(res);
      onEditAvatarClick();
    })
  }

  function handleUpdatePlace({ place, url }) {
    api.addCard(place, url).then((res) => {
      setCards([res, ...cards]);
      onAddPlaceClick();
    })
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c));
    });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
      const newCards = cards.filter((c) => c._id !== card._id);
      setCards(newCards);
    });
  }

  function updateEmail(email) {
    setEmail(email);
  }

  function signOut() {
    localStorage.removeItem('token');
    navigate('/signin');
    setIsLoggedIn(false);
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header email={email} signOut={signOut} isLoggedIn={isLoggedIn} />
        <Routes>
          <Route path="/signup" element={<Register onInfoTooltipClick={onInfoTooltipClick} onIsRegister={onIsRegister} />} />
          <Route path="/signin" element={<Login setIsLoggedIn={setIsLoggedIn} updateEmail={updateEmail} onInfoTooltipClick={onInfoTooltipClick} onIsRegister={onIsRegister} />} />
          <Route path="/" element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Main
                cards={cards}
                onEditAvatarClick={onEditAvatarClick}
                onEditProfileClick={onEditProfileClick}
                onAddPlaceClick={onAddPlaceClick}
                onConfirmClick={onConfirmClick}
                onCardClick={onCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
              />
            </ProtectedRoute>
          } />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={onEditProfileClick} onUpdateUser={handleUpdateUser} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={onEditAvatarClick} onUpdateAvatar={handleUpdateAvatar} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={onAddPlaceClick} onAddPlace={handleUpdatePlace} />
        <InfoTooltip isOpen={isInfoTooltipOpen} onClose={onInfoTooltipClick} isRegister={isRegister} />
        <PopupWithForm name={'question'}
          isOpen={isConfirmPopupOpen}>
          <form className="popup__container popup__container-confirm" noValidate>
            <img
              src={closeIcon}
              className="popup__close-icon close-question" onClick={onConfirmClick}
              alt="boton para cerrar el formulario"
            />
            <h3 className="popup__title popup__title-confirm">¿Estás seguro?</h3>
            <button className="popup__button confirm">Si</button>
          </form>
        </PopupWithForm>
        <ImagePopup isOpen={isImagePopupOpen}
          onCardClick={onCardClick}
          card={selectedCard}
        />
      </CurrentUserContext.Provider>
    </div >
  );
}
