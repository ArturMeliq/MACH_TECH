import { combineReducers } from 'redux';
import folders from './FoldersReducer';

const rootReducer = combineReducers({
  folders,
});
export default rootReducer;
