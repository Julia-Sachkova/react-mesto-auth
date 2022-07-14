class Api {
    constructor({ baseUrl, headers }) {
        this._url = baseUrl;
        this._headers = headers;
    }

    checkResOk(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getHeaders() {
        const token = localStorage.getItem('jwt');
        return {
            'Authorization': `Bearer ${token}`,
            ...this.headers,
        };
    }

    getUserInfoApi() {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: this.getHeaders(),
        })
            .then(this.checkResOk);
    }

    getCards() {
        return fetch(`${this._url}/cards`, {
            method: 'GET',
            headers: this.getHeaders(),
        })
            .then(this.checkResOk);
    }

    editUserInfo(data) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this.getHeaders(),
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
            .then(this.checkResOk);
    }

    createUserCard(cardItem) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify({
                name: cardItem.name,
                link: cardItem.link
            })
        })
            .then(this.checkResOk);
    }

    cardLike(id) {
        return fetch(`${this._url}/cards/${id}/likes`, {
            method: 'PUT',
            headers: this.getHeaders(),
        })
            .then(this.checkResOk);
    }

    cardDislike(id) {
        return fetch(`${this._url}/cards/${id}/likes`, {
            method: 'DELETE',
            headers: this.getHeaders(),
        })
            .then(this.checkResOk);
    }

    changeLikeCardStatus(id, isLiked) {
        return fetch(`${this._url}/cards/${id}/likes`, {
            method: `${isLiked ? 'PUT' : 'DELETE'}`,
            headers: this.getHeaders(),
        })
            .then(this.checkResOk);
    }

    deleteUserCard(id) {
        return fetch(`${this._url}/cards/${id}`, {
            method: 'DELETE',
            headers: this.getHeaders(),
        })
            .then(this.checkResOk);
    }

    editAvatar(userData) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this.getHeaders(),
            body: JSON.stringify({
                avatar: userData.avatar
            })
        })
            .then(this.checkResOk);
    }
}

const api = new Api({
    baseUrl: 'http://api.mesto.julia.practicum.nomoreparties.sbs',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    credentials: 'include'
});

export default api;