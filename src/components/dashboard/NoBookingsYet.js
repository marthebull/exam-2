import React from "react";
import { ButtonOutlineDark } from "../../styles/GlobalStyles";
import { Link } from "react-router-dom";

const NoBookingsYet = () => {
  return (
    <div className="flex flex-col items-center mx-auto">
      <img
        src="/images/moon-sea-icon.svg"
        className="big-icon"
        alt="Bookings icon"
      ></img>
      <h2 className="text-center">no bookings ahead!</h2>
      <h2 className="text-center">you should do something about that...</h2>

      <Link to="/venues" className="link pt-6">
        <ButtonOutlineDark>browse</ButtonOutlineDark>
      </Link>
    </div>
  );
};

export default NoBookingsYet;
