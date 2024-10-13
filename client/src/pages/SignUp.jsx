import { Button, Label, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  // get data from form and store in the variable
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // track the entered values
  // console.log(formData);

  // store the data in db
  const handleSubmit = async (e) => {
    e.preventDefault(); // handle refresh

    try {
      // get the api routes and create api call structure with json data
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      // send data
      const data = await res.json;
    } catch (e) {}
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
            This a demo learning project. This Blog site is made using MERN,
            Tailwind, Vite, Flowbite ...etc.
          </p>
        </div>

        {/* Right area */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Your Username" />
              <TextInput
                type="text"
                placeholder="Username"
                id="username"
                onChange={handleChange}
              />
            </div>
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
            <Button gradientDuoTone="purpleToPink" type="submit">
              Sign Up
            </Button>
          </form>

          {/* Add a link to Sign In user */}
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account?</span>
            <Link to="/sign-in" className="text-blue-500">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
