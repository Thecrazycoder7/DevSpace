// PostCard.jsx

import React, { useState } from 'react';
import '../cards/card-css/PostCardStyle.css';
import EditIcon from '@mui/icons-material/Edit';
import RemoveIcon from '@mui/icons-material/Remove';

const PostCard = ({ posts, onEdit, onUpdate, onRemove }) => {
  const [editMode, setEditMode] = useState([]);
  const [editedTitles, setEditedTitles] = useState({});

  const toggleEditMode = (postId) => {
    setEditMode((prevEditMode) =>
      prevEditMode.includes(postId) ? prevEditMode.filter((id) => id !== postId) : [...prevEditMode, postId]
    );
  };

  const handleEditTitleChange = (event, postId) => {
    const updatedTitles = { ...editedTitles, [postId]: event.target.value };
    setEditedTitles(updatedTitles);
  };

  const handleEnterKey = (event, postId) => {
    if (event.key === 'Enter') {
      // Toggle edit mode
      toggleEditMode(postId);

      // Update the post title in the parent component state
      onUpdate(postId, { title: editedTitles[postId] || posts.find((post) => post.id === postId).title });

      // Clear the edited title from local state
      setEditedTitles((prevTitles) => ({ ...prevTitles, [postId]: undefined }));
    }
  };

  return (
    <>
      {posts.map((curElem) => (
        <div className='posts-container' key={curElem.id}>
          <div className='posts-body'>
            <div className='icons-btn'>
              {editMode.includes(curElem.id) ? (
                <input
                  type='text'
                  value={editedTitles[curElem.id] || curElem.title}
                  onChange={(event) => handleEditTitleChange(event, curElem.id)}
                  onKeyDown={(event) => handleEnterKey(event, curElem.id)}
                  placeholder='Edit Title'
                />
              ) : (
                <span>{curElem.title}</span>
              )}
              <div>
                <EditIcon onClick={() => toggleEditMode(curElem.id)} />
                <RemoveIcon onClick={() => onRemove(curElem.id)} />
              </div>
            </div>
            <span>{curElem.body}</span>
            <span>{new Date().toLocaleString()}</span>
          </div>
        </div>
      ))}
    </>
  );
};

export default PostCard;
