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

  return (
    <Router>
      <TopBar user={currentUser} />
      <div className="content">
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/users/new" component={RegistrationForm} />
          <Route exact path="/user-sessions/new" component={SignInForm} />
          <AuthenticatedRoute exact path="/recipes" component={RecipesIndex} user={currentUser}/>
          <Route exact path="/recipes/:id">
            <RecipeShow user={currentUser} />
          </Route>        
        </Switch>
        <Footer/>
      </div>
    </Router>
  );
};

export default hot(App);
