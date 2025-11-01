import axios from 'axios';
const BASE = process.env.REACT_APP_OWM_BASE || 'https://api.openweathermap.org';
const KEY = process.env.REACT_APP_OWM_API_KEY;
const POLL_TTL_MS = parseInt(process.env.REACT_APP_POLL_INTERVAL_MS || '60000', 10);
const CACHE_TTL = POLL_TTL_MS;
const cache = new Map();
let lastCallTs = 0;
const MIN_INTERVAL_MS = 200;

async function guardedGet(url, params = {}) {
  const now = Date.now();
  if (now - lastCallTs < MIN_INTERVAL_MS) {
    await new Promise(r => setTimeout(r, MIN_INTERVAL_MS - (now - lastCallTs)));
  }
  lastCallTs = Date.now();
  const resp = await axios.get(url, { params });
  return resp.data;
}

function cacheKeyOneCall(lat, lon, units) {
  return `onecall:${lat}:${lon}:${units}`;
}

const weatherApi = {
  async getOneCall({ lat, lon, units = 'metric', exclude = '' }) {
    if (!KEY) throw new Error('Missing REACT_APP_OWM_API_KEY in .env.local');
    const key = cacheKeyOneCall(lat, lon, units);
    const entry = cache.get(key);
    if (entry && (Date.now() - entry.ts) < CACHE_TTL) return entry.data;
    const url = `${BASE}/data/3.0/onecall`;
    const params = { lat, lon, units, exclude, appid: KEY };
    const data = await guardedGet(url, params);
    cache.set(key, { data, ts: Date.now() });
    return data;
  },
  async geocodeCity(q, limit = 5) {
    if (!KEY) throw new Error('Missing REACT_APP_OWM_API_KEY in .env.local');
    const key = `geocode:${q}:${limit}`;
    const entry = cache.get(key);
    if (entry && (Date.now() - entry.ts) < 300000) return entry.data;
    const url = `${BASE}/geo/1.0/direct`;
    const params = { q, limit, appid: KEY };
    const data = await guardedGet(url, params);
    cache.set(key, { data, ts: Date.now() });
    return data;
  }
};
export default weatherApi;
