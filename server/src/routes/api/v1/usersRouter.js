import express from "express";
import passwordResetHandler from "../../../services/passwordResetHandler.js";
import { User } from "../../../models/index.js";

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
    await passwordResetHandler(req)
    res.status(200).json({ message: "check your email" })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ errors: error })
  }
})

usersRouter.patch("/reset-password", async (req, res) => {
  try {
    const { password, passwordConfirm, resetToken, userId } = req.body
    const validUser = await User.query().findOne({ id: userId, passwordResetToken: resetToken })
    if (validUser) {
      await validUser.$query().patch({ password })
      res.status(200).json({ message: "password reset" })
    } else {
      throw new Error('Incorrect user information!')
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({ errors: error })
  }
})

export default usersRouter;
