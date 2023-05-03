import React from "react";
import { Container } from "../../styles/GlobalStyles";
import Searchbar from "../../components/search-filter/Searchbar";
import Filters from "../../components/search-filter/Filters";
import ListCards from "../../components/cards/list";

const Venues = () => {
  return (
    <>
      <Container className="flex flex-col my-6 gap-6">
        <Searchbar />
        <Filters />
        <ListCards />
      </Container>
    </>
  );
};

export default Venues;
