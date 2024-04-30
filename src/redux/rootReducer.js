// reducers/index.ts
import { combineReducers } from 'redux';
import userStore from './auth/userStore';

const rootReducer = combineReducers({
    user: userStore
});

export default rootReducer;