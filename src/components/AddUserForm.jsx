import React, { useEffect, useState } from 'react';
import { Modal, TextField, Box, Typography } from '@mui/material';
import Button from './Button';

const AddUserForm = ({ 
  users, 
  setUsers, 
  selectedUser,
  setSelectedUser,
  modalTitle,
  saveButtonLabel,
  isOpen,
  setIsOpen,
}) => {
  
  const [formData, setFormData] = useState({
      name: '',
      userName: '',
      email: '',
      city: '',
      website: '',
      company: '',
    });
  const handleOpenModal = () => {
    setFormData({
      name: selectedUser?.name || '',
      userName: selectedUser?.userName || '',
      email: selectedUser?.email || '',
      city: selectedUser?.address?.city || '',
      website: selectedUser?.website || '',
      company: selectedUser?.company?.name || '',
    });
  };

  useEffect(() => {
    handleOpenModal();
  }, [selectedUser]);

  const handleSaveClick = () => {
  if (selectedUser && selectedUser.id) {
    fetch(`https://jsonplaceholder.typicode.com/users/${selectedUser.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        ...formData,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((res) => res.json())
      .then((updatedUser) => {
        const updatedUsers = users.map((user) =>
          user.id === updatedUser.id ? updatedUser : user
        );
        setUsers(updatedUsers);
        handleClose();
      })
      .catch((error) => {
        console.error('Error updating user:', error);
      });
  } else {

    fetch(`https://jsonplaceholder.typicode.com/users`, {
      method: 'POST',
      body: JSON.stringify({
        ...formData,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((newUser) => {
        // Fix city data access
        const city = newUser.address?.city || '';
        const companyName = newUser.company?.name || '';

        const updatedNewUser = {
          ...newUser,
          // id: generateUniqueId(),
          address: {
            city,
          },
          company: {
            name: companyName,
          },
        };
        setUsers((prevUsers) => [updatedNewUser, ...prevUsers]);
        handleClose();
      })
      .catch((error) => {
        console.error('Error adding new user:', error);
      });
  }
};

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleClose = () => {
     if (setIsOpen) {
    setIsOpen(false);
  }

  if (setSelectedUser) {
    setSelectedUser(null);
  }
  };


  

  return (
    <Modal  open={isOpen} onClose={handleClose}>
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
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" gutterBottom>
          {modalTitle}
        </Typography>
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          sx={{ width: '45%', m: 1 }}
        />
        <TextField
          label="User Name"
          name="userName"
          value={formData.userName}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          sx={{ width: '45%', m: 1 }}
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          sx={{ width: '45%', m: 1 }}
        />
        <TextField
          label="Website"
          name="website"
          type="website"
          value={formData.website}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          sx={{ width: '45%', m: 1 }}
        />
        <TextField
          label="City"
          name="city"
          type="city"
          value={formData.city}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          sx={{ width: '45%', m: 1 }}
        />
        <TextField
          label="Company"
          name="company"
          type="company"
          value={formData.company}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          sx={{ width: '45%', m: 1 }}
        />
        <Button onClick={handleSaveClick}>
          {saveButtonLabel}
        </Button>
        <Button onClose={handleClose} variant='outlined'>
          Cancel
        </Button>
      </Box>
    </Modal>
  );
};

export default AddUserForm;
