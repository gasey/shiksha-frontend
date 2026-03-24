import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
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
  const [upvoted, setUpvoted] = useState(false);
  const [upvotes, setUpvotes] = useState(0);

  useEffect(() => {
    let mounted = true;
    const fetch = async () => {
      setLoading(true);
      try {
        const t = await getThread(threadId);
        if (!mounted) return;
        setThread(t);
        setUpvotes(t.upvote_count ?? 0);
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

  const toggleUpvote = () => {
    setUpvotes(u => upvoted ? u - 1 : u + 1);
    setUpvoted(prev => !prev);
  };

  const formatDateTime = (iso) => {
    const d = new Date(iso);
    const date = d.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' });
    const time = d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }).toLowerCase();
    return `${date} - ${time}`;
  };

  if (loading && !thread) return (
    <div className="forum-container">
      <div className="forum-loading"><div className="forum-spinner" /> Loading thread…</div>
    </div>
  );
  if (!thread) return (
    <div className="forum-container">
      <div className="thread-empty">Thread not found.</div>
    </div>
  );

  return (
    <div className="forum-container td-page">
      {/* <div className="td-back-row">
        <Link to="/forum" className="td-back-link">← Back to Forum</Link>
      </div> */}

      {/* Thread post card */}
      <div className="td-post-card">
        <h2 className="td-post-title">{thread.title}</h2>
        {thread.body ? <p className="td-post-body">{thread.body}</p> : null}
        <div className="td-post-meta">{thread.author_username || 'Unknown'} – {formatDateTime(thread.created_at)}</div>
        <button
          className={`td-upvote-btn${upvoted ? ' td-upvoted' : ''}`}
          onClick={toggleUpvote}
        >
          {upvotes} Upvotes
        </button>
      </div>

      {/* Replies area */}
      <div className="td-replies-area">
        <div className="td-replies-header">
          <span className="td-replies-count">{comments.length} {comments.length === 1 ? 'Reply' : 'Replies'}</span>
          <div className="td-sort-row">
            <span className="td-sort-label">Sort</span>
            <SortSelector value={sort} onChange={setSort} />
          </div>
        </div>

        <CommentComposer threadId={threadId} onPosted={onPosted} />
        <CommentList comments={comments} />
      </div>
    </div>
  );
};

export default ThreadDetailPage;
