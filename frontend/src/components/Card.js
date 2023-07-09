import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);
  const cardlikeButtonClassName = isLiked ? 'element__heart element__heart-black' : 'element__heart';
  function handleClickCard () {
    props.onCardClick(props.card)
  }
  function handleLikeClick () {
    props.onCardLike(props.card)
  }
  function handleCardDelete () {
    props.onCardDelete(props.card)
  }

	return (
		<>
			<article className="element">
          <img 
            onClick={handleClickCard}
            src={props.card.link} 
            className="element__image"
            alt="foto del valle de yosemite"
          />
          <div className="element__background">
            <div className="element__info">
              <h3 className="element__name">{props.card.name}</h3>
              <div className="element__div">
                <button className={cardlikeButtonClassName} onClick={handleLikeClick}></button>
                <div className="element__contador">{props.card.likes.length}</div>
              </div>
              {isOwn && <button className="element__trash" onClick={handleCardDelete}  /*onClick={props.onConfirmClick}*/></button>}
            </div>
          </div>
        </article>
		</>
	)
}

export default Card;