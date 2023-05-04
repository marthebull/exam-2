import React from "react";
import { HeroContainer, HeroLogo, TextHero } from "./styles";
import { Link } from "react-router-dom";

const HeroHome = () => {
  return (
    <>
      <HeroContainer className="mb-4">
        <TextHero
          style={{
            backgroundImage: `url(images/hero-bg-home.jpg)`,
            backgroundPosition: `center`,
            backgroundSize: `cover`,
            backgroundColor: `#424242`,
          }}
        >
          <HeroLogo
            src="images/logo-holidaze-white.svg"
            className="pb-6"
          ></HeroLogo>
          <h1 className="white h4">
            discover, book and enjoy the most exquisite accommodations.
          </h1>
          <p className="white">
            <Link to="/sign-in" className="link-white hover:opacity-70">
              sign in
            </Link>
            &nbsp; or &nbsp;
            <Link to="/venues" className="link-white hover:opacity-70">
              browse
            </Link>
          </p>
        </TextHero>
      </HeroContainer>
    </>
  );
};

export default HeroHome;
