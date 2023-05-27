import React from "react";
import { RightNavMenu } from "./styles";
import { NavAvatar, NavItem } from "../menu-items/styles";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../../state/features/authSlice";

const RightMenu = ({ open, setOpen }) => {
  const { accessToken, avatar } = useSelector((state) => state.persisted.auth);

  const dispatch = useDispatch();

  const handleLogoutAndClose = () => {
    dispatch(logout());
    setOpen(!open);
  };
  return (
    <>
      <RightNavMenu open={open}>
        <NavItem>
          <Link
            to="/venues"
            className="link nav-link"
            onClick={() => setOpen(!open)}
          >
            venues
          </Link>
        </NavItem>

        {accessToken.length > 0 && (
          <NavItem>
            <Link
              to={"/dashboard/"}
              className="link nav-link"
              onClick={() => setOpen(!open)}
            >
              dashboard
            </Link>
          </NavItem>
        )}

        {accessToken.length > 0 ? (
          <NavItem>
            <Link
              to="/"
              className="link nav-link"
              onClick={handleLogoutAndClose}
            >
              log out
            </Link>
          </NavItem>
        ) : (
          <NavItem>
            <Link
              to="/sign-in"
              className="link nav-link"
              onClick={() => setOpen(!open)}
            >
              sign in
            </Link>
          </NavItem>
        )}

        {accessToken.length > 0 && (
          <Link
            to={"/dashboard/"}
            className="flex justify-center"
            onClick={() => setOpen(!open)}
          >
            <NavAvatar src={avatar}></NavAvatar>
          </Link>
        )}
      </RightNavMenu>
    </>
  );
};

export default RightMenu;
