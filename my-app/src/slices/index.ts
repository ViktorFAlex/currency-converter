import { configureStore } from '@reduxjs/toolkit';
import currenciesReducer from './currenciesSlice';
const store = configureStore({
  reducer: {
    currencies: currenciesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export default store;
