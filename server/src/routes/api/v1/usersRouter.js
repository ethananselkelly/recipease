import express from "express";
import { User } from "../../../models/index.js";
import PasswordResetHandler from "../../../services/passwordResetHandler.js";

const usersRouter = new express.Router();

usersRouter.post("/", async (req, res) => {
  const { username, email, password, passwordConfirmation } = req.body;
  try {
    const persistedUser = await User.query().insertAndFetch({ username: username.trim(), email, password });
    return req.login(persistedUser, () => {
      return res.status(201).json({ user: persistedUser });
    });
  } catch (error) {
    console.log(error);
    return res.status(422).json({ errors: error });
  }
});

usersRouter.patch("/forgot-password", async (req, res) => {
  try {
    await PasswordResetHandler.passwordForget(req)
    res.status(200).json({ message: "check your email" })
  } catch (error) {
    console.log(error)
    res.statusMessage = error
    return res.status(404).json({ errors: error })
  }
})

usersRouter.patch("/reset-password", async (req, res) => {
  try {
    await PasswordResetHandler.passwordReset(req)
    res.status(200).json({ message: "password reset" })
  } catch (error) {
    console.log(error)
    res.statusMessage = error
    return res.status(500).json({ errors: error })
  }
})

export default usersRouter;
