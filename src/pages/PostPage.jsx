import React,{useEffect, useState} from 'react'
import { Container } from '@mui/material';
import PostCard from '../cards/PostCard';

export const PostPage = () => {
  
  const [posts, setPosts] = useState([]);

    const getPosts = async () => {
        try {
            const res = await fetch('https://jsonplaceholder.typicode.com/posts')
            
            setPosts(await res.json());
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getPosts();
    },[]);

    const handleEdit = (postId) => {
    // Toggle edit mode in the PostCard component
    // You can also implement more specific edit logic if needed
  };

  const handleUpdate = (postId, updateData) => {
    // Implement update functionality here
    console.log(`Updating post with ID ${postId}`);
    setPosts((prevPosts) =>
      prevPosts.map((post) => (post.id === postId ? { ...post, ...updateData } : post))
    );
  };

  const handleRemove = (postId) => {
    // Implement remove functionality here
    console.log(`Removing post with ID ${postId}`);
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  };

  return (
    <>
        <Container className='containerbody'>
            <PostCard posts={posts} onEdit={handleEdit} onUpdate={handleUpdate} onRemove={handleRemove} />
        </Container>
    </>
  )
}
