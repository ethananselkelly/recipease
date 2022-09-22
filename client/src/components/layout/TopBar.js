import React from "react";
import { Link, NavLink } from "react-router-dom";
import SignOutButton from "../authentication/SignOutButton";
import { Stack, Divider } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close';

const TopBar = ({ user }) => {
  const primaryNav = document.querySelector('.primary-navigation')
  const navToggle = document.querySelector('.mobile-nav-toggle')
  console.log(navToggle)

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      const visibility = primaryNav.getAttribute('data-visible')
      if (visibility === 'false') {
        console.log('hello')
        primaryNav.setAttribute('data-visible', true)
        navToggle.setAttribute('aria-expanded', true)
      } else {
        primaryNav.setAttribute('data-visible', 'false')
        navToggle.setAttribute('aria-expanded', 'false')
      }
    })
    // document.addEventListener('mouseup', (event) => {
    //   if (!primaryNav.contains(event.target) || navToggle.contains(event.target)) {
    //     primaryNav.setAttribute('data-visible', false)
    //     navToggle.setAttribute('aria-expanded', false)
    //   }
    // })
  //   window.onload = function () {
  //     document.onclick = function (event) {
  //       if (!event.target.className === 'primary-navigation') {
  //         primaryNav.setAttribute('data-visible', false)
  //         navToggle.setAttribute('aria-expanded', false)
  //       }
  //     }
  //   }
  }

  // const handleMenuVisibility = async () => {
  //   if (navToggle) {
  //     const visibility = primaryNav.getAttribute('data-visible')
  //     if (!visibility) {
  //       console.log('hello')
  //         primaryNav.setAttribute('data-visible', true)
  //         navToggle.setAttribute('aria-expanded', true)
  //       } else {
  //         primaryNav.setAttribute('data-visible', false)
  //         navToggle.setAttribute('aria-expanded', false)
  //       }

  //   }
  // }
  
  // document.addEventListener('mouseup', function(event) {
  //   if (!primaryNav.contains(event.target)) {
  //     primaryNav.setAttribute('data-visible', false)
  //     navToggle.setAttribute('aria-expanded', false)
  //   }
  // })

 


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
          {/* <NavLink className="nav-button" activeStyle={{ color: 'white', backgroundColor: '#3190cf' }} exact to="/user-sessions/new" >Sign In</NavLink> */}
        </div>

        <button className="mobile-nav-toggle" aria-controls="primary-navigation" aria-expanded='false'>
          <MenuIcon className="menu-icon" data-visible='true' />
        </button>

        <ul className="primary-navigation" data-visible='false'>
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
