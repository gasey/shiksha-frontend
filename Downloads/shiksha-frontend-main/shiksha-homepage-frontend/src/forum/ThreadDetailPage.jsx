import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getThread } from '../mock/api/threads';
import { getComments } from '../mock/api/comments';
import CommentList from './CommentList';
import CommentComposer from './CommentComposer';
import SortSelector from './SortSelector';
import '../css/forum.css';

const ThreadDetailPage = () => {
  const { threadId } = useParams();
  const [thread, setThread] = useState(null);
  const [comments, setComments] = useState([]);
  const [sort, setSort] = useState('oldest');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    const fetch = async () => {
      setLoading(true);
      try {
        const t = await getThread(threadId);
        if (!mounted) return;
        setThread(t);
        const c = await getComments(threadId, { sort });
        if (!mounted) return;
        setComments(c.results || []);
      } catch (e) {
        console.error(e);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetch();
    return () => { mounted = false; };
  }, [threadId, sort]);

  const onPosted = async () => {
    const c = await getComments(threadId, { sort });
    setComments(c.results || []);
  };

  if (loading && !thread) return <div>Loading...</div>;
  if (!thread) return <div>Thread not found.</div>;

  return (
    <div className="forum-container">
      <div className="thread-detail">
        <h2>{thread.title}</h2>
        <div className="meta">By {thread.author_username || 'Unknown'} • {new Date(thread.created_at).toLocaleString()}</div>
        <div style={{marginTop:12, whiteSpace: 'pre-wrap'}}>{thread.body}</div>
      </div>

      <div style={{marginTop:16}} className="controls">
        <SortSelector value={sort} onChange={setSort} />
      </div>

      <CommentList comments={comments} />

      <CommentComposer threadId={threadId} onPosted={onPosted} />
    </div>
  );
};

export default ThreadDetailPage;
