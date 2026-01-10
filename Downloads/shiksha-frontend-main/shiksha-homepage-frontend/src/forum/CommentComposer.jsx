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
    <div style={{marginTop:16}}>
      <div className="comment-composer">
        <textarea
          className="comment-input"
          placeholder="Write a reply... (use @username to mention)"
          value={content}
          onChange={e => setContent(e.target.value)}
        />
      </div>
      <div style={{marginTop:8}}>
        <button className="btn" onClick={submit} disabled={loading}>{loading ? 'Posting…' : 'Post Reply'}</button>
      </div>
    </div>
  );
};

export default CommentComposer;
