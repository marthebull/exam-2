import React from "react";
import { RightNavMenu } from "./styles";
import { NavAvatar, NavItem } from "../menu-items/styles";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../../state/features/authSlice";

const RightMenu = ({ open }) => {
  const { accessToken, name, avatar } = useSelector(
    (state) => state.persisted.auth
  );

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <>
      <RightNavMenu open={open}>
        <NavItem>
          <Link to="/venues" className="link nav-link">
            venues
          </Link>
        </NavItem>

        {accessToken.length > 0 && (
          <NavItem>
            <Link to={"/dashboard/" + name} className="link nav-link">
              dashboard
            </Link>
          </NavItem>
        )}

        {accessToken.length > 0 ? (
          <NavItem>
            <Link to="/" className="link nav-link" onClick={handleLogout}>
              log out
            </Link>
          </NavItem>
        ) : (
          <NavItem>
            <Link to="/sign-in" className="link nav-link">
              sign in
            </Link>
          </NavItem>
        )}

        {accessToken.length > 0 && (
          <Link to={"/dashboard/" + name} className="flex justify-center">
            <NavAvatar src={avatar}></NavAvatar>
          </Link>
        )}
      </RightNavMenu>
    </>
  );
};

export default RightMenu;
