import React from "react";
import { CenterContainer } from "../../styles/GlobalStyles";
import NewVenueForm from "../../components/forms/NewVenue";

const CreateNewVenue = () => {
  return (
    <CenterContainer className="flex flex-col">
      <h1 className="h1 mb-8">create new venue</h1>
      <NewVenueForm />
    </CenterContainer>
  );
};

export default CreateNewVenue;
