import React from "react";
import Card from "./Card";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({ cards, avatar, onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDelete }) {
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main>
            <section className="profile">
                <div className="profile__user">
                    <div className="profile__avatar-sector">
                        <img className="profile__avatar"
                            src={avatar}
                            alt="аватарка."
                        />
                        <button
                            type="button"
                            aria-label="редактирование аватара."
                            className="profile__avatar-change-btn"
                            onClick={onEditAvatar}
                        />
                    </div>
                    <div className="profile__info">
                        <div className="profile__container">
                            <h1 className="profile__name">{currentUser.name}</h1>
                            <button
                                type="button"
                                aria-label="редактирование профиля."
                                className="profile__edit-button"
                                onClick={onEditProfile}
                            />
                        </div>
                        <p className="profile__about">{currentUser.about}</p>
                    </div>
                </div>
                <button
                    type="button"
                    aria-label="добавление новой фотокарточки."
                    className="profile__add-button"
                    onClick={onAddPlace}
                />
            </section>

            <section>
                <ul className="cards">
                    {cards.map((card) => (
                        <Card
                            card={card}
                            key={card._id}
                            onCardClick={onCardClick}
                            onCardLike={onCardLike}
                            onCardDelete={onCardDelete}
                        />
                    ))}
                </ul>
            </section>

        </main>
    )
}

export default Main;