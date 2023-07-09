export default function PopupWithForm(props) {
	return (
		<>
			<section className={`popup popup_type_${props.name} ${props.isOpen ? 'popup-visible' : ''}`}>
				{props.children}
        <div className="fondo"></div>
			</section>
		</>
	);
}