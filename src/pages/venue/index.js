import React from "react";
import HeroGallery from "../../components/hero-section/HeroGallery";
import VenueInfo from "../../components/venueInfo";
import { Container } from "../../styles/GlobalStyles";

const Venue = () => {
  return (
    <div>
      <HeroGallery />
      <Container className="flex flex-col justify-center md:flex-row">
        <VenueInfo />
        <VenueInfo />
      </Container>
    </div>
  );
};

export default Venue;
