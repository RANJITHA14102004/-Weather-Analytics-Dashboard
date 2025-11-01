import { createSlice } from '@reduxjs/toolkit';
const saved = JSON.parse(localStorage.getItem('favorites') || '[]');
const slice = createSlice({
  name: 'favorites',
  initialState: { cities: saved },
  reducers: {
    addFavorite: (state, action) => {
      const exists = state.cities.find(c => c.lat === action.payload.lat && c.lon === action.payload.lon);
      if (!exists) state.cities.push(action.payload);
      localStorage.setItem('favorites', JSON.stringify(state.cities));
    },
    removeFavorite: (state, action) => {
      state.cities = state.cities.filter(c => !(c.lat === action.payload.lat && c.lon === action.payload.lon));
      localStorage.setItem('favorites', JSON.stringify(state.cities));
    }
  }
});
export const { addFavorite, removeFavorite } = slice.actions;
export default slice.reducer;
