import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CityCard from './CityCard';
import { fetchWeatherForCoords } from '../features/weather/weatherSlice';

export default function Dashboard(){
  const favorites = useSelector(s => s.favorites.cities);
  const unit = useSelector(s => s.unit.unit);
  const dispatch = useDispatch();

  useEffect(() => {
    favorites.forEach(c => {
      dispatch(fetchWeatherForCoords({ lat: c.lat, lon: c.lon, units: unit }));
    });
  }, [favorites, unit, dispatch]);

  return (
    <div>
      {favorites.length === 0 ? <div style={{padding:20}}>No favorites yet. Use search to add a city.</div> :
        <div className="card-grid">
          {favorites.map((c, idx)=> <CityCard key={idx} city={c} units={unit} />)}
        </div>
      }
    </div>
  );
}
