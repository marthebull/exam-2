import React from "react";
import HeroManage from "../../components/hero-section/HeroManage";
import { CenterContainer, Container } from "../../styles/GlobalStyles";
import VenueInfo from "../../components/venueInfo";
import BookVenue from "../../components/booking/BookVenue";
import { useGetVenueByIdQuery } from "../../state/api/api";
import { useParams } from "react-router-dom";
import HeroSpinner from "../../components/loaders/HeroSpinner";

const ManageVenue = () => {
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
    <>
      <HeroManage id={id} />
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
    </>
  );
};

export default ManageVenue;
