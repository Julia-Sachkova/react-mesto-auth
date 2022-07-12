export const BASE_URL = 'http://localhost:3000';

const checkResOk = (res) => {
    res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`);
};

export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        // credentials: 'include',
        body: JSON.stringify({
            email,
            password
        })
    })
        .then(checkResOk);
};

export const authorization = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        // credentials: 'include',
        body: JSON.stringify({ email, password })
    })
        .then(checkResOk);
};

export const checkToken = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        },
        // credentials: 'include'
    })
        .then(checkResOk)
        .then(data => data);
}
