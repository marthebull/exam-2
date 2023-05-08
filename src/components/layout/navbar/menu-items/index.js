import React from "react";
import { NavAvatar, NavItem } from "./styles";
import { Link } from "react-router-dom";
import { NavMenu } from "../styles";
import { useSelector } from "react-redux";

const MenuItems = () => {
  const accessToken = useSelector((state) => state.persisted.auth.accessToken);
  const username = useSelector((state) => state.persisted.auth.name);

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
            <Link to={"/dashboard/" + username.value} className="link nav-link">
              dashboard
            </Link>
          </NavItem>
        )}

        {accessToken.length > 0 && (
          <NavItem>
            <Link to="/dashboard" className="link nav-link">
              dashboard
            </Link>
          </NavItem>
        )}

        <NavItem>
          <Link to="/sign-in" className="link nav-link">
            log out
          </Link>
        </NavItem>
        <NavItem>
          <NavAvatar src="/images/placeholder-avatar.svg"></NavAvatar>
        </NavItem>
      </NavMenu>
    </>
  );
};

export default MenuItems;
