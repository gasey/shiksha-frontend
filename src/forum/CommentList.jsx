import React from 'react';
import CommentItem from './CommentItem';

const CommentList = ({ comments, isLoggedIn }) => {
  if (!comments || comments.length === 0) {
    return <div className="thread-empty">No replies yet.</div>;
  }

  return (
    <div className="td-comment-list">
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          isLoggedIn={isLoggedIn}
        />
      ))}
    </div>
  );
};

export default CommentList;