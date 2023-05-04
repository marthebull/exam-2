import React from "react";
import { Container } from "../../styles/GlobalStyles";
import ListVenuesGrid from "../../components/cards/list";

const Venues = () => {
  return (
    <>
      <Container className="flex flex-col my-6 gap-6">
        <ListVenuesGrid />
      </Container>
    </>
  );
};

export default Venues;
