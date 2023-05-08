import React from "react";
import { Nav } from "./styles";
import { Link } from "react-router-dom";
import { Container, Logo } from "../../../styles/GlobalStyles";
import MenuItems from "./menu-items/index";
import Burger from "./burger";

const Navbar = () => {
  return (
    <div className="sticky py-0.5 top-0 z-50 bg-white shadow-sm">
      <Container>
        <Nav>
          <Link to="/" className="link">
            <Logo src="/images/logo-holidaze.svg"></Logo>
          </Link>
          <MenuItems />
          <Burger />
        </Nav>
      </Container>
    </div>
  );
};

export default Navbar;
