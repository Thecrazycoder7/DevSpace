import React, { useEffect, useState } from 'react';
import { Box, Container, Modal, Typography, CircularProgress } from '@mui/material';
import UserCard from '../cards/UserCard';
import '../pages/page-css/UserPageStyle.css'
import AddUserForm from '../components/AddUserForm';
import Button from '../components/Button'

const UserPage = ({setIsOpen}) => {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const getUsers = async () => {

        try {
            const res = await fetch('https://jsonplaceholder.typicode.com/users')
            
            setUsers(await res.json());
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        try {
          getUsers();
        } finally {
          setLoading(false);
        }
    },[]);


    const [isPopupOpen, setIsPopupOpen] = useState(false);

  const isOpen = () => {
    setIsPopupOpen((prev) => !prev);
  };

  const handleUpdateUser = (updatedUserData) => {
  // Update user in API

    // Update the state to trigger a re-render with the updated user
    setUsers((prevUsers) => prevUsers.map((users) => (users.id === updatedUserData.id ? updatedUserData : users)));
    };


  const handleRemoveUser = (userId) => {
  // Remove user from API

  // Update the state to trigger a re-render without the removed user
  setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
};

  if (loading) {
    return (
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 3,
          transform: 'translate(-50%, -50%)',
          color: '#c7ef13',
          p: 5,
        }}
      >
        <Typography variant='h2'>Loading...</Typography>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
        <Container className='containerbody'>
                
            <Button onClick={isOpen}>Add New User</Button>
            <Modal open={isPopupOpen} onClose={isOpen}>
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 400,
                  bgcolor: 'background.paper',
                  boxShadow: 24,
                  p: 4,
                }}
              >
                <AddUserForm isOpen={isPopupOpen} handleClose={isOpen} />
                <AddUserForm
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                  modalTitle='Add New User'
                  saveButtonLabel='Save'
                  users={users}
                  setUsers={setUsers}
                />
              </Box>
            </Modal>
            <Box 
                component={'div'} 
                sx={{display:'flex',
                justifyContent:'end', 
                alignItems: 'center'}}>
                
                <div>
                    <UserCard users={users} setUsers={setUsers} onUpdateUser={handleUpdateUser} onRemoveUser={handleRemoveUser}/>
                </div>
            </Box>
   
        </Container>
    </>
  )
};

export default UserPage