import React, { useEffect, useState } from 'react';
import { getThreads } from '../mock/api/threads';
import ThreadCard from './ThreadCard';
import SearchBar from './SearchBar';
import SortSelector from './SortSelector';
import DateFilter from './DateFilter';
import TagFilter from './TagFilter';
import '../css/forum.css';

const ThreadListPage = () => {
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({ search: '', tag: '', date_from: '', date_to: '', sort: 'newest', page: 1 });

  useEffect(() => {
    let mounted = true;
    const fetch = async () => {
      setLoading(true);
      try {
        const data = await getThreads(filters);
        if (!mounted) return;
        setThreads(data.results || []);
      } catch (e) {
        console.error(e);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetch();
    return () => { mounted = false; };
  }, [filters.search, filters.tag, filters.date_from, filters.date_to, filters.sort, filters.page]);

  return (
    <div className="forum-container">
      <div className="controls">
        <SearchBar value={filters.search} onChange={val => setFilters({...filters, search: val, page:1})} />
        <TagFilter value={filters.tag} onChange={val => setFilters({...filters, tag: val, page:1})} />
        <DateFilter onChange={(from,to) => setFilters({...filters, date_from: from, date_to: to, page:1})} />
        <SortSelector value={filters.sort} onChange={val => setFilters({...filters, sort: val})} />
      </div>

      {loading ? <div>Loading threads...</div> : (
        <div className="thread-list">
          {threads.length === 0 ? <div>No threads yet.</div> : threads.map(t => <ThreadCard key={t.id} thread={t} />)}
        </div>
      )}
    </div>
  );
};

export default ThreadListPage;
