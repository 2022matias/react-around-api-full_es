export class Api {
  constructor(options) {
    this._options = options;
    this._header = { "Content-Type": "application/json" }
  }

  returnFetch(url, requestOptions) {
    return fetch(`${this._options.baseUrl}/${url}`, requestOptions)
      .then((res) => res.json())
      .catch((res) => Promise.reject(`Error: ${res.status}`));
  }

  getUserInfo(token) {
    const requestOptions = {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
        ...this._header
      }
    };
    return this.returnFetch("users/me", requestOptions);
  }

  getCards(token) {
    const requestOptions = {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
        ...this._header
      }
    };
    return this.returnFetch("cards", requestOptions);
  }

  editProfile(name, about, token) {
    const requestOptions = {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${token}`,
        ...this._header
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    };

    return this.returnFetch("users/me", requestOptions);
  }

  addCard(name, link, token) {
    const requestOptions = {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        ...this._header
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    };
    return this.returnFetch("cards", requestOptions);
  }




  deleteCard(id, token) {
    const requestOptions = {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
        ...this._header
      },
    };
    return this.returnFetch(`cards/${id}`, requestOptions);
  }

  giveLike(cardId, token) {
    const requestOptions = {
      method: "PUT",
      headers: {
        authorization: `Bearer ${token}`,
        ...this._header
      },
    };
    return this.returnFetch(`cards/likes/${cardId}`, requestOptions);
  }

  removeLike(cardId, token) {
    const requestOptions = {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
        ...this._header
      },
    };
    return this.returnFetch(`cards/likes/${cardId}`, requestOptions);
  }

  changeLikeCardStatus(cardId, liked) {
    return liked ? this.giveLike(cardId) : this.removeLike(cardId);
  }

  updateAvatar(avatar, token) {
    const requestOptions = {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${token}`,
        ...this._header
      },
      body: JSON.stringify({
        avatar,
      }),
    };

    return this.returnFetch("users/me", requestOptions);
  }
}

const api = new Api({
  // authorization: "61c6f68c-f2f6-410f-a75d-8fc57629e184",
  // baseUrl: "https://around.nomoreparties.co/v1/web_es_cohort_04",
  baseUrl: "http://localhost:3000",
});


export default api;