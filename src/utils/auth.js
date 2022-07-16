export const base_Url = 'https://api.mesto.julia.practicum.nomoreparties.sbs';

function checkResOk(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
};

export const register = (email, password) => {
    return fetch(`${base_Url}/signup`, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email,
            password
        })
    })
        .then(checkResOk)
};


export const authorization = (email, password) => {
    return fetch(`${base_Url}/signin`, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email,
            password
        })
    })
        .then(checkResOk)

};

export const checkToken = (token) => {
    return fetch(`${base_Url}/users/me`, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    })
        .then(checkResOk)
};


