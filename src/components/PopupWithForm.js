function PopupWithForm({ name, title, isOpen, onClose, children, btnText, onSubmit }) {
    return (
        <article
            className={`popup popup_${name} ${isOpen && 'popup_opened'}`}
        >
            <div className="popup__container">
                <h2 className="popup__title">{title}</h2>
                <form
                    name={name}
                    className={`popup__form popup__${name}`}
                    noValidate
                    onSubmit={onSubmit}
                >
                    {children}
                    <button
                        type="submit"
                        className="popup__submit-button"
                    >
                        {btnText}
                    </button>
                </form>
                <button
                    type="button"
                    className="popup__close-button"
                    onClick={onClose}
                />
            </div>
        </article>
    )
}

export default PopupWithForm;