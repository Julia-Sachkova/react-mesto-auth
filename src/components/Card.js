import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = props.card.owner._id === currentUser._id;
    const cardDeleteButtonClassName = (
        `card__delete-button ${isOwn ? 'card__delete-button' : 'card__delete-button_none'}`
    );
    const isLiked = props.card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = (
        `card__like-button ${isLiked ? 'card__like-button_active' : 'card__like-button'}`
    );

    function handleClick() {
        props.onCardClick(props.card);
    }

    function handleLikeClick() {
        props.onCardLike(props.card)
    }

    function handleDeleteClick() {
        props.onCardDelete(props.card);
    }

    return (
        <div className="card">
            <img
                className="card__photo"
                src={props.card.link}
                alt={props.card.name}
                onClick={handleClick}
            />
            <button type="button" aria-label="удалить фото." className={cardDeleteButtonClassName} onClick={handleDeleteClick} />
            <div className="card__container">
                <h2 className="card__name">{props.card.name}</h2>
                <div className="card__like-sector">
                    <button type="button" aria-label="поставить лайк." className={cardLikeButtonClassName} onClick={handleLikeClick} />
                    <p className="card__like-counter">{props.card.likes.length}</p>
                </div>
            </div>
        </div>
    )
}

export default Card;