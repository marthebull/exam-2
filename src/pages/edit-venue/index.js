import React from "react";
import { CenterContainer } from "../../styles/GlobalStyles";
import EditVenueForm from "../../components/forms/EditVenue";

const EditVenue = () => {
  return (
    <CenterContainer className="flex flex-col pt-3 lsm:pt-8">
      <small className="white">update venue</small>
      <h1 className="h1 mb-8">Venue Name</h1>
      <EditVenueForm />
    </CenterContainer>
  );
};

export default EditVenue;
