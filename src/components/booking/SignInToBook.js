import React from "react";
import { Link } from "react-router-dom";
import { ButtonOutlineDark } from "../../styles/GlobalStyles";

const SignInToBook = () => {
  return (
    <div className="flex flex-col items-center mx-auto">
      <img
        src="/images/moon-sea-icon.svg"
        className="big-icon"
        alt="Bookings icon"
      ></img>
      <h2 className="text-center">You need to sign in to book venues</h2>

      <Link to="/sign-in" className="link pt-6">
        <ButtonOutlineDark>sign in to book </ButtonOutlineDark>
      </Link>
    </div>
  );
};

export default SignInToBook;
