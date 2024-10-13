import User from "../model/user.model.js";
import bycrptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

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
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

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
