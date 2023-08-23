export class Api {
  constructor(options) {
    this._options = options;
    this._header = { 'Content-Type': 'application/json' };
  }

  returnFetch(url, requestOptions) {
    return fetch(`${this._options.baseUrl}/${url}`, requestOptions)
      .then(async (res) => {
        if (res.ok) {
          return res.json()
        }
        const json = await res.json();
        throw new Error(json.message);
      })
      .catch((res) => Promise.reject(`${res}`));
  }

  getUserInfo(token) {
    const requestOptions = {
      method: 'GET',
      headers: {
        authorization: `Bearer ${token}`,
        ...this._header,
      },
    };
    return this.returnFetch('users/me', requestOptions);
  }

  getCards(token) {
    const requestOptions = {
      method: 'GET',
      headers: {
        authorization: `Bearer ${token}`,
        ...this._header,
      },
    };
    return this.returnFetch('cards', requestOptions);
  }

  editProfile(name, about, token) {
    const requestOptions = {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${token}`,
        ...this._header,
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    };

    return this.returnFetch('users/me', requestOptions);
  }

  addCard(name, link, token) {
    const requestOptions = {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
        ...this._header,
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    };
    return this.returnFetch('cards', requestOptions);
  }

  deleteCard(_id, token) {
    const requestOptions = {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`,
        ...this._header,
      },
    };
    return this.returnFetch(`cards/${_id}`, requestOptions);
  }

  giveLike(cardId, token) {
    const requestOptions = {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${token}`,
        ...this._header,
      },
    };
    return this.returnFetch(`cards/${cardId}/likes`, requestOptions);
  }

  removeLike(cardId, token) {
    const requestOptions = {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`,
        ...this._header,
      },
    };
    return this.returnFetch(`cards/${cardId}/likes`, requestOptions);
  }

  changeLikeCardStatus(cardId, liked, token) {
    return liked ? this.giveLike(cardId, token) : this.removeLike(cardId, token);
  }

  updateAvatar(avatar, token) {
    const requestOptions = {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${token}`,
        ...this._header,
      },
      body: JSON.stringify({
        avatar,
      }),
    };

    return this.returnFetch('users/me', requestOptions);
  }
}

const api = new Api({
  baseUrl: 'https://api.mati-sprint16.chickenkiller.com',
});

export default api;
