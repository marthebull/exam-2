import styled from "styled-components";

export const Nav = styled.nav`
  width: 100%;
  height: 8vh;
  min-height: 45px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;

  @media screen and (max-width: 900px) {
    margin: 5px 0;
  }
`;

export const NavMenu = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  padding: 10px 0;

  @media screen and (max-width: 900px) {
    display: none;
  }
`;
