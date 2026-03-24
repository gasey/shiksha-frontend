import React, { useState } from 'react';
import { postComment } from '../mock/api/comments';

const CommentComposer = ({ threadId, onPosted }) => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [author, setAuthor] = useState('guest'); // placeholder; replace with auth context later

  const submit = async () => {
    if (!content.trim()) return;
    setLoading(true);
    try {
      await postComment(threadId, { content, author_username: author });
      setContent('');
      if (onPosted) await onPosted();
    } catch (e) {
      console.error(e);
      alert('Failed to post comment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="td-composer-row">
      <input
        className="td-composer-input"
        type="text"
        placeholder="Log in to Participate"
        value={content}
        onChange={e => setContent(e.target.value)}
        onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submit(); } }}
        disabled={loading}
      />
      {content.trim() && (
        <button className="td-composer-send" onClick={submit} disabled={loading}>
          {loading ? '…' : '↑'}
        </button>
      )}
    </div>
  );
};

export default CommentComposer;
