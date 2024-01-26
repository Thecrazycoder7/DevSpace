import { Container } from '@mui/material'
import React from 'react'

export const UserDetails = ({usersProfile}) => {
    const containerStyle = {
        margin: '10px 20px',
        color: '#c393f0',
        fontSize: '20px',
        borderBottom: '2px solid #414141',
    }
  return (
    <>
        <Container>
          <div className='userprofile-body' key={usersProfile.id} style={containerStyle}>
          <span><b>Name:</b> {usersProfile.name}</span><br/>
          <span><b>Company Name:</b> {usersProfile.company.name}</span><br/>
          <span><b>City:</b> {usersProfile.address.city} </span><br/><br/>
          </div> 
        </Container>

    </>
  )
}
