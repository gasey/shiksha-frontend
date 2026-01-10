import React, { useState } from 'react';

const DateFilter = ({ onChange }) => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const apply = () => onChange(from || '', to || '');

  return (
    <div style={{display:'flex', gap:8, alignItems:'center'}}>
      <input className="search-input" type="date" value={from} onChange={e => setFrom(e.target.value)} />
      <input className="search-input" type="date" value={to} onChange={e => setTo(e.target.value)} />
      <button className="btn" onClick={apply}>Apply</button>
    </div>
  );
};

export default DateFilter;
