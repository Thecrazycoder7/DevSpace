import React, { useEffect, useState } from 'react';
import AlbumCard from '../cards/AlbumCard';

export const AlbumPage = () => {
  const [albums, setAlbums] = useState([]);

  const getAlbums = async () => {
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/albums');
      setAlbums(await res.json());
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemove = (albumId) => {
    // Implement remove functionality here
    console.log(`Removing album with ID ${albumId}`);
    setAlbums((prevAlbums) => prevAlbums.filter((album) => album.id !== albumId));
  };

  useEffect(() => {
    getAlbums();
  }, []);

  return (
    <div className='container-body'>
      <AlbumCard albums={albums} onRemove={handleRemove} setAlbums={setAlbums} />
    </div>
  );
};

export default AlbumPage;
