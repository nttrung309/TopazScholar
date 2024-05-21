// reducers/index.ts
import { combineReducers } from 'redux';

import userStore from './auth/userStore';
import activityStore from './activity/activityStore';
import accountManageStore from './admin/account/accountManageStore';

const rootReducer = combineReducers({
    user: userStore,
    activity: activityStore,
    accountManage: accountManageStore
});

export default rootReducer;