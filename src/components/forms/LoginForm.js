import React, { useState } from "react";

import { useDispatch } from "react-redux";

import { ButtonSolidDark } from "../../styles/GlobalStyles";
import { loginUser } from "../../state/features/authSlice";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await dispatch(loginUser({ credentials: { email, password }, navigate }));
    } catch (error) {
      setError(error.error.message);
    }
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
            value={email}
            onChange={(event) => setEmail(event.target.value)}
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
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="********"
            className="mb-2"
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}

        <ButtonSolidDark type="submit">sign in</ButtonSolidDark>
      </form>
    </>
  );
};

export default LoginForm;
