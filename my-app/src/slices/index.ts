import { configureStore } from '@reduxjs/toolkit';
import currenciesReducer from './currenciesSlice';
import convertReducer from './convertSlice';
const store = configureStore({
  reducer: {
    currencies: currenciesReducer,
    convert: convertReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export default store;
