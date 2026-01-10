import React from 'react';

const CommentItem = ({ comment }) => {
  const created = new Date(comment.created_at).toLocaleString();
  const replyTo = comment.reply_to_comment_id ? `Replying to #${comment.reply_to_comment_id}` : null;

  return (
    <div className="comment-item">
      <div className="comment-meta">
        <strong>{comment.author_username || 'User'}</strong>
        <span style={{marginLeft:8}}>{created}</span>
        {replyTo && <span style={{marginLeft:8, color:'#333'}}>• {replyTo}</span>}
      </div>
      <div className="comment-content">{comment.content}</div>
    </div>
  );
};

export default CommentItem;
