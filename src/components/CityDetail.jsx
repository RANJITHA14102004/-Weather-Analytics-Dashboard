import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeatherForCoords } from '../features/weather/weatherSlice';
import { format } from 'date-fns';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function CityDetail({ city, units='metric', onClose }){
  const dispatch = useDispatch();
  const key = `${city.lat},${city.lon},${units}`;
  const entry = useSelector(s => s.weather.lookup[key]);

  useEffect(()=> {
    dispatch(fetchWeatherForCoords({ lat: city.lat, lon: city.lon, units }));
    const interval = setInterval(()=> {
      dispatch(fetchWeatherForCoords({ lat: city.lat, lon: city.lon, units }));
    }, parseInt(process.env.REACT_APP_POLL_INTERVAL_MS || '60000', 10));
    return ()=> clearInterval(interval);
  }, [city.lat, city.lon, units, dispatch]);

  const hourly = entry?.data?.hourly || [];
  const daily = entry?.data?.daily || [];
  const current = entry?.data?.current;

  const data = hourly.slice(0,24).map(h=>({ time: format(new Date(h.dt*1000),'HH:mm'), temp: h.temp }));
  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close" onClick={onClose}>Close</button>
        <h2>{city.name}</h2>
        {current && <div>Now: {Math.round(current.temp)}°{units==='metric'?'C':'F'} - {current.weather?.[0]?.description}</div>}
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginTop:12}}>
          <div style={{background:'#f8fafc', padding:12, borderRadius:8}}>
            <h4>24-hour temperature</h4>
            <div style={{width:'100%', height:240}}>
              <ResponsiveContainer>
                <LineChart data={data}>
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="temp" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div style={{background:'#f8fafc', padding:12, borderRadius:8}}>
            <h4>7-day summary</h4>
            <ul>
              {daily.map((d,i)=>(
                <li key={i}>{format(new Date(d.dt*1000),'EEE, MMM d')}: {Math.round(d.temp.day)}° - {d.weather?.[0]?.main}</li>
              ))}
            </ul>
          </div>
        </div>
        <div style={{marginTop:12}}>
          <h4>Details</h4>
          {current ? (
            <div style={{display:'flex', gap:12, flexWrap:'wrap'}}>
              <div>Humidity: {current.humidity}%</div>
              <div>Pressure: {current.pressure} hPa</div>
              <div>Dew point: {current.dew_point}°</div>
              <div>Wind speed: {current.wind_speed}</div>
              <div>UV index: {current.uvi}</div>
            </div>
          ) : <div>Loading details...</div>}
        </div>
      </div>
    </div>
  );
}
