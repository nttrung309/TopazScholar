import { createAction } from '@reduxjs/toolkit';

export const updateNewMessage = createAction('contactStore/updateNewMessage');

export const updateSelectedContactID = createAction('contactStore/updateSelectedContactID');