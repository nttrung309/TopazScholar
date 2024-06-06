//Public Routes
import { routerLogin } from "../view/auth/Login/router.jsx";
import { routerSignUp } from "../view/auth/SignUp/router.jsx";

//Private Routes
import {
  routerExplore,
  routerHosting,
  routerJoined,
  routerRegistered,
} from "view/activity/router.jsx";
import { routerDetail } from "view/detail/router.jsx";
import { routerContact } from "view/contact/router.jsx";
import { routerHome } from "../view/home/router.jsx";
import { routerAccount } from "view/admin/account/router.jsx";
import { routerActivityAdmin } from "view/admin/activity/router.jsx";
import {
  routerCreateActivity,
  routerEditActivity,
} from "view/admin/create-edit-activity/router.jsx";
import { routerStatistics } from "view/admin/statistics/router.jsx";
import { routerCalendar } from "view/calendar/router.jsx";


export const privatePage = [
  routerHome,
  routerExplore,
  routerRegistered,
  routerHosting,
  routerJoined,
  routerDetail,
  routerContact,
  routerCalendar
];

export const publicPage = [routerLogin, routerSignUp];

export const adminPage = [
  routerActivityAdmin,
  routerAccount,
  routerCreateActivity,
  routerEditActivity,
  routerStatistics,
];
