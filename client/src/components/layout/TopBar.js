import React from "react";
import { Link, NavLink } from "react-router-dom";
import SignOutButton from "../authentication/SignOutButton";
import { Stack } from '@mui/material'

const TopBar = ({ user }) => {

  return (
      <Stack className='top-bar' direction='row' >
        <ul className="menu">
          <NavLink className="nav button" activeStyle={{ backgroundColor: '#3190cf' }} exact to='/'>Home</NavLink>
          <NavLink className="nav button" activeStyle={{ backgroundColor: '#3190cf' }} exact to="/recipes">Recipes</NavLink>
          <NavLink className='nav button' activeStyle={{ backgroundColor: '#3190cf' }} exact to='/about-me'>About Me</NavLink>
        </ul>     
        <ul className="menu right">
          {user ? 
            <>
              <li key='username' className="username">
                {user && user.username}
              </li>
              <li key="sign-out">
                <SignOutButton />
              </li> 
            </>
            :
            <li key="sign-in">
              <Link to="/user-sessions/new" className="button">Sign In</Link>
            </li>
          }
      </ul>
    </Stack>
  );
};

export default TopBar;
