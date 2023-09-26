export const CREATE_PASSWORD_SUCCESS = 'CREATE_PASSWORD_SUCCESS';
export const DELETE_PASSWORD_SUCCESS = 'DELETE_PASSWORD_SUCCESS';

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
