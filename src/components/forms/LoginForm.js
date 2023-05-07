import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { ButtonSolidDark } from "../../styles/GlobalStyles";
import { loginUser } from "../../state/features/authSlice";

const LoginForm = () => {
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const { accessToken } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(credentials));
  };

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col items-start">
        <div className="gap-2 mb-6 items-start">
          <label htmlFor="email" className="mb-1">
            email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={credentials.email}
            onChange={handleChange}
            placeholder="example@noroff.no"
            className="mb-2"
          />
        </div>

        <div className="gap-2 mb-6 items-start">
          <label htmlFor="password" className="mb-1">
            password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={credentials.password}
            onChange={handleChange}
            placeholder="********"
            className="mb-2"
          />
        </div>
        {accessToken && <p>Access token: {accessToken}</p>}

        <ButtonSolidDark type="submit">sign in</ButtonSolidDark>
      </form>
    </>
  );
};

export default LoginForm;
