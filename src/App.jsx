import React from 'react';
import Dashboard from './components/Dashboard';
import SearchBar from './components/SearchBar';
import UnitToggle from './components/UnitToggle';

export default function App(){
  return (
    <div>
      <header className="app-header">
        <div style={{display:'flex', alignItems:'center'}}>
          <h1 style={{margin:0}}>Weather Dashboard</h1>
          <div style={{marginLeft:12, color:'#9ca3af'}}>Analytics</div>
        </div>
        <div style={{display:'flex', alignItems:'center'}}>
          <SearchBar />
          <UnitToggle />
        </div>
      </header>
      <main className="container">
        <Dashboard />
      </main>
    </div>
  );
}
