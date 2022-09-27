import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { hot } from "react-hot-loader/root";

import getCurrentUser from "../services/getCurrentUser";
import "../assets/scss/main.scss";
import RegistrationForm from "./registration/RegistrationForm";
import SignInForm from "./authentication/SignInForm";
import TopBar from "./layout/TopBar";
import RecipesIndex from "./RecipesIndex";
import RecipeShow from "./RecipeShow";
import AuthenticatedRoute from "./authentication/AuthenticatedRoute";
import Footer from "./layout/Footer";
import Home from "./Home";
import AboutMe from "./AboutMe";

const App = (props) => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [loading, setLoading] = useState(false)

  const fetchCurrentUser = async () => {
    setLoading(true)
    try {
      const user = await getCurrentUser()
      setCurrentUser(user)
      setLoading(false)
    } catch(err) {
      setCurrentUser(null)
    }
  }

  useEffect(() => {
    fetchCurrentUser()
  }, [])

  // let scrollPosition = 0

  // const topBar = document.getElementsByClassName('topbar')[0]
  // window.addEventListener('scroll', () => {
  //   const scrollTop = window.scrollY || document.documentElement.scrollTop
  //   if (scrollTop > scrollPosition) {
  //     topBar.style.top='-80px'
  //   } else {
  //     topBar.style.top = '0'
  //   }
  //   scrollPosition = scrollTop
  // })

  // const scrollContent = document.querySelector('#app')
  // scrollContent.addEventListener('scroll', (e) => {
  //   scrollPosition = scrollContent.scrollTop
  //   console.log(scrollPosition)
  // })
  const navToggle = document.querySelector('.mobile-nav-toggle')
  const topBar = document.querySelector('.topbar')

  const [navVisibility, setNavVisibility] = useState(false)
  document.addEventListener('click', function (event) {
    if (navVisibility === true && !topBar.contains(event.target)) {
      setNavVisibility(false)
      console.log(navVisibility)
    }
  })

  const handleVisibility = () => {
    // console.log(navVisibility)
    if (navToggle) {
      if (navVisibility === true) {
        setNavVisibility(false)
      } else {
        setNavVisibility(true)
      }
    }
  }

  return (
    <Router>
      <TopBar user={currentUser} navVisibility={navVisibility} handleVisibility={handleVisibility} />
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/users/new" component={RegistrationForm} />
        <Route exact path="/user-sessions/new" component={SignInForm} />
        <AuthenticatedRoute exact path="/recipes" component={RecipesIndex} user={currentUser}/>
        <Route exact path="/recipes/:id">
          <RecipeShow user={currentUser} />
        </Route>   
        <Route exact path="/about-me" component={AboutMe}/>     
      </Switch>
      <Footer/>
    </Router>
  );
};

export default hot(App);
