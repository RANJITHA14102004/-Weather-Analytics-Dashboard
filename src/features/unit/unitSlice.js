import { createSlice } from '@reduxjs/toolkit';
const saved = localStorage.getItem('unit') || 'metric';
const slice = createSlice({
  name: 'unit',
  initialState: { unit: saved },
  reducers: {
    setUnit: (state, action) => {
      state.unit = action.payload;
      localStorage.setItem('unit', action.payload);
    }
  }
});
export const { setUnit } = slice.actions;
export default slice.reducer;
