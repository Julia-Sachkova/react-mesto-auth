import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/api';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import * as auth from '../utils/auth.js';
import InfoTooltip from './InfoTooltip';
import InfoTooltipLogin from './InfoTooltipLogin';
import PopupWithDelete from './PopupWithDelete';

function App() {
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isInfoPopupOpen, setInfoPopupOpen] = React.useState(false);
  const [isInfoLoginPopupOpen, setInfoLoginPopupOpen] = React.useState(false);
  const [isPopupWithDeleteOpen, setPopupWithDeleteOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [deleteCard, setDeleteCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({ name: '', about: '', avatar: '' });
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isReg, setIsReg] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const history = useHistory();

  function handleCardDelete(card) {
    setDeleteCard(card);

    handleDeletePopupClick();
  }

  React.useEffect(() => {
    handleTokenCheck();

    if (loggedIn) {
      Promise.all([api.getUserInfoApi(), api.getCards()])
        .then(([userData, cardData]) => {
          setCurrentUser(userData);
          setCards(cardData);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleDeletePopupClick() {
    setPopupWithDeleteOpen(true);
  }

  function handleCardClick(cardItem) {
    setSelectedCard(cardItem);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleDeletePopupClick() {
    setPopupWithDeleteOpen(true);
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
  }

  function handleConfirmDeleteCard() {
    api.deleteUserCard(deleteCard._id)
      .then(() => {
        const newCards = cards.filter((c) => c._id !== deleteCard._id);
        setCards(newCards);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser(user) {
    api.editUserInfo(user)
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        closeAllPopups();
      });
  }

  function handleUpdateAvatar(user) {
    api.editAvatar(user)
      .then((dataAvatar) => {
        setCurrentUser(dataAvatar);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        closeAllPopups();
      });
  }

  function handleAddPlaceSubmit(item) {
    api.createUserCard(item)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        closeAllPopups();
      });
  }

  function handleLogin() {
    setLoggedIn(true);
  }

  function handleRegistrSubmit(email, password) {
    auth.register(email, password)
      .then((data) => {
        setInfoPopupOpen(true);
        setIsReg(true);
        history.push('/sign-in');
      })
      .catch((err) => {
        console.log(err);
        setInfoPopupOpen(false);
        setIsReg(false);
      });
  }

  function handleLoginSubmit(email, password) {
    auth.authorize(email, password)
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        setEmail(email);
        handleLogin();
        history.push('/');
      })
      .catch((err) => {
        setInfoLoginPopupOpen(true);
        console.log(err)
      });
  }

  function handleExit() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    history.push('/sign-in');
  }

  function handleTokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.checkToken(jwt)
        .then((res) => {
          handleLogin();
          history.push('/');
          setEmail(res.data.email);
        })
    }
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header email={email} onExit={handleExit} />

        <Switch>
          <ProtectedRoute
            exact
            path="/"
            loggedIn={loggedIn}
            component={Main}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />

          <Route path="/sign-in">
            <Login
              handleLogin={handleLogin}
              onSubmit={handleLoginSubmit}
            />
          </Route>

          <Route path="/sign-up">
            <Register
              handleLogin={handleLogin}
              onSubmit={handleRegistrSubmit}
            />
          </Route>
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

        {loggedIn && <Footer />}

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser} />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit} />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar} />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />

        <PopupWithDelete
          isOpen={isPopupWithDeleteOpen}
          onClose={closeAllPopups}
          onDelete={handleConfirmDeleteCard}
        />

      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;