import React, { useState } from 'react';

const DateFilter = ({ onChange }) => {
  const [date, setDate] = useState('');

  const handleChange = (e) => {
    const val = e.target.value;
    setDate(val);
    onChange(val || '', val || '');
  };

  return (
    <input className="search-input tl-date-input" type="date" value={date} onChange={handleChange} />
  );
};

export default DateFilter;
