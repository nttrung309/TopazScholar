// reducers/index.ts
import { combineReducers } from 'redux';

import userStore from './auth/userStore';
import activityStore from './activity/activityStore';

const rootReducer = combineReducers({
    user: userStore,
    activity: activityStore
});

export default rootReducer;