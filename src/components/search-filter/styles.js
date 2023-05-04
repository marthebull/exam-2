import styled from "styled-components";

export const FilterWrapper = styled.div`
  max-width: 500px;
  display: flex;
  margin: 30px auto;
  flex-direction: row nowrap;
  justify-content: space-between;
  gap: 60px;

  img:hover {
    opacity: 0.6;
  }

  @media screen and (max-width: 500px) {
    gap: 20px;
  }
`;
