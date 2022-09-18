import React from "react";
import { Link, NavLink } from "react-router-dom";
import SignOutButton from "../authentication/SignOutButton";
import { Stack } from '@mui/material'

const TopBar = ({ user }) => {
  const unauthenticatedListItems = [
    <li key="sign-in">
      <Link to="/user-sessions/new" className="button">Sign In</Link>
    </li>,
    <li key="sign-up">
      <Link to="/users/new" className="button">
        Sign Up
      </Link>
    </li>,
  ];

  const authenticatedListItems = [
    <li className="username">
      {user && user.username}
    </li>,
    <li key="sign-out">
      <SignOutButton />
    </li>,
  ];

  return (
      <Stack className='top-bar' direction='row' >
        <ul className="menu">
          <NavLink className="nav button" activeStyle={{ backgroundColor: '#3190cf' }} exact to='/'>Home</NavLink>
          <NavLink className="nav button" activeStyle={{ backgroundColor: '#3190cf' }} exact to="/recipes">Recipes</NavLink>
        </ul>     
        <ul className="menu right">{user ? authenticatedListItems : unauthenticatedListItems}</ul>
    </Stack>
  );
};

export default TopBar;
