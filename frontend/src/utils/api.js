export class Api {
  constructor(options) {
    this._options = options;
    this._header = new Headers();
    this._header.append("Authorization", this._options.authorization);
    this._header.append("Content-Type", "application/json");
  }

  returnFetch(url, requestOptions) {
    return fetch(`${this._options.baseUrl}/${url}`, requestOptions)
      .then((res) => res.json())
      .catch((res) => Promise.reject(`Error: ${res.status}`));
  }

  getUserInfo() {
    const requestOptions = {
      method: "GET",
      headers: this._header,
    };
    return this.returnFetch("users/me", requestOptions);
  }

  getCards() {
    const requestOptions = {
      method: "GET",
      headers: this._header,
    };
    return this.returnFetch("cards", requestOptions);
  }

  editProfile(name, about) {
    const requestOptions = {
      method: "PATCH",
      headers: this._header,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    };

    return this.returnFetch("users/me", requestOptions);
  }

  addCard(name, link) {
    const requestOptions = {
      method: "POST",
      headers: this._header,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    };
    return this.returnFetch("cards", requestOptions);
  }

  deleteCard(id) {
    const requestOptions = {
      method: "DELETE",
      headers: this._header,
    };
    return this.returnFetch(`cards/${id}`, requestOptions);
  }

  giveLike(cardId) {
    const requestOptions = {
      method: "PUT",
      headers: this._header,
    };
    return this.returnFetch(`cards/likes/${cardId}`, requestOptions);
  }

  removeLike(cardId) {
    const requestOptions = {
      method: "DELETE",
      headers: this._header,
    };
    return this.returnFetch(`cards/likes/${cardId}`, requestOptions);
  }

  changeLikeCardStatus(cardId, liked) {
    return liked ? this.giveLike(cardId) : this.removeLike(cardId);
  }

  updateAvatar({avatar}) {
    const requestOptions = {
      method: "PATCH",
      headers: this._header,
      body: JSON.stringify({
        avatar,
      }),
    };
  
    return this.returnFetch("users/me/avatar", requestOptions);
  }
}

 const api = new Api({
  authorization: "61c6f68c-f2f6-410f-a75d-8fc57629e184",
  baseUrl: "https://around.nomoreparties.co/v1/web_es_cohort_04",
});

 
export default api;