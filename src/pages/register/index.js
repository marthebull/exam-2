import React from "react";
import RegisterForm from "../../components/forms/RegisterForm";
import { CenterContainer } from "../../styles/GlobalStyles";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <CenterContainer className="flex flex-col pt-12 w-full">
      <h1 className="h1 mb-8">register</h1>
      <RegisterForm />
      <p className=" flex flex-col pt-12">
        if you already have an account you can &nbsp;
        <Link to="/sign-in" className="underline label hover:opacity-70">
          sign in here.
        </Link>
      </p>
    </CenterContainer>
  );
};

export default Register;
