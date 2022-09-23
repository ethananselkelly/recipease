import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import SignOutButton from "../authentication/SignOutButton";
import { Stack, Divider } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close';

const TopBar = ({ user }) => {
  const [visibility, setVisibility] = useState(false)

  const navToggle = document.querySelector('.mobile-nav-toggle')

  const handleVisibility = () => {
    if (navToggle) {
      setVisibility(!visibility)
    }
  }

  return (
      <Stack className='topbar' direction='row' >
        <div className="stickies">
          <NavLink className="nav-button" activeStyle={{ color: 'white', backgroundColor: '#3190cf' }} exact to='/'>Home</NavLink>
          {user && 
            <>
              <Divider flexItem orientation='vertical' variant='middle' color='white' />
              <li key='username' className="username">
                {user && user.username}
              </li>
            </>
          }
        </div>

        <button className="mobile-nav-toggle" aria-controls="primary-navigation" aria-expanded={visibility} onClick={handleVisibility}>
          {visibility ? 
            <CloseIcon className="menu-icon" />
            :
            <MenuIcon className="menu-icon" />
          }
        </button>

        <ul className="primary-navigation" data-visible={visibility}>
          <NavLink className="nav-button" activeStyle={{ color: 'white', backgroundColor: '#3190cf' }} exact to="/recipes">Recipes</NavLink>
          <NavLink className='nav-button' activeStyle={{ color: 'white', backgroundColor: '#3190cf' }} exact to='/about-me'>About Me</NavLink>
          {user ? 
            <> 
              <li className="nav-button" key="sign-out">
                <SignOutButton />
              </li> 
            </>
            :
            <li key="sign-in" >
              <NavLink className="nav-button" activeStyle={{ color: 'white', backgroundColor: '#3190cf' }} exact to="/user-sessions/new" >Sign In</NavLink>
            </li>
          }
        </ul>     
    </Stack>
  );
};

export default TopBar;
