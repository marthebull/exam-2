import React from "react";
import { ButtonSolidDark, Container } from "../../styles/GlobalStyles";
import { Link } from "react-router-dom";
import HeroHome from "../../components/hero-section/HeroHome";
import FeaturedVenues from "../../components/cards/list/FeaturedVenues";

const Home = () => {
  return (
    <>
      <HeroHome />
      <Container className="flex flex-col gap-6">
        <h2 className="h2 mb-2">snooze on these</h2>
        <FeaturedVenues />
        <Link to="/venues">
          <ButtonSolidDark>see all venues</ButtonSolidDark>
        </Link>
      </Container>
    </>
  );
};

export default Home;
