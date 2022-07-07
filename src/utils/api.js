class Api {
    constructor({ baseUrl, headers, credentials }) {
        this._url = baseUrl;
        this._credentials = credentials;
        this._headers = headers;
    }

    _checkResOk(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getUserInfoApi() {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: this._headers,
            credentials: this._credentials
        })
            .then(this._checkResOk);
    }

    getCards() {
        return fetch(`${this._url}/cards`, {
            method: 'GET',
            headers: this._headers,
            credentials: this._credentials
        })
            .then(this._checkResOk);
    }

    editUserInfo(userData) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            credentials: this._credentials,
            body: JSON.stringify({
                name: userData.name,
                about: userData.about
            })
        })
            .then(this._checkResOk);
    }

    createUserCard(cardItem) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            credentials: this._credentials,
            body: JSON.stringify({
                name: cardItem.name,
                link: cardItem.link
            })
        })
            .then(this._checkResOk);
    }

    cardLike(id) {
        return fetch(`${this._url}/cards/${id}/likes`, {
            method: 'PUT',
            headers: this._headers,
            credentials: this._credentials
        })
            .then(this._checkResOk);
    }

    cardDislike(id) {
        return fetch(`${this._url}/cards/${id}/likes`, {
            method: 'DELETE',
            headers: this._headers,
            credentials: this._credentials
        })
            .then(this._checkResOk);
    }

    changeLikeCardStatus(id, isLiked) {
        return fetch(`${this._url}/cards/${id}/likes`, {
            method: `${isLiked ? 'PUT' : 'DELETE'}`,
            headers: this._headers,
            credentials: this._credentials
        })
            .then(this._checkResOk);
    }

    deleteUserCard(id) {
        return fetch(`${this._url}/cards/${id}`, {
            method: 'DELETE',
            headers: this._headers,
            credentials: this._credentials
        })
            .then(this._checkResOk);
    }

    editAvatar(userData) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            credentials: this._credentials,
            body: JSON.stringify({
                avatar: userData.avatar
            })
        })
            .then(this._checkResOk);
    }
}

const api = new Api({
    baseUrl: 'http://api.mesto.julia.practicum.nomoreparties.sbs',
    headers: {
        'Content-Type': 'application/json'
    },
    credentials: 'include'
});

export default api;