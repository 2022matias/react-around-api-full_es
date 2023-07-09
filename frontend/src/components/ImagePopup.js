import closeIcon from "../images/close-icon.png";

export default function ImagePopup(props) {
	return (
		<>
		<section className={`enlarge-image ${props.isOpen ? 'no-vision' : ''}`}>
        <div className="enlarge-image__container">
          <h3 className="enlarge-image__title">{props.card.name}</h3>
          <img 
            src={props.card.link}
            className="enlarge-image__image"
            alt="imagen ampliada"
          />
          <img
            src={closeIcon} 
						onClick={props.onCardClick}
            className="enlarge-image__close-image"
            alt="boton para cerrar el formulario"
          />
        </div>
        <div className="fondo"></div>
      </section>
		</>
	)
}