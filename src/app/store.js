import { configureStore } from '@reduxjs/toolkit';
// import counterReducer from '../features/counter/counterSlice';
import useReducer from '../slices/userSlice';

export const store = configureStore({
  reducer: {
    // counter: counterReducer,
    user: useReducer
  },
});
