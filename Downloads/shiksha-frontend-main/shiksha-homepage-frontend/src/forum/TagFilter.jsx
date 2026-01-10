import React, { useEffect, useState } from 'react';
import { getTags } from '../mock/api/tags';

const TagFilter = ({ value = '', onChange }) => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    let mounted = true;
    const fetch = async () => {
      try {
        const res = await getTags();
        if (!mounted) return;
        setTags(res);
      } catch (e) {
        console.error(e);
      }
    };
    fetch();
    return () => { mounted = false; };
  }, []);

  return (
    <select value={value} onChange={e => onChange(e.target.value)}>
      <option value="">All tags</option>
      {tags.map(tag => <option key={tag.id} value={tag.name}>{tag.name}</option>)}
    </select>
  );
};

export default TagFilter;
