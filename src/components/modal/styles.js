import styled from "styled-components";

export const ModalOverlay = styled.div`
  width: 100vw;
  height: 105vh;
  background-color: rgba(66, 66, 66, 0.3);
  position: absolute;
  top: -5px;
  left: 0;
  z-index: 1;

  opacity: ${({ open }) => (open ? 1 : 0)};
  display: ${({ open }) => (open ? "block" : "none")};
  transition: 0.3s ease-in-out;
`;
