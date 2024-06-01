// reducers/index.ts
import { combineReducers } from "redux";

import userStore from "./auth/userStore";
import activityStore from "./activity/activityStore";
import accountManageStore from "./admin/account/accountManageStore";
import contactStore from "./contact/contactStore";
import hostStore from "./host/hostStore";

const rootReducer = combineReducers({
  user: userStore,
  activity: activityStore,
  contact: contactStore,
  accountManage: accountManageStore,
  host: hostStore,
});

export default rootReducer;
