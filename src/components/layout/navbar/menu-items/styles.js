import styled from "styled-components";

export const NavItem = styled.li`
  display: inline-block;
  padding: 10px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const NavAvatar = styled.img`
  border-radius: 50%;
  height: 46px;
  width: 46px;
  object-fit: cover;
  margin-left: 20px;

  @media screen and (max-width: 900px) {
    margin-top: 10px;
    margin-left: 0;
  }
`;
