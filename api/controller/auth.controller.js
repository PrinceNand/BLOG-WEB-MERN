import User from "../model/user.model.js";
import bycrptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import { json } from "express";

// Auth Routes for Sign Up
export const signup = async (req, res, next) => {
  // get data from json post req
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    // return res.status(400).json({ message: "All feilds are required!" });

    // using middleware to show error
    next(errorHandler(400, "All feilds are required!"));
  }

  const hashedPassword = bycrptjs.hashSync(password, 10);

  // convert data to models
  const newUser = new User({ username, email, password: hashedPassword });

  // save data in db
  //   await newUser.save();
  //   res.json({ message: "Sign Up Successfully!" });

  // if user same email and password send response to user
  try {
    await newUser.save();
    res.json({ message: "Sign Up Successfully!" });
  } catch (error) {
    // res.status(500).json({ message: error.message });

    // using middleware
    next(error);
  }
};

// Auth Routes for Sign In
export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    next(errorHandler(400, "All feilds are required!"));
  }

  try {
    // find user in db
    const validUser = await User.findOne({ email });

    if (!validUser) {
      next(errorHandler(404, "User Not Found!"));
    }

    // check if password is matching with user
    const validPassword = bycrptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, "Invalid Credentials!"));
    }

    // using jwt to get convert the authentication to token
    // validUser._id: to get the unique id created in db for user | JWT_SECRET: to hide the token
    // It's taking the user's unique ID (validUser._id) and turning it into a token.
    // The token is signed with a secret key (process.env.JWT_SECRET) to ensure it's secure.
    const token = jwt.sign(
      { id: validUser._id, isAdmin: validUser.isAdmin },
      process.env.JWT_SECRET
    );
    // hide the password so that it should not get send to user
    const { password: pass, ...rest } = validUser._doc;
    res
      .status(200)
      .cookie("access_token", token, { httpOnly: true })
      .json(rest);
  } catch (e) {
    next(e);
  }
};

export const googleAuth = async (req, res, next) => {
  const { email, name, googlePhotoUrl } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      // Existing User
      // It's taking the user's unique ID (validUser._id) and turning it into a token.
      // The token is signed with a secret key (process.env.JWT_SECRET) to ensure it's secure.
      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET
      );

      const { password, ...rest } = user._doc;

      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(rest);
    } else {
      // New User
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);

      const hashedPassword = bycrptjs.hashSync(generatedPassword, 10);

      const newUser = new User({
        username:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      });
      await newUser.save();
      const token = jwt.sign(
        // added here before itself
        { id: newUser._id, isAdmin: newUser.isAdmin },
        process.env.JWT_SECRET
      );
      const { password, ...rest } = newUser._doc;
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};
