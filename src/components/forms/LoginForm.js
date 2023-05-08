import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ButtonSolidDark } from "../../styles/GlobalStyles";
import { loginUser } from "../../state/features/authSlice";

const LoginForm = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <>
      <form onSubmit={handleLogin} className="flex flex-col items-start">
        <div className="gap-2 mb-6 items-start">
          <label htmlFor="email" className="mb-1">
            email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
            className="mb-2"
          />
        </div>

        <ButtonSolidDark type="submit">sign in</ButtonSolidDark>
      </form>
    </>
  );
};

export default LoginForm;