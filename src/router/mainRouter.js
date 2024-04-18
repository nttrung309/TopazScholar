//Public Routes
import { routerHome } from "../view/home/router.jsx";
import { routerLogin } from "../view/auth/Login/router.jsx";
import { routerSignUp } from "../view/auth/SignUp/router.jsx";
import {
  routerExplore,
  routerHosting,
  routerJoined,
  routerRegistered,
} from "view/activity/router.jsx";
import { routerDetail } from "view/detail/router.jsx";

//Private Routes

export const privatePage = [];

export const publicPage = [
  routerHome,
  routerLogin,
  routerSignUp,
  routerExplore,
  routerRegistered,
  routerHosting,
  routerJoined,
  routerDetail,
];
