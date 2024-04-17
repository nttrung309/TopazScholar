//Public Routes
import { routerHome } from "../view/home/router.jsx";
import { routerLogin } from "../view/auth/Login/router.jsx";
import { routerSignUp } from "../view/auth/SignUp/router.jsx";
import { routerExplore } from "view/activity/explore/router.jsx";
import { routerRegistered } from "view/activity/registered/router.jsx";

//Private Routes

export const privatePage = [];

export const publicPage = [
  routerHome,
  routerLogin,
  routerSignUp,
  routerExplore,
  routerRegistered,
];
