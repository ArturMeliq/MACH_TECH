export const CREATE_FOLDER_SUCCESS = 'CREATE_FOLDER_SUCCESS';
export const DELETE_FOLDER_SUCCESS = 'DELETE_FOLDER_SUCCESS';

export function addFolder(folder) {
  return {
    type: CREATE_FOLDER_SUCCESS,
    payload: {
      folder,
    },
  };
}

export function deleteFolder(id) {
  return {
    type: DELETE_FOLDER_SUCCESS,
    payload: {
      id,
    },
  };
}
