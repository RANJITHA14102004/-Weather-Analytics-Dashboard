import React from 'react';
import { useSelector } from 'react-redux';
import CityDetail from './CityDetail';

export default function CityCard({ city, units }){
  const key = `${city.lat},${city.lon},${units}`;
  const entry = useSelector(s => s.weather.lookup[key]);
  const [open, setOpen] = React.useState(false);
  const current = entry?.data?.current;
  const weather = current?.weather?.[0];
  const temp = current?.temp;

  return (
    <div className="city-card" onClick={()=>setOpen(true)}>
      <h3>{city.name}</h3>
      {current ? (
        <>
          <div className="temp">{Math.round(temp)}°{units==='metric'?'C':'F'}</div>
          <div style={{display:'flex',alignItems:'center',gap:8}}>
            {weather && <img alt={weather.description} src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} style={{width:48,height:48}} />}
            <div>{weather?.main}</div>
          </div>
          <div style={{marginTop:8}}>Humidity: {current.humidity}% | Wind: {current.wind_speed}{units==='metric'?' m/s':' mph'}</div>
        </>
      ) : <div>Loading...</div>}
      {open && <CityDetail city={city} units={units} onClose={()=>setOpen(false)} />}
    </div>
  );
}
