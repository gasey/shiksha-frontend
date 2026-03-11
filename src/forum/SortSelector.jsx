import React from 'react';

const SortSelector = ({ value = 'newest', onChange }) => {
  return (
    <select className="forum-select" value={value} onChange={e => onChange(e.target.value)}>
      <option value="newest">Newest</option>
      <option value="oldest">Oldest</option>
    </select>
  );
};

export default SortSelector;
