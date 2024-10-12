import User from "../model/user.model.js";
import bycrptjs from "bcryptjs";

export const signup = async (req, res) => {
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
    return res.status(400).json({ message: "All feilds are required!" });
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
    res.status(500).json({ message: error.message });
  }
};
