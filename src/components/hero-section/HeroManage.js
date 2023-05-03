import React from "react";
import { HeroContainer, TextHero } from "./styles";
import {
  ButtonOutlineWhite,
  ButtonSolidWhite,
} from "../../styles/GlobalStyles";

const HeroManage = () => {
  return (
    <>
      <HeroContainer className="relative">
        <div class="z-10 absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-dark bg-fixed opacity-1 "></div>
        <TextHero
          style={{
            backgroundImage: `url(images/hero-bg-home.jpg)`,
            backgroundPosition: `center`,
            backgroundSize: `cover`,
            backgroundColor: `#424242`,
          }}
          className="z-20"
        >
          <small className="white">manage venue</small>
          <h1 className="white h3">Venue Name Blabla</h1>
          <div className="flex flex-col pt-6 gap-1 md:flex-row md:gap-4">
            <ButtonSolidWhite>edit</ButtonSolidWhite>
            <ButtonOutlineWhite>delete</ButtonOutlineWhite>
          </div>
        </TextHero>
      </HeroContainer>
    </>
  );
};

export default HeroManage;
