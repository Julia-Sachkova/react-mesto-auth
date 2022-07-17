
export default class Api {
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

    // getHeaders() {
    //     return {
    //         'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
    //         ...this.headers,
    //     };
    // }

    getUserInfoApi() {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("jwt")}`,
                ...this._headers,
            }
        })
            .then(this.checkResOk);
    }

    editUserInfo(name, job) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("jwt")}`,
                ...this._headers,
            },
            body: JSON.stringify({
                name: name,
                about: job
            })
        })
            .then(this.checkResOk)
    }

    editAvatar(data) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("jwt")}`,
                ...this._headers,
            },
            body: JSON.stringify({
                avatar: data.avatar
            })
        })
            .then(this.checkResOk)
    }

    getCards() {
        return fetch(`${this._url}/cards`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("jwt")}`,
                ...this._headers,
            },
        })
            .then(this.checkResOk)
    }

    createUserCard(card) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("jwt")}`,
                ...this._headers,
            },
            body: JSON.stringify({
                name: card.name,
                link: card.link
            })
        })
            .then(this.checkResOk)
    }

    deleteUserCard(id) {
        return fetch(`${this._url}/cards/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("jwt")}`,
                ...this._headers,
            },
        })
            .then(this.checkResOk)
    }

    changeLikeCardStatus(id, isLiked) {
        return fetch(`${this._url}/cards/${id}/likes`, {
            method: `${isLiked ? 'PUT' : 'DELETE'}`,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("jwt")}`,
                ...this._headers,
            },
        })
            .then(this.checkResOk);
    }
}

export const api = new Api({
    baseUrl: "https://api.mesto.julia.practicum.nomoreparties.sbs",
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    },
});

