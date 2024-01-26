import React, { useState } from 'react';
import { Container } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import RemoveIcon from '@mui/icons-material/Remove';
import './card-css/AlbumCardStyle.css';

const AlbumCard = ({ albums, onRemove, setAlbums }) => {
  const [editMode, setEditMode] = useState([]);

  const toggleEditMode = (albumId) => {
    setEditMode((prevEditMode) =>
      prevEditMode.includes(albumId)
        ? prevEditMode.filter((id) => id !== albumId)
        : [...prevEditMode, albumId]
    );
  };

  const handleEditTitleChange = (event, albumId) => {
    const updatedAlbums = albums.map((album) =>
      album.id === albumId ? { ...album, title: event.target.value } : album
    );
    setAlbums(updatedAlbums);
  };

  const handleEnterKey = (event, albumId) => {
    if (event.key === 'Enter') {
      // Toggle edit mode
      toggleEditMode(albumId);

      // Pass the updated title to the parent component
      handleEdit(albumId);
    }
  };

  const handleEdit = (albumId) => {
    // Find the album based on albumId
    const editedAlbum = albums.find((album) => album.id === albumId);

    // Implement edit functionality here
    console.log(`Editing album with ID ${albumId}`);

    // Update the album in the state
    setAlbums((prevAlbums) =>
      prevAlbums.map((album) => (album.id === albumId ? editedAlbum : album))
    );
  };

  return (
    <Container>
      {albums.map((curElem) => (
        <div key={curElem.id} className='album-container'>
          <div className='album-body'>
            {/* Conditionally render the input field based on editMode */}
            {editMode.includes(curElem.id) ? (
              <input
                type='text'
                value={curElem.title}
                onChange={(event) => handleEditTitleChange(event, curElem.id)}
                onKeyDown={(event) => handleEnterKey(event, curElem.id)}
                placeholder='Edit Title'
              />
            ) : (
              <span>{curElem.title}</span>
            )}
          </div>
          <EditIcon onClick={() => toggleEditMode(curElem.id)} />
          <RemoveIcon onClick={() => onRemove(curElem.id)} />
        </div>
      ))}
    </Container>
  );
};

export default AlbumCard;