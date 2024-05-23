// reducers/index.ts
import { combineReducers } from 'redux';

import userStore from './auth/userStore';
import activityStore from './activity/activityStore';
import accountManageStore from './admin/account/accountManageStore';
import contactStore from './contact/contactStore';

const rootReducer = combineReducers({
    user: userStore,
    activity: activityStore,
    contact: contactStore,
    accountManage: accountManageStore
    
});

export default rootReducer;