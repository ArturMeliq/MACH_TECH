export const CHANGE_USER_REQUEST = 'CHANGE_USER_REQUEST';

export function changeUser({ id, accessRights }) {
  return {
    type: CHANGE_USER_REQUEST,
    payload: {
      id,
      accessRights,
    },
  };
}
