import React, { useState } from 'react';
import { Container } from '@mui/material';
import { Link } from 'react-router-dom';
import '../Profile-Card/Profile-card-Style/USerProfileAlbumCard.css';
import EditIcon from '@mui/icons-material/Edit';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

const UserProfileAlbumCard = ({ userAlbum, setUserAlbum, onRemove }) => {
  const [editMode, setEditMode] = useState([]);

  const toggleEditMode = (userAlbumId) => {
    setEditMode((prevEditMode) =>
      prevEditMode.includes(userAlbumId)
        ? prevEditMode.filter((id) => id !== userAlbumId)
        : [...prevEditMode, userAlbumId]
    );
  };

  const handleEditTitleChange = (event, userAlbumId) => {
    const updatedAlbums = userAlbum.map((userAlbum) =>
      userAlbum.id === userAlbumId ? { ...userAlbum, title: event.target.value } : userAlbum
    );
    setUserAlbum(updatedAlbums);
  };

  const handleEnterKey = (event, userAlbumId) => {
    if (event.key === 'Enter') {
      // Toggle edit mode
      toggleEditMode(userAlbumId);

      // Pass the updated title to the parent component
      handleEdit(userAlbumId);
    }
  };

  const handleEdit = (userAlbumId) => {
    // Find the album based on albumId
    const editedAlbum = userAlbum.find((userAlbum) => userAlbum.id === userAlbumId);

    // Implement edit functionality here
    console.log(`Editing album with ID ${userAlbumId}`);

    // Update the album in the state
    setUserAlbum((prevAlbums) =>
      prevAlbums.map((userAlbum) => (userAlbum.id === userAlbumId ? editedAlbum : userAlbum))
    );
  };

  return (
    <Container>
      {userAlbum.map((album) => (
        <div key={album.id} className='album-profile'>
          <Link to={`/album/${album.id}`} className='albumbody'>
            {editMode.includes(album.id) ? (
              <input
                type='text'
                value={album.title}
                onChange={(event) => handleEditTitleChange(event, album.id)}
                onClick={(event) => handleEnterKey(event, album.id)}
                placeholder='Edit Title'
              />
            ) : (
              album.title
            )}
          </Link>
          <div className='btngroup'>
            <button
              className='albumbody'
              onClick={() => toggleEditMode(album.id)}
            >
              <EditIcon />
            </button>
            <button className='albumbody' onClick={() => onRemove(album.id)}>
              <RemoveCircleOutlineIcon />
            </button>
          </div>
        </div>
      ))}
    </Container>
  );
};

export default UserProfileAlbumCard;
