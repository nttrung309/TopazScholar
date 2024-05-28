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
import { routerActivityAdmin } from "view/admin/activty/router.jsx";

export const privatePage = [
  routerHome,
  routerExplore,
  routerRegistered,
  routerHosting,
  routerJoined,
  routerDetail,
  routerContact,
];

export const publicPage = [routerLogin, routerSignUp, routerActivityAdmin];

export const adminPage = [routerActivityAdmin, routerAccount];
