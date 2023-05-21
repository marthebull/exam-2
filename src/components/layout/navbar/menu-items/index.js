import React from "react";
import { NavAvatar, NavItem } from "./styles";
import { Link } from "react-router-dom";
import { NavMenu } from "../styles";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../../state/features/authSlice";

const MenuItems = () => {
  const { accessToken, name, avatar } = useSelector(
    (state) => state.persisted.auth
  );

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <NavMenu>
        <NavItem>
          <Link to="/venues" className="link nav-link">
            venues
          </Link>
        </NavItem>

        {accessToken.length > 0 && (
          <NavItem>
            <Link to={"/dashboard/"} className="link nav-link">
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
          <NavItem>
            <Link to={"/dashboard/"}>
              <NavAvatar src={avatar}></NavAvatar>
            </Link>
          </NavItem>
        )}
      </NavMenu>
    </>
  );
};

export default MenuItems;
