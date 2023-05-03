import React from "react";
import ListVenuesGrid from "../../components/grids/ListVenuesGrid";
import { Container } from "../../styles/GlobalStyles";
import Searchbar from "../../components/search-filter/Searchbar";
import Filters from "../../components/search-filter/Filters";

const Venues = () => {
  return (
    <>
      <Container className="flex flex-col my-6 gap-6">
        <Searchbar />
        <Filters />
        <ListVenuesGrid />
      </Container>
    </>
  );
};

export default Venues;
