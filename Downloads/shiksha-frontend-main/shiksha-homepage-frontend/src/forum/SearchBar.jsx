import React from 'react';

const SearchBar = ({ value = '', onChange }) => {
  return (
    <input
      className="search-input"
      type="search"
      placeholder="Search threads..."
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  );
};

export default SearchBar;
