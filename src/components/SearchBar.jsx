import React, { useState, useEffect } from 'react';
import weatherApi from '../api/weatherApi';
import { useDispatch } from 'react-redux';
import { fetchWeatherForCoords } from '../features/weather/weatherSlice';
import { addFavorite } from '../features/favorites/favoritesSlice';
import debounce from '../utils/debounce';

export default function SearchBar(){
  const [q, setQ] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const dispatch = useDispatch();

  const fetchSuggestions = debounce(async (val) => {
    if (!val || val.length < 2) { setSuggestions([]); return; }
    try {
      const res = await weatherApi.geocodeCity(val, 6);
      setSuggestions(res || []);
    } catch (e) {
      console.error(e);
    }
  }, 300);

  useEffect(() => {
    fetchSuggestions(q);
    return ()=> fetchSuggestions.cancel();
  }, [q]);

  const onSelect = (place) => {
    setQ('');
    setSuggestions([]);
    dispatch(fetchWeatherForCoords({ lat: place.lat, lon: place.lon, units: 'metric' }));
    dispatch(addFavorite({ name: `${place.name}${place.state ? ', ' + place.state : ''}, ${place.country}`, lat: place.lat, lon: place.lon }));
  };

  return (
    <div className="search-bar">
      <input placeholder="Search city..." value={q} onChange={e=>setQ(e.target.value)} />
      {suggestions.length>0 && (
        <ul className="suggestions">
          {suggestions.map((s,i)=>(
            <li key={i} onClick={()=>onSelect(s)}>{s.name}{s.state?`, ${s.state}`:''}, {s.country}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
