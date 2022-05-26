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
      <Switch>
        <Route exact path="/">
          <h2>Hello from react</h2>
        </Route>
        <Route exact path="/users/new" component={RegistrationForm} />
        <Route exact path="/user-sessions/new" component={SignInForm} />
        <Route exact path="/recipes" component={RecipesIndex} />
        <Route exact path="/recipes/:id" component={RecipeShow} />
      </Switch>
    </Router>
  );
};

export default hot(App);
