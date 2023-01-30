import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { hot } from "react-hot-loader/root";

import getCurrentUser from "../services/getCurrentUser";
import "../assets/scss/main.scss";
import RegistrationForm from "./registration/RegistrationForm";
import SignInForm from "./authentication/SignInForm";
import TopBar from "./layout/TopBar";
import RecipesIndex from "./recipeIndex/RecipesIndex";
import RecipeShow from "./recipeShow/RecipeShow";
import NewRecipeForm from "./recipeForms/NewRecipeForm";
import EditRecipeForm from "./recipeForms/EditRecipeForm";
import AuthenticatedRoute from "./authentication/AuthenticatedRoute";
import Footer from "./layout/Footer";
import Home from "./Home";
import AboutMe from "./AboutMe";
import ForgotPassword from "./registration/ForgotPassword";
import ResetPassword from "./registration/ResetPassword";

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
        <Route exact path="/" component={Home} />
        <Route exact path="/users/new" component={RegistrationForm} />
        <Route exact path="/users/forgot-password" component={ForgotPassword} />
        <Route exact path="/users/:id/reset-password/:token" component={ResetPassword} />
        <Route exact path="/user-sessions/new" component={SignInForm} />
        <AuthenticatedRoute exact path="/recipes" component={RecipesIndex} user={currentUser} />
        <AuthenticatedRoute exact path="/recipes/form" component={NewRecipeForm} user={currentUser} />
        <Route exact path="/recipes/:id" >
          <RecipeShow user={currentUser} />
        </Route>   
        {/* <AuthenticatedRoute exact path='/recipes/:id/edit' component={EditRecipeForm} user={currentUser} /> */}
        <Route exact path='/recipes/:id/edit' >
          <EditRecipeForm user={currentUser} />
        </Route>
        <Route exact path="/about-me" component={AboutMe} />     
      </Switch>
      <Footer/>
    </Router>
  );
};

export default hot(App);
