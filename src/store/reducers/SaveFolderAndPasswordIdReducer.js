import { SAVE_FOLDER_ID_SUCCESS, SAVE_PASSWORD_ID_SUCCESS } from '../actions/SaveFolderAndPasswordId';

const initialState = {
  folderId: '',
  passwordId: '',
};
// eslint-disable-next-line default-param-last
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SAVE_FOLDER_ID_SUCCESS: {
      return {
        ...state,
        folderId: action.payload.folderId,
      };
    }
    case SAVE_PASSWORD_ID_SUCCESS: {
      return {
        ...state,
        passwordId: action.payload.passwordId,
      };
    }

    default: {
      return state;
    }
  }
}
