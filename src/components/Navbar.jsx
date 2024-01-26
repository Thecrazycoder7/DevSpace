import { AppBar, Box, Toolbar, Typography } from '@mui/material'
import React from 'react'
import FitbitIcon from '@mui/icons-material/Fitbit';
import { NavLink } from 'react-router-dom';
import '../components/NavPageStyle.css'

const Navbar = () => {
  return (
    <>
        <AppBar className='nav-bar' sx={{background: 'transparent'}}>
            <Toolbar sx={{justifyContent:'space-between'}} >
                  <Typography variant='h6' component="div" sx={{display:'flex', alignItems:'center', justifyContent:'center',color:' #d1f116'}}><FitbitIcon className='rotate-icon'/> DevSpace</Typography>
                

                <Box component='div' className='btn-group'>
                    <NavLink className='btn' color='inherit' to="/">User</NavLink>
                    <NavLink className='btn' to="/postpage" color='inherit'>Post</NavLink>
                    <NavLink className='btn' to="/albumpage" color='inherit'>Album</NavLink>
                </Box>
            </Toolbar>
        </AppBar>
    </>
  )
}

export default Navbar