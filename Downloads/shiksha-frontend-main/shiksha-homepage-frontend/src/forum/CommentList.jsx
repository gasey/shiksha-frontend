import React from 'react';
import CommentItem from './CommentItem';

const CommentList = ({ comments = [] }) => {
  return (
    <div className="comment-list">
      {comments.length === 0 ? <div>No comments yet — be first!</div> :
        comments.map(c => <CommentItem key={c.id} comment={c} />)
      }
    </div>
  );
};

export default CommentList;
