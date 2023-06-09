import React from "react";
import { HeroContainer, HeroLogo, TextHero } from "./styles";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const HeroHome = () => {
  const accessToken = useSelector((state) => state.persisted.auth.accessToken);
  return (
    <>
      <HeroContainer className="mb-10">
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
          <h1 className="white mb-2 h4 mx-8 tracking-wide">
            discover, book and enjoy the most exquisite places to stay.
          </h1>
          {!accessToken && (
            <p className="white">
              <Link
                to="/sign-in"
                className="link-white underline label hover:opacity-70"
              >
                sign in
              </Link>
              &nbsp; or &nbsp;
              <Link
                to="/venues"
                className="link-white underline label hover:opacity-70"
              >
                browse
              </Link>
            </p>
          )}
        </TextHero>
      </HeroContainer>
    </>
  );
};

export default HeroHome;
