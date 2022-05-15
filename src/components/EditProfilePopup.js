import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup(props) {
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser]);

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();

        props.onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm
            name="edit-profile"
            title="Редактировать профиль"
            btnText="Сохранить"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
        >
            <input
                type="text"
                name="name"
                placeholder="Имя"
                className="popup__text popup__text_type_name"
                minLength="2"
                maxLength="40"
                required
                id="name-input"
                value={name}
                onChange={handleChangeName} />
            <span className="popup__text-error name-input-error"></span>
            <input
                type="text"
                name="about"
                placeholder="О себе"
                className="popup__text popup__text_type_about"
                minLength="2"
                maxLength="200"
                required
                id="about-input"
                value={description}
                onChange={handleChangeDescription} />
            <span className="popup__text-error about-input-error"></span>
        </PopupWithForm>
    )
}

export default EditProfilePopup;