import React, { useState } from 'react';
import './card-css/UserCardStyle.css';
import { NavLink} from 'react-router-dom';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Button from '../components/Button';
import AddUserForm from '../components/AddUserForm';

const UserCard = ({users, onRemoveUser, setUsers, onUpdateUsers}) => {
  
  // Update form 
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleOpenModal = (user) => {
    setSelectedUser(user);
    setIsOpen(true);
  };

  const handleRemoveUser = (userId) => {
    // Add logic to handle user removal
   onRemoveUser(userId);
  };

  

  return (
    <>
      <section>
        {
        users?.map((curElem) => {
          return(
            <React.Fragment key={curElem.id}>
              <div className='card-container'>
              <div className='card-body'>

            <div>
              <Button onClick={() => handleOpenModal(curElem)}>Edit</Button>
              <Button onClick={() => handleRemoveUser(curElem.id)}>Remove</Button>
            </div>

            <div className='input-css'>
              <span><b>Name:</b> {curElem.name}</span>
              <span><b>User Name:</b> {curElem.username}</span>
              <span><b>Email:</b> {curElem.email}</span>
              <span><b>Website:</b> {curElem.website}</span>
              {/* <span><b>Company Name:</b> {curElem.company.name}</span>
              <span><b>City:</b> {curElem.address.city} </span> */}

               {/* Check if 'address' is defined before accessing 'city' */}
                  {curElem.address && (
                    <span><b>City:</b> {curElem.address.city}</span>
                  )}

                  {/* Check if 'company' is defined before accessing 'name' */}
                  {curElem.company && (
                    <span><b>Company Name:</b> {curElem.company.name}</span>
                  )}
            </div>

              <NavLink className='card-btn' to={`/user/${curElem.id}`}>Visit Profile <KeyboardArrowRightIcon/></NavLink>
            </div>

          </div>
          <AddUserForm
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            modalTitle='Edit User'
            saveButtonLabel='Update'
            users={users}
            setUsers={setUsers}
          />

        </React.Fragment>
          )
        })
      }

      </section>
    </>
  )
}

export default UserCard