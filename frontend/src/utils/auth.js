export const BASE_URL = 'http://localhost:3000';
// export const BASE_URL = "http://api.mati-sprint16.chickenkiller.com";

export const register = ({ email, password }) => fetch(`${BASE_URL}/signup`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ email, password }),
})
  .then((res) => res.json())
  .then((data) => {
    if (data.error) {
      throw new Error(data.error);
    }
    return data.error;
  });

export const authorize = ({ email, password }) => fetch(`${BASE_URL}/signin`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ email, password }),
})
  .then((res) => res.json())
  .then((data) => {
    if (data.token) {
      localStorage.setItem('token', data.token);
      return data;
    }
    throw new Error(data.error);
  })
  .catch((err) => console.log(err));

export const checkToken = (token) => fetch(`${BASE_URL}/users/me`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    authorization: `Bearer ${token}`,
  },
})
  .then((res) => res.json())
  .then((data) => {
    if (data.error) {
      throw new Error(data.error);
    }
    return data;
  })
  .catch((err) => console.log(err));
