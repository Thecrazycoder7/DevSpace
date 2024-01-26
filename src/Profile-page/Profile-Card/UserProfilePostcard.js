import React, {useState} from 'react';
import { Container, Button } from '@mui/material';
import '../Profile-Card/Profile-card-Style/UserProfilePostCard.css';
import { Link } from 'react-router-dom';

const UserProfilePostcard = ({userPost}) => {
    const userpostStyle = {
        margin: '15px 0px',
        position: 'relative',
        width: '100%',
        height: '150px',
        borderRadius: '10px',
        border: '2px solid #d1f116',
        backdropFilter: 'blur(10px)',
        color: '#d1f116',
    }
  return (
      <>
        <Container >

        {
          userPost.map((post) => (
            <div key={post.id} style={userpostStyle} >
                <div className='post-container'>
                  <span>{post.title}</span>
                  <span>{post.body}</span>
                  <br/>
                  <Link 
                  className='comment-btn'
                  to={`/post/${post.id}`}>view comments</Link>
                </div>
            </div>
          ))
        }
        
      </Container>
      </>
            
  )
}

export default UserProfilePostcard
    
