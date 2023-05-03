import React from "react";
import { RightNavMenu } from "./styles";
import { NavAvatar, NavItem } from "../menu-items/styles";
import { Link } from "react-router-dom";

const RightMenu = ({ open }) => {
  return (
    <>
      <RightNavMenu open={open}>
        <NavItem>
          <Link to="/venues" className="link nav-link">
            venues
          </Link>
        </NavItem>
        <NavItem>
          <Link to="/sign-in" className="link nav-link">
            sign in
          </Link>
        </NavItem>
        <NavItem>
          <Link to="/dashboard" className="link nav-link">
            dashboard
          </Link>
        </NavItem>
        <NavItem>
          <NavAvatar src="https://raw.githubusercontent.com/marthebull/holidaze-exam2023/187f416b0fd1cc2255c1e2d534bf8e89b5ee8657/images/placeholder-avatar.svg"></NavAvatar>
        </NavItem>
      </RightNavMenu>
    </>
  );
};

export default RightMenu;
