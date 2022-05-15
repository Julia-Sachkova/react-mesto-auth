function ImagePopup({ card, onClose }) {
    return (
        <article className={`popup popup_photo-zoom ${card && 'popup_opened'}`}>
            <div className="popup__container-zoom">
                <img
                    className="popup__image"
                    src={card && card.link}
                    alt={card && card.name}
                />
                <h2 className="popup__photo-name">{card && card.name}</h2>
                <button
                    type="button"
                    aria-label="закрыть окно карточки."
                    className="popup__close-button"
                    onClick={onClose}
                />
            </div>
        </article>
    )
}

export default ImagePopup;