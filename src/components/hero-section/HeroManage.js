import React from "react";
import { HeroContainer, TextHero } from "./styles";
import {
  ButtonOutlineWhite,
  ButtonSolidWhite,
} from "../../styles/GlobalStyles";

const HeroManage = (venueData) => {
  console.log(venueData.venueData);

  return (
    <>
      <HeroContainer className="relative">
        <TextHero
          style={{
            backgroundImage:
              venueData.venueData?.media.length > 0
                ? `url(${venueData.venueData.media[0]})`
                : `url(/images/placeholder-image.svg)`,
            backgroundPosition: `center`,
            backgroundSize: `cover`,
            backgroundColor: `#424242`,
          }}
          className="z-20"
        >
          <div className="flex absolute z-20 bg-gray-900 opacity-50 w-full h-full items-center"></div>
          <div className="w-fit mx-auto z-50">
            <small className="white">manage venue</small>
            <h1 className="white h3">{venueData.venueData.name}</h1>
            <div className="flex flex-col mx-auto pt-6 gap-1 md:flex-row md:gap-4">
              <ButtonSolidWhite>edit</ButtonSolidWhite>
              <ButtonOutlineWhite>delete</ButtonOutlineWhite>
            </div>
          </div>
        </TextHero>
      </HeroContainer>
    </>
  );
};

export default HeroManage;
