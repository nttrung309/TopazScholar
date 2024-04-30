import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

const store = configureStore({
    reducer: rootReducer
});

export default store;

export const RootState = store.getState;
export const AppThunkDispatch = store.dispatch;
