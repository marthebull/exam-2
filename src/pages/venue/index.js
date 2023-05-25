import React from "react";
import HeroGallery from "../../components/hero-section/HeroGallery";
import VenueInfo from "../../components/venueInfo";
import { CenterContainer, Container } from "../../styles/GlobalStyles";
import BookVenue from "../../components/booking/BookVenue";
import { useParams } from "react-router-dom";
import { useGetVenueByIdQuery } from "../../state/api/api";
import HeroSpinner from "../../components/loaders/HeroSpinner";

const Venue = () => {
  const { id } = useParams();

  const {
    data: venueData,
    isLoading: isVenueDataLoading,
    isError: isVenueDataError,
  } = useGetVenueByIdQuery(id);

  if (isVenueDataLoading) {
    return <HeroSpinner />;
  }

  if (isVenueDataError) {
    return (
      <CenterContainer>
        <h1 className="h1">Sorry!</h1>
        <img
          src="/images/broken-heart-icon.svg"
          className="big-icon"
          alt="Broken heart icon"
        ></img>
        <p>Something went wrong.</p>
      </CenterContainer>
    );
  }

  return (
    <div>
      <HeroGallery
        venueData={venueData}
        isVenueDataLoading={isVenueDataLoading}
        isVenueDataError={isVenueDataError}
        id={id}
      />
      <Container className="flex flex-col justify-center md:flex-row">
        <VenueInfo
          venueData={venueData}
          isVenueDataLoading={isVenueDataLoading}
          isVenueDataError={isVenueDataError}
          id={id}
        />
        <BookVenue
          venueData={venueData}
          isVenueDataLoading={isVenueDataLoading}
          isVenueDataError={isVenueDataError}
          id={id}
        />
      </Container>
    </div>
  );
};

export default Venue;
