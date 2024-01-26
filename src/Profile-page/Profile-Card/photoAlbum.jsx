import { Container } from '@mui/material'
import React, {useState , useEffect} from 'react'
import { useParams } from 'react-router-dom';
import './Profile-card-Style/photoAlbum.css'

const PhotoAlbum = () => {
  const [albumPhotos, setAlbumPhotos] = useState([]);
  const { albumId } = useParams();

  useEffect(() => {
    const fetchAlbumPhotos = async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/album/${albumId}/photos`);
        const data = await response.json();
        setAlbumPhotos(data);
      } catch (error) {
        console.error('Error fetching album photos:', error);
      }
    };

    fetchAlbumPhotos();
  }, [albumPhotos]);
  return (
    <>
      <Container>
         <div className='photos'>
            {albumPhotos.map((curElem) => (
                <div className='photo-container' key={curElem.id}>
                  <div key={curElem.id} className='photo-body'>
                    {/* <span>{curElem.title}</span> */}
                    <img  className='img' src={curElem.url} alt={`Album-${curElem.id}`} />
                </div>
                </div>
        ))}
        </div>
      </Container>
    </>
  )
}

export default PhotoAlbum