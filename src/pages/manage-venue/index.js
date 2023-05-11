import React from "react";
import HeroManage from "../../components/hero-section/HeroManage";
import { Container } from "../../styles/GlobalStyles";
import VenueInfo from "../../components/venueInfo";
import BookVenue from "../../components/book-venue";
import { useGetVenueByIdQuery } from "../../state/api/api";
import { useParams } from "react-router-dom";

const ManageVenue = () => {
  const { id } = useParams();

  const {
    data: venueData,
    isLoading: isVenueDataLoading,
    isError: isVenueDataError,
  } = useGetVenueByIdQuery(id);
  console.log(useGetVenueByIdQuery(id));
  return (
    <>
      <HeroManage
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
    </>
  );
};

export default ManageVenue;
