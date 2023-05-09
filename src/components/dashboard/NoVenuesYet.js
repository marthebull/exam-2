import React from "react";
import { Link } from "react-router-dom";
import { ButtonOutlineDark } from "../../styles/GlobalStyles";

const NoVenuesYet = ({ user }) => {
  return (
    <div className="flex flex-col items-center mx-auto">
      <img
        src="/images/house-icon.svg"
        className="big-icon"
        alt="Venues icon"
      ></img>
      <h2 className="text-center">
        register as host to create and manage your own venues
      </h2>

      {user?.venueManager ? (
        <Link to="/create-new-venue" className="link pt-6">
          <ButtonOutlineDark>+ new venue</ButtonOutlineDark>
        </Link>
      ) : (
        <Link to="/register" className="link pt-6">
          <ButtonOutlineDark>register</ButtonOutlineDark>
        </Link>
      )}
    </div>
  );
};

export default NoVenuesYet;
