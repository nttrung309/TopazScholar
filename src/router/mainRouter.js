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

export const privatePage = [
  routerHome,
  routerExplore,
  routerRegistered,
  routerHosting,
  routerJoined,
  routerDetail,
  routerContact
];

export const publicPage = [
  routerLogin,
  routerSignUp
];
