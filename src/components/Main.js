import React from "react";
import Card from "./Card";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main>
            <section className="profile">
                <div className="profile__user">
                    <div className="profile__avatar-sector">
                        <img className="profile__avatar"
                            src={currentUser.avatar}
                            alt="аватарка."
                        />
                        <button
                            type="button"
                            aria-label="редактирование аватара."
                            className="profile__avatar-change-btn"
                            onClick={props.onEditAvatar}
                        />
                    </div>
                    <div className="profile__info">
                        <div className="profile__container">
                            <h1 className="profile__name">{currentUser.name}</h1>
                            <button
                                type="button"
                                aria-label="редактирование профиля."
                                className="profile__edit-button"
                                onClick={props.onEditProfile}
                            />
                        </div>
                        <p className="profile__about">{currentUser.about}</p>
                    </div>
                </div>
                <button
                    type="button"
                    aria-label="добавление новой фотокарточки."
                    className="profile__add-button"
                    onClick={props.onAddPlace}
                />
            </section>

            <section>
                <ul className="cards">
                    {props.cards.map((card) => (
                        <Card
                            card={card}
                            key={card._id}
                            onCardClick={props.onCardClick}
                            onCardLike={props.onCardLike}
                            onCardDelete={props.onCardDelete}
                        />
                    ))}
                </ul>
            </section>

        </main>
    )
}

export default Main;