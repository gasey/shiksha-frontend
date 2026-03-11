import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/forum.css';

const CreateThreadPage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handlePost = () => {
    if (!title.trim()) return;
    // Navigate back to forum
    navigate('/forum');
  };

  return (
    <div className="ct-page-bg">
      <div className="ct-container">
        <h2 className="ct-heading">Create Threads</h2>

        <input
          className="ct-title-input"
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <textarea
          className="ct-body-input"
          placeholder="Body Text"
          value={body}
          onChange={e => setBody(e.target.value)}
        />

        <div className="ct-footer">
          <button className="ct-post-btn" onClick={handlePost}>
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateThreadPage;
