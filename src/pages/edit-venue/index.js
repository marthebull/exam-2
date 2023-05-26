import React from "react";
import { CenterContainer } from "../../styles/GlobalStyles";
import EditVenueForm from "../../components/forms/EditVenueForm";
import { useParams } from "react-router-dom";
import { useGetVenueByIdQuery } from "../../state/api/api";
import HeroSpinner from "../../components/loaders/HeroSpinner";

const EditVenue = ({ venueData }) => {
  const { id } = useParams();

  const {
    data: currentVenueData,
    isLoading: isCurrentVenueDataLoading,
    isError: isCurrentVenueDataError,
  } = useGetVenueByIdQuery(id);

  if (isCurrentVenueDataLoading) {
    return <HeroSpinner />;
  }

  if (isCurrentVenueDataError) {
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
    <CenterContainer className="flex flex-col pt-3 lsm:pt-8">
      <small className="">update venue</small>
      <h1 className="h1 mb-8">Venue Name</h1>
      <EditVenueForm currentVenueData={currentVenueData} id={id} />
    </CenterContainer>
  );
};

export default EditVenue;
