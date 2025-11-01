import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import weatherApi from '../../api/weatherApi';

export const fetchWeatherForCoords = createAsyncThunk(
  'weather/fetchByCoords',
  async ({ lat, lon, units }, thunkAPI) => {
    const data = await weatherApi.getOneCall({ lat, lon, units });
    return { lat, lon, units, data };
  }
);

const slice = createSlice({
  name: 'weather',
  initialState: { lookup: {} },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchWeatherForCoords.pending, (state, action) => {
      const { lat, lon, units } = action.meta.arg;
      const key = `${lat},${lon},${units}`;
      state.lookup[key] = state.lookup[key] || {};
      state.lookup[key].status = 'loading';
    });
    builder.addCase(fetchWeatherForCoords.fulfilled, (state, action) => {
      const { lat, lon, units, data } = action.payload;
      const key = `${lat},${lon},${units}`;
      state.lookup[key] = { data, lastFetched: Date.now(), status: 'succeeded' };
    });
    builder.addCase(fetchWeatherForCoords.rejected, (state, action) => {
      const { lat, lon, units } = action.meta.arg;
      const key = `${lat},${lon},${units}`;
      state.lookup[key] = state.lookup[key] || {};
      state.lookup[key].status = 'failed';
      state.lookup[key].error = action.error.message;
    });
  }
});
export default slice.reducer;
