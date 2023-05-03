import styled from "styled-components";
import { Container } from "../../../styles/GlobalStyles";

export const FooterCont = styled(Container)`
  display: flex;
  flex-direction: column;
  padding: 30px 0;
  border-top: 1px solid #d3d3d3;
  align-items: center;
`;

export const FooterInner = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 3rem;

  @media screen and (max-width: 600px) {
    flex-direction: column-reverse;
    justify-content: center;
    gap: 5rem;
  }
`;

export const FooterNav = styled.div`
  display: flex;
  gap: 20px;

  @media screen and (max-width: 600px) {
    justify-content: center;
  }
`;

export const BrandInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media screen and (max-width: 600px) {
    justify-content: center;
    text-align: center;
  }
`;
