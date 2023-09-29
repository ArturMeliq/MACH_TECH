export const CREATE_PASSWORD_SUCCESS = 'CREATE_PASSWORD_SUCCESS';
export const DELETE_PASSWORD_SUCCESS = 'DELETE_PASSWORD_SUCCESS';
export const SET_FAVORITES_SUCCESS = 'SET_FAVORITES_SUCCESS';

export function addPassword(password) {
  return {
    type: CREATE_PASSWORD_SUCCESS,
    payload: {
      password,
    },
  };
}

export function deletePassword(id) {
  return {
    type: DELETE_PASSWORD_SUCCESS,
    payload: {
      id,
    },
  };
}

export function setFavoritesRequest(data) {
  const { id, isAllFavorite } = data;
  return {
    type: SET_FAVORITES_SUCCESS,
    payload: {
      isAllFavorite,
      id,
    },
  };
}
