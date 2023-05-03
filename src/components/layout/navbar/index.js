import React from "react";
import { Nav } from "./styles";
import { Link } from "react-router-dom";
import { Container, Logo } from "../../../styles/GlobalStyles";
import MenuItems from "./menu-items/index";
import Burger from "./burger";

const Navbar = () => {
  return (
    <>
      <Container>
        <Nav>
          <Link to="/" className="link">
            <Logo src="/images/logo-holidaze.svg"></Logo>
          </Link>
          <MenuItems />
          <Burger />
        </Nav>
      </Container>
    </>
  );
};

export default Navbar;
