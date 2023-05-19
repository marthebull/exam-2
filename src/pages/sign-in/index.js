import React from "react";
import LoginForm from "../../components/forms/LoginForm";
import { CenterContainer } from "../../styles/GlobalStyles";
import { Link } from "react-router-dom";

const SignIn = () => {
  return (
    <CenterContainer className="flex flex-col w-full">
      <h1 className="h1 mb-8">sign in</h1>
      <LoginForm />
      <p className=" flex flex-col text-center pt-12">
        if you don't have an account you can &nbsp;
        <Link to="/register" className="underline label hover:opacity-70">
          register here.
        </Link>
      </p>
    </CenterContainer>
  );
};

export default SignIn;
