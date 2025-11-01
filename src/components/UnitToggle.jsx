import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUnit } from '../features/unit/unitSlice';

export default function UnitToggle(){
  const unit = useSelector(s => s.unit.unit);
  const dispatch = useDispatch();
  return (
    <div className="unit-toggle" style={{marginLeft:12}}>
      <button onClick={()=>dispatch(setUnit('metric'))} className={unit==='metric' ? 'active' : ''}>°C</button>
      <button onClick={()=>dispatch(setUnit('imperial'))} className={unit==='imperial' ? 'active' : ''}>°F</button>
    </div>
  );
}
