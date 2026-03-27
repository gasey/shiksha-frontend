import React, { useState } from 'react';
import { BiUpArrow, BiSolidUpArrow } from 'react-icons/bi';
import { toggleCommentUpvote } from '../api/forum';

const CommentItem = ({ comment, isLoggedIn }) => {
  const d = new Date(comment.created_at);
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

  const username = comment.author_username || 'User';

  const [upvoted, setUpvoted] = useState(comment.user_has_upvoted ?? false);
  const [upvotes, setUpvotes] = useState(comment.upvote_count ?? 0);

  const toggleUpvote = async () => {
    if (!isLoggedIn) return;

    try {
      const data = await toggleCommentUpvote(comment.id);
      setUpvoted(data.upvoted);
      setUpvotes(data.upvote_count);
    } catch (err) {
      console.error("Failed to toggle comment upvote:", err);
    }
  };

  return (
    <div className="td-comment-item">
      <div className="td-comment-header">
        <strong className="td-comment-author">{username}</strong>
        <span className="td-comment-date">
          {date} - {time}
        </span>

        {comment.reply_to_comment_id && (
          <span className="td-comment-reply-badge">↩ #{comment.reply_to_comment_id}</span>
        )}
      </div>

      <div className="td-comment-content">{comment.content}</div>

      <button
        className={`td-upvote-btn td-upvote-btn--sm${upvoted ? ' td-upvoted' : ''}${!isLoggedIn ? ' td-upvote-guest' : ''}`}
        onClick={toggleUpvote}
        disabled={!isLoggedIn}
        title={!isLoggedIn ? 'Login required to upvote' : 'Upvote comment'}
      >
        {isLoggedIn && (
          <span className="td-upvote-icon">
            {upvoted ? <BiSolidUpArrow /> : <BiUpArrow />}
          </span>
        )}
        <span>{upvotes} Upvotes</span>
      </button>
    </div>
  );
};

export default CommentItem;