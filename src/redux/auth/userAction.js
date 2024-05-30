import { createAction } from '@reduxjs/toolkit';

export const setStatusLogin = createAction('userStore/setStatusLogin');

export const authLogOut = createAction('userStore/authLogOut');