import { combineReducers } from 'redux';
import folders from './foldersReducer';
import users from './usersReducer';
import folderPasswordId from './saveFolderAndPasswordIdReducer';
import passwords from './passwordsReducer';

const rootReducer = combineReducers({
  folders,
  users,
  folderPasswordId,
  passwords,
});
export default rootReducer;
