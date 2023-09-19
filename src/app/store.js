import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import useReducer from '../features/login_form/userSlice';

export const store = configureStore({
  reducer: {
    // counter: counterReducer,
    user: useReducer
  },
});
