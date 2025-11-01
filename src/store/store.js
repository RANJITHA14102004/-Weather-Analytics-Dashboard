import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from '../features/weather/weatherSlice';
import favoritesReducer from '../features/favorites/favoritesSlice';
import unitReducer from '../features/unit/unitSlice';

const store = configureStore({
  reducer: {
    weather: weatherReducer,
    favorites: favoritesReducer,
    unit: unitReducer,
  }
});
export default store;
