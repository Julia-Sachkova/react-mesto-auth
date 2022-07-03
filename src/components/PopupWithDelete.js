import React from 'react';
import PopupWithForm from './PopupWithForm';


function PopupWithDelete(props) {
    function handleSubmit(evt) {
        evt.preventDefault();

        props.onDelete();
    }

    return (
        <PopupWithForm
            name="delete-confirm"
            title="Вы уверены?"
            btnText="Да"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
        />
    )
}

export default PopupWithDelete;