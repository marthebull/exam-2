import React from "react";
import { Container, InfoContainer } from "../../styles/GlobalStyles";
import CardLoader from "./CardLoader";

const UserOverviewLoader = () => {
  return (
    <Container
      role="status"
      className="flex flex-col justify-center max-w-screen-xl md:py-12 md:flex-row pt-12 animate-pulse"
    >
      <InfoContainer className="flex flex-col pb-12 my-10 gap-8 w-100 max-w-xlg md:mx-0 md:px-8 md:pb-0 lg:pe-14 md:w-1/2">
        <CardLoader />
        <CardLoader />
        <CardLoader />
      </InfoContainer>
      <div className="flex flex-col gap-8 pb-8 my-10 w-100 max-w-xlg md:mx-0 md:px-8 md:pb-0 lg:ps-14 md:w-1/2">
        <CardLoader />
        <CardLoader />
        <CardLoader />
      </div>
    </Container>
  );
};

export default UserOverviewLoader;
