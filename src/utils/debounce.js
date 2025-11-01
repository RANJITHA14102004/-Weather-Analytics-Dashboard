export default function debounce(fn, wait=200){
  let t;
  function cancel() { if (t) clearTimeout(t); }
  function debounced(...args){
    cancel();
    return new Promise((resolve)=> {
      t = setTimeout(()=> {
        const r = fn(...args);
        resolve(r);
      }, wait);
    });
  }
  debounced.cancel = cancel;
  return debounced;
}
