import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ThreadCard = ({ thread }) => {
  const d = new Date(thread.created_at);
  const date = d.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' });
  const time = d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }).toLowerCase();
  const replies = thread.reply_count ?? 0;

  const [upvoted, setUpvoted] = useState(false);
  const [upvotes, setUpvotes] = useState(thread.upvote_count ?? 0);

  const toggleUpvote = (e) => {
    e.preventDefault();
    setUpvotes(u => upvoted ? u - 1 : u + 1);
    setUpvoted(prev => !prev);
  };

  return (
    <div className="tl-card">
      <h3 className="tl-card-title">
        <Link to={`/forum/${thread.id}`}>{thread.title}</Link>
      </h3>
      <div className="tl-card-meta">
        {thread.author_username || 'Unknown'} &ndash; {date} &ndash; {time}
      </div>
      <div className="tl-card-stats">
        <span>{replies} Replies</span>
        <span className="tl-stats-sep">–</span>
        <button className={`tl-upvote-btn${upvoted ? ' tl-upvoted' : ''}`} onClick={toggleUpvote}>
          {upvotes} Upvotes
        </button>
      </div>
    </div>
  );
};

export default ThreadCard;
