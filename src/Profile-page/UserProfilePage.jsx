import React , {useState,useEffect} from 'react'
import { UserDetails } from './UserDetails';
import UserProfileAlbumCard from './Profile-Card/UserProfileAlbumCard';
import UserProfilePostcard from './Profile-Card/UserProfilePostcard';
import { useParams } from 'react-router-dom';
import './ProfilePageCss/UserProfilePage.css'
import { Container} from '@mui/material';
import Button from '../components/Button';

const UserProfile = () => {

  let {id}= useParams();
    const [usersProfile, setUsersProfile] = useState();
    const [userPost, setUserPost] = useState();
    const [userAlbum, setUserAlbum] = useState();
    
    const getUsersProfile = async () => {
        try {
            const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
            console.log(res);
            setUsersProfile(await res.json());
        } catch (error) {
            console.error(error);
        }
    };

    const getUsersPost = async () => {

    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`);
      setUserPost(await res.json());
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

    const getUsersAlbum = async () => {

    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/albums?userId=${id}`)
      const albumData = await res.json();
      setUserAlbum(albumData);
      console.log(albumData);
    } catch (error) {
      console.log(error);
    }
  };

    useEffect(() => {
        getUsersProfile();
        getUsersPost();
        getUsersAlbum();
    },[id]);
    
    //Button properties

  const [showButton1, setShowButton1] = useState(true);
  const [showButton2, setShowButton2] = useState(false);
  const [clickedButton, setClickedButton] = useState(null);

  const handleButtonClick = (buttonName) => {
    // Update the clickedButton state to track which button is clicked
    setClickedButton(buttonName);

    // Perform some condition based on the clicked button
    if (buttonName === 'post') {
      setShowButton1(true);
      setShowButton2(false);
      // Perform additional logic or fetch data for button 1
    } else if (buttonName === 'album') {
      setShowButton1(false);
      setShowButton2(true);
      // Perform additional logic or fetch data for button 2
    }
  };

  const handleRemove = (userAlbumId) => {
    // Implement remove functionality here
    console.log(`Removing album with ID ${userAlbumId}`);
    setUserAlbum((prevAlbums) => prevAlbums.filter((userAlbum) => userAlbum.id !== userAlbumId));
  };

  return (
    <>
      {usersProfile && <UserDetails usersProfile={usersProfile} />}
      <Container>
      <button className='link-style' onClick={() => handleButtonClick('post')}>Post</button>
      <button className='link-style' onClick={() => handleButtonClick('album')}>Album</button>
      </Container>

      {clickedButton === 'post' && showButton1 && <UserProfilePostcard userPost={userPost}/>}
      {clickedButton === 'album' && showButton2 && <UserProfileAlbumCard userAlbum={userAlbum} setUserAlbum={setUserAlbum} onRemove={handleRemove} />}

    </>
  )
}

export default UserProfile