import React, { useState } from 'react';

const CommentItem = ({ comment }) => {
  const d = new Date(comment.created_at);
  const date = d.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' });
  const time = d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }).toLowerCase();
  const username = comment.author_username || 'User';

  const [upvoted, setUpvoted] = useState(false);
  const [upvotes, setUpvotes] = useState(comment.upvote_count ?? 0);

  const toggleUpvote = () => {
    setUpvotes(u => upvoted ? u - 1 : u + 1);
    setUpvoted(prev => !prev);
  };

  return (
    <div className="td-comment-item">
      <div className="td-comment-header">
        <strong className="td-comment-author">{username}</strong>
        <span className="td-comment-date">{date} - {time}</span>
        {comment.reply_to_comment_id && (
          <span className="td-comment-reply-badge">↩ #{comment.reply_to_comment_id}</span>
        )}
      </div>
      <div className="td-comment-content">{comment.content}</div>
      <button
        className={`td-upvote-btn td-upvote-btn--sm${upvoted ? ' td-upvoted' : ''}`}
        onClick={toggleUpvote}
      >
        {upvotes} Upvotes
      </button>
    </div>
  );
};

export default CommentItem;
