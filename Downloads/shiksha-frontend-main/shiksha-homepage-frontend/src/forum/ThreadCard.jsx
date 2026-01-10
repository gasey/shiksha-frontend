import React from 'react';
import { Link } from 'react-router-dom';

const ThreadCard = ({ thread }) => {
  const created = new Date(thread.created_at).toLocaleString();
  const replies = thread.reply_count ?? 0;

  return (
    <div className="thread-card">
      <h3><Link to={`/forum/${thread.id}`}>{thread.title}</Link></h3>
      <div className="meta">
        <span>By {thread.author_username || 'Unknown'}</span>
        <span style={{marginLeft:8}}>• {created}</span>
        <span style={{marginLeft:8}}>• {replies} replies</span>
      </div>
      <div style={{marginTop:8}}>
        {(thread.tags||[]).map(tag => <span className="tag" key={tag}>{tag}</span>)}
      </div>
    </div>
  );
};

export default ThreadCard;
