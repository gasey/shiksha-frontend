import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getThread } from '../mock/api/threads';
import { getComments } from '../mock/api/comments';
import CommentList from './CommentList';
import CommentComposer from './CommentComposer';
import SortSelector from './SortSelector';
import { useAuth } from '../contexts/AuthContext';
import { BiUpArrow, BiSolidUpArrow } from 'react-icons/bi';
import '../css/forum.css';

const ThreadDetailPage = () => {
  const { threadId } = useParams();
  const { isAuthenticated } = useAuth();
  const isLoggedIn = isAuthenticated;

  const [thread, setThread] = useState(null);
  const [comments, setComments] = useState([]);
  const [sort, setSort] = useState('oldest');
  const [loading, setLoading] = useState(false);
  const [upvoted, setUpvoted] = useState(false);
  const [upvotes, setUpvotes] = useState(0);

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
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

    fetchData();

    return () => {
      mounted = false;
    };
  }, [threadId, sort]);

  const onPosted = async () => {
    const c = await getComments(threadId, { sort });
    setComments(c.results || []);
  };

  const toggleUpvote = () => {
    if (!isLoggedIn) return;

    setUpvotes((u) => (upvoted ? u - 1 : u + 1));
    setUpvoted((prev) => !prev);
  };

  const formatDateTime = (iso) => {
    const d = new Date(iso);
    const date = d.toLocaleDateString('en-US', {
      month: 'numeric',
      day: 'numeric',
      year: 'numeric',
    });
    const time = d
      .toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      })
      .toLowerCase();

    return `${date} - ${time}`;
  };

  if (loading && !thread) {
    return (
      <div className="forum-container">
        <div className="forum-loading">
          <div className="forum-spinner" /> Loading thread…
        </div>
      </div>
    );
  }

  if (!thread) {
    return (
      <div className="forum-container">
        <div className="thread-empty">Thread not found.</div>
      </div>
    );
  }

  return (
    <div className="forum-container td-page">
      <div className="td-post-card">
        <h2 className="td-post-title">{thread.title}</h2>
        {thread.body ? <p className="td-post-body">{thread.body}</p> : null}

        <div className="td-post-meta">
          {thread.author_username || 'Unknown'} – {formatDateTime(thread.created_at)}
        </div>

        <button
          className={`td-upvote-btn${upvoted ? ' td-upvoted' : ''}${!isLoggedIn ? ' td-upvote-guest' : ''}`}
          onClick={toggleUpvote}
          disabled={!isLoggedIn}
          title={!isLoggedIn ? 'Login required to upvote' : 'Upvote'}
        >
          {isLoggedIn && (
            <span className="td-upvote-icon">
              {upvoted ? <BiSolidUpArrow /> : <BiUpArrow />}
            </span>
          )}
          <span>{upvotes} Upvotes</span>
        </button>

        {!isLoggedIn && (
          <p className="td-login-note">Login required to upvote or reply.</p>
        )}
      </div>

      <div className="td-replies-area">
        <div className="td-replies-header">
          <span className="td-replies-count">
            {comments.length} {comments.length === 1 ? 'Reply' : 'Replies'}
          </span>

          <div className="td-sort-row">
            <span className="td-sort-label">Sort</span>
            <SortSelector value={sort} onChange={setSort} />
          </div>
        </div>

        {isLoggedIn ? (
          <CommentComposer threadId={threadId} onPosted={onPosted} />
        ) : (
          <div className="td-reply-disabled-box">
            Please login to write a reply.
          </div>
        )}

        <CommentList comments={comments} isLoggedIn={isLoggedIn} />
      </div>
    </div>
  );
};

export default ThreadDetailPage;