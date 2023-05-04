import React from "react";
import RegisterForm from "../../components/forms/RegisterForm";
import { CenterContainer } from "../../styles/GlobalStyles";

const Register = () => {
  return (
    <CenterContainer>
      <h1 className="h1 mb-8">register</h1>
      <RegisterForm />
    </CenterContainer>
  );
};

export default Register;
