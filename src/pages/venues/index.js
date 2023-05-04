import React from "react";
import { Container } from "../../styles/GlobalStyles";
import ListAllVenues from "../../components/cards/list/AllVenues";

const Venues = () => {
  return (
    <>
      <Container className="flex flex-col my-6 gap-6">
        <ListAllVenues />
      </Container>
    </>
  );
};

export default Venues;
