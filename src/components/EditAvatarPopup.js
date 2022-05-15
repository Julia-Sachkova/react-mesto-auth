import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
    const avatarRef = React.useRef();

    function handleSubmit(evt) {
        evt.preventDefault();

        props.onUpdateAvatar({
            avatar: avatarRef.current.value,
        });

        avatarRef.current.value = '';
    }

    return (
        <PopupWithForm
            name="change-avatar"
            title="Обновить аватар"
            btnText="Сохранить"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
        >
            <input
                type="url"
                name="avatar"
                required
                placeholder="Ссылка на новый аватар"
                className="popup__text popup__text_type_avatar"
                id="avatar-input"
                ref={avatarRef} />
            <span className="popup__text-error avatar-input-error"></span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;