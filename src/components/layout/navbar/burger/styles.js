import styled from "styled-components";

export const BurgerMenu = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  justify-content: space-around;
  flex-flow: column nowrap;
  align-items: end;
  display: none;

  div {
    width: 1.5rem;
    height: 0.15rem;
    background-color: #424242;
    border-radius: 10px;
    transform-origin: 1px;
    transition: all 0.3s ease-in-out;
    cursor: pointer;
    z-index: 1000;

    &:nth-child(1) {
      transform: ${({ open }) => (open ? "rotate(45deg)" : "rotate(0)")};
    }

    &:nth-child(2) {
      width: 1rem;
      opacity: ${({ open }) => (open ? 0 : 1)};
      transform: ${({ open }) => (open ? "translateX(-60%)" : "translateX(0)")};
    }

    &:nth-child(3) {
      transform: ${({ open }) => (open ? "rotate(-45deg)" : "rotate(0)")};
    }
  }

  @media screen and (max-width: 900px) {
    display: flex;
  }
`;

export const MenuOverlay = styled.div`
  width: 100vw;
  height: 105vh;
  background-color: rgba(66, 66, 66, 0.3);
  position: absolute;
  top: -5px;
  left: 0;
  z-index: 1;
  cursor: pointer;

  opacity: ${({ open }) => (open ? 1 : 0)};
  display: ${({ open }) => (open ? "block" : "none")};
  transition: 0.3s ease-in-out;
`;
