import React from "react";
import { Link } from "react-router-dom";
import { ButtonOutlineDark } from "../../styles/GlobalStyles";
import { useDispatch } from "react-redux";
import { logout } from "../../state/features/authSlice";

const NoVenuesYet = ({ user }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <div className="flex flex-col items-center mx-auto">
      <img
        src="/images/house-icon.svg"
        className="big-icon"
        alt="Venues icon"
      ></img>

      {user?.venueManager ? (
        <>
          <h2 className="text-center">no venues to manage.</h2>
          <h2 className="text-center">
            start hosting by creating your first venue
          </h2>
        </>
      ) : (
        <>
          <h2 className="text-center">no venues to manage.</h2>
          <h2 className="text-center">register as host to add new venues</h2>
        </>
      )}

      {user?.venueManager ? (
        <Link to="/create-new-venue" className="link pt-6">
          <ButtonOutlineDark>+ new venue</ButtonOutlineDark>
        </Link>
      ) : (
        <Link to="/register" className="link pt-6">
          <ButtonOutlineDark onClick={handleLogout}>register</ButtonOutlineDark>
        </Link>
      )}
    </div>
  );
};

export default NoVenuesYet;
