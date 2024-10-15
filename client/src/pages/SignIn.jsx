import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

export default function SignIn() {
  // const [errorMessage, setErrorMessage] = useState(null);
  // const [loading, setLoading] = useState(false);
  // set errorMessage and loading using redux selector
  const { loading, error: errorMessage } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({});
  // get data from form and store in the variable
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() }); //.trim() to remove space
  };

  // track the entered values
  // console.log(formData);

  // store the data in db
  const handleSubmit = async (e) => {
    e.preventDefault(); // handle refresh

    // check the feilds are empty
    if (!formData.email || !formData.password) {
      // return setErrorMessage("Please fill out all fields.");
      return dispatch(signInFailure("Please fill out all fields."));
    }

    try {
      // clear all errors and set loading true
      // setErrorMessage(null);
      // setLoading(true);
      dispatch(signInStart());

      // get the api routes and create api call structure with json data
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      // send data
      const data = await res.json();

      // show error if data is not successfull
      if (data.success === false) {
        // setLoading(false);
        // return setErrorMessage(data.message);
        dispatch(signInFailure(data.message));
      }

      // setLoading(false);

      // on success move to another page
      if (res.ok) {
        dispatch(signInSuccess());
        navigate("/");
      }
    } catch (e) {
      // setErrorMessage(e.message);
      // setLoading(false);
      dispatch(signInFailure(e.message));
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* Left area */}
        <div className="flex-1">
          <Link to="/" className="font-bold dark:test-white test-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
              Ash's
            </span>{" "}
            Blog
          </Link>
          <p className="test-sm mt-5">
            This a demo learning project. You can sign in with your email and
            password
          </p>
        </div>

        {/* Right area */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Your Email" />
              <TextInput
                type="email"
                placeholder="name@company.com"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your Password" />
              <TextInput
                type="password"
                placeholder="Password"
                id="password"
                onChange={handleChange}
              />
            </div>

            {/* Add Sign Up Button */}
            <Button
              gradientDuoTone="purpleToPink"
              type="submit"
              disabled={loading}
            >
              {/* Add loading in button or Sign In */}
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Sign In"
              )}
            </Button>

            {/* Adding Google Auth */}
            <OAuth />
          </form>

          {/* Add a link to Sign In user */}
          <div className="flex gap-2 text-sm mt-5">
            <span>Don't have an account?</span>
            <Link to="/sign-up" className="text-blue-500">
              Sign Up
            </Link>
          </div>

          {/* error message is not null show to user */}
          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
