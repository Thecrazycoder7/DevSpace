import React, { useState, useEffect } from 'react';
import { Container, Card, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

const PostComment = () => {
  const [comments, setComments] = useState([]);

  const { postId } = useParams();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [postId]);

  const CommentCard = () => {
    return (
        
      <Container>
        
        {comments.map((comment) => (
          <Card
            key={comment.id}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              width: 'full',
              height: '100px',
              padding: 5,
              margin: 5,
              border: '2px solid rgb(208 240 22)',
              borderRadius: '10px',
              background: 'none',
              color: '#c393f0',
            }}
          >
            <Typography><b>By:</b> {comment.name}</Typography>
            <Typography><b>Message:</b> {comment.body}</Typography>
          </Card>
        ))}
      </Container>
    );
  };

  return <CommentCard />;
};

export default PostComment;
