export const SAVE_FOLDER_ID_SUCCESS = 'SAVE_FOLDER_ID_SUCCESS';
export const SAVE_PASSWORD_ID_SUCCESS = 'SAVE_PASSWORD_ID_SUCCESS';

export function saveFolderId(folderId) {
  return {
    type: SAVE_FOLDER_ID_SUCCESS,
    payload: {
      folderId,
    },
  };
}
export function savePasswordId(passwordId) {
  return {
    type: SAVE_PASSWORD_ID_SUCCESS,
    payload: {
      passwordId,
    },
  };
}
