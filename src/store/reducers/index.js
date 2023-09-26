import { combineReducers } from 'redux';
import folders from './FoldersReducer';
import users from './UsersReducer';
import folderPasswordId from './SaveFolderAndPasswordIdReducer';
import passwords from './PasswordsReducer';

const rootReducer = combineReducers({
  folders,
  users,
  folderPasswordId,
  passwords,
});
export default rootReducer;
