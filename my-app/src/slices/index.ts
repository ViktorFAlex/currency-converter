import { configureStore } from '@reduxjs/toolkit';
import currenciesReducer from './currenciesSlice';
import converterReducer from './converterSlice';

const store = configureStore({
  reducer: {
    currencies: currenciesReducer,
    converter: converterReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export default store;
