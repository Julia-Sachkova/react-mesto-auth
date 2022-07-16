import React, { useState, useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import Register from './Register';
import Login from './Login';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import PopupWithDelete from './PopupWithDelete';
import InfoTooltip from './InfoTooltip';
import InfoTooltipLogin from './InfoTooltipLogin';
import * as auth from './../utils/auth';
import { api } from './../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import ProtectedRoute from './ProtectedRoute';


export default function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isPopupWithDeleteOpen, setPopupWithDeleteOpen] = useState(false);
  const [isInfoLoginPopupOpen, setInfoLoginPopupOpen] = useState(false);
  const [isInfoPopupOpen, setInfoPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [deleteCard, setDeleteCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isReg, setIsReg] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const history = useHistory();

  function handleTokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.checkToken(jwt)
        .then((res) => {
          if (res)
            handleLogin();
          history.push('/');
          setEmail(res.email);
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }

  useEffect(() => {
    handleTokenCheck();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfoApi(), api.getCards()])
        .then(([user, cards]) => {
          setCurrentUser(user);
          setCards(cards);
        })
        .catch((err) => console.log(`Ошибка ${err}`));
    } else {
      return;
    }
  }, [loggedIn]);

  function handleLogin() {
    setLoggedIn(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  };

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  };

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  };

  function handleCardClick(card) {
    setSelectedCard(card);
  };

  function handleDeletePopupClick() {
    setPopupWithDeleteOpen(true);
  }

  function handleCardDelete(card) {
    setDeleteCard(card);
    handleDeletePopupClick();
  }

  function closeAllPopups() {
    setAddPlacePopupOpen(false);
    setEditProfilePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setInfoPopupOpen(false);
    setInfoLoginPopupOpen(false);
    setPopupWithDeleteOpen(false);
    setSelectedCard(null);
    setDeleteCard(null);
  };

  function handleLoginSubmit(email, password) {
    auth.authorization(email, password)
      .then((res) => {
        if (res) {
          localStorage.setItem('jwt', res.token)
          setEmail(email);
          setLoggedIn(true);
          history.replace({ pathname: "/" });
        }
      })
      .catch((err) => {
        setInfoLoginPopupOpen(true);
        console.log(err);
      })
  }

  const handleRegistrSubmit = (email, password) => {
    auth.register(email, password)
      .then((res) => {
        if (res) {
          setInfoPopupOpen(true);
          setIsReg(true);
          history.push("/signin");
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .catch(() => {
        setInfoPopupOpen(false);
        setIsReg(false);
      })
  }

  function handleUpdateUser(user) {
    api.editUserInfo(user.name, user.about)
      .then((userData) => {
        setCurrentUser({
          ...currentUser,
          name: userData.name,
          about: userData.about
        });
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        closeAllPopups();
      })
  };

  function handleUpdateAvatar(data) {
    api.editAvatar(data)
      .then((data) => {
        setCurrentUser({
          ...currentUser,
          avatar: data.avatar
        });
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        closeAllPopups();
      })
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.lig(err)
      })
  };

  function handleConfirmDeleteCard() {
    api.deleteUserCard(deleteCard._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== deleteCard._id))
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        closeAllPopups();
      })
  };

  function handleAddPlaceSubmit(card) {
    api.createUserCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        closeAllPopups();
      })
  };

  function handleExit() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    history.push("/signin");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <div className="page">
          <Header email={email} exitUser={handleExit} />

          <Switch>

            <ProtectedRoute
              exact path="/"
              loggedIn={loggedIn}
              component={Main}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              cards={cards}
            />
            <Route path="/signup">
              <Register
                handleLogin={handleLogin}
                onSubmit={handleRegistrSubmit}
              />
            </Route>

            <Route path="/signin">
              <Login
                handleLogin={handleLogin}
                onSubmit={handleLoginSubmit}
              />
            </Route>

            <Footer />

          </Switch>

          <InfoTooltip
            isOPen={isInfoPopupOpen}
            onClose={closeAllPopups}
            isReg={isReg}
            okText='Вы успешно зарегистрировались!'
            errText='Что-то пошло не так! Попробуйте ещё раз.'
          />

          <InfoTooltipLogin
            isOPen={isInfoLoginPopupOpen}
            onClose={closeAllPopups}
            isLog={loggedIn}
            errText='Что-то пошло не так! Попробуйте ещё раз.'
          />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
          />

          <PopupWithDelete
            isOpen={isPopupWithDeleteOpen}
            onClose={closeAllPopups}
            onDelete={handleConfirmDeleteCard}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}