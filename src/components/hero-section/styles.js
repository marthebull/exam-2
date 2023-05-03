import styled from "styled-components";

export const HeroContainer = styled.div`
  width: 100%;
  height: 65vh;
  min-height: 500px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ImgNoText = styled.img`
  object-fit: cover;
  min-width: 100%;
  min-height: 100%;
`;

export const TextHero = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 100%;
  height: 100%;
  text-align: center;

  @media screen and (max-width: 600px) {
    padding: 40px;
  }
`;

export const HeroLogo = styled.img`
  max-width: 250px;
  height: auto;
  margin-bottom: 20px;

  @media screen and (max-width: 600px) {
    width: 40%;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  gap: 10px;

  @media screen and (max-width: 600px) {
    flex-flow: column nowrap;
  }
`;
