import React from "react";
import { Link, NavLink } from "react-router-dom";
import SignOutButton from "../authentication/SignOutButton";

const TopBar = ({ user }) => {
  const unauthenticatedListItems = [
    <li key="sign-in">
      <Link to="/user-sessions/new">Sign In</Link>
    </li>,
    <li key="sign-up">
      <Link to="/users/new" className="button">
        Sign Up
      </Link>
    </li>,
  ];

  const authenticatedListItems = [
    <li key="sign-out">
      <SignOutButton />
    </li>,
  ];

  return (
    <div className="top-bar">
      <div className="top-bar-left">
        <ul className="menu">
          <NavLink className="menu-text tab" activeStyle={{ backgroundColor: '#65acdb', opacity: '0.75' }} exact to='/'>Home</NavLink>
          <NavLink className="menu-text tab" activeStyle={{ backgroundColor: '#65acdb', opacity: '0.75' }} exact to="/recipes">Recipes</NavLink>
        </ul>
      </div>
      <div className="top-bar-right">
        <p className="menu right">{user ? `Hello, ${user.username}` : ''}</p>
        <ul className="menu right">{user ? authenticatedListItems : unauthenticatedListItems}</ul>
      </div>
    </div>
  );
};

export default TopBar;
