import React from "react";
import { Container, InfoContainer } from "../../styles/GlobalStyles";
import NoBookingsYet from "./NoBookingsYet";
import NoVenuesYet from "./NoVenuesYet";

const UserOverview = () => {
  return (
    <Container className="flex flex-col justify-center py-20 md:flex-row">
      <InfoContainer className=" pb-8 my-10 mx-auto w-100 max-w-xlg md:mx-0 md:px-8 md:pb-0 lg:pe-14 md:w-1/2">
        <NoBookingsYet />
      </InfoContainer>
      <div className=" pb-8 my-10 mx-auto w-100 max-w-xlg md:mx-0 md:px-8 md:pb-0 lg:ps-14 md:w-1/2">
        <NoVenuesYet />
      </div>
    </Container>
  );
};

export default UserOverview;
