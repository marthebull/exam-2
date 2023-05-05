import React from "react";
import HeroGallery from "../../components/hero-section/HeroGallery";
import VenueInfo from "../../components/venueInfo";
import { Container } from "../../styles/GlobalStyles";
import BookVenue from "../../components/book-venue";

const Venue = () => {
  return (
    <div>
      <HeroGallery />
      <Container className="flex flex-col justify-center md:flex-row">
        <VenueInfo />
        <BookVenue />
      </Container>
    </div>
  );
};

export default Venue;
