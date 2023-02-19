import axios from 'axios';
import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import routes from '../routes/index';
import { ConvertState, GlobalState } from '../types/interfaces';

export const fetchConvert = createAsyncThunk(
  'convert/fetchConvert',
  async ({ from, to, amount = '1' }: { from: string; to: string; amount: string }) => {
    try {
      const url = routes.convert(from, to, amount);
      const response = await axios.get(url.href);
      console.log('resp', response);
      return response.data;
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message);
      }
      throw e;
    }
  },
);

const initialState: ConvertState = {
  from: '',
  to: '',
  amount: 0,
  rate: 0,
  result: 0,
};

const convertSlice = createSlice({
  name: 'convert',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchConvert.fulfilled, (state, { payload }) => {
      const { from, to, amount } = payload.query;
      const { rate } = payload.info;
      const { result } = payload;
      return { ...state, from, to, amount, rate, result };
    });
  },
});

export const selectConvertState = (state: GlobalState) => state.convert;

export const { actions } = convertSlice;
export default convertSlice.reducer;
