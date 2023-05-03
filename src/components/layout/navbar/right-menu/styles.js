import styled from "styled-components";

export const RightNavMenu = styled.ul`
  list-style: none;
  display: flex;
  padding: 10px 0;
  flex-flow: column;
  justify-content: center;
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 40%;
  min-width: 250px;
  padding-top: 20vh;
  justify-content: start;
  z-index: 10;
  background-color: white;
  box-shadow: -2px -3px 5px 5px rgba(0, 0, 0, 0.03);

  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(103%)")};
  transition: transform 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;

  @media screen and (min-width: 901px) {
    display: none;
  }
`;
