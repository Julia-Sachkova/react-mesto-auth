import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
    const nameRef = React.useRef();
    const linkRef = React.useRef();

    function handleSubmit(evt) {
        evt.preventDefault();

        props.onAddPlace({
            name: nameRef.current.value,
            link: linkRef.current.value
        });

        nameRef.current.value = '';
        linkRef.current.value = '';
    }
    return (
        <PopupWithForm
            name="add-card"
            title="Новое место"
            btnText="Создать"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
        >
            <input
                type="text"
                name="name"
                required
                placeholder="Название"
                minLength="2"
                maxLength="30"
                className="popup__text popup__text_type_card-name"
                id="cardname-input"
                ref={nameRef} />
            <span className="popup__text-error cardname-input-error"></span>
            <input
                type="url"
                name="link"
                required
                placeholder="Ссылка на картинку"
                className="popup__text popup__text_type_card-link"
                id="cardlink-input"
                ref={linkRef} />
            <span className="popup__text-error cardlink-input-error"></span>
        </PopupWithForm>
    )
}

export default AddPlacePopup;