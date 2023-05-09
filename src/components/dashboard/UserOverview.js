import React from "react";
import { Container, InfoContainer } from "../../styles/GlobalStyles";
import NoBookingsYet from "./NoBookingsYet";
import NoVenuesYet from "./NoVenuesYet";
import { useGetProfileByNameQuery } from "../../state/api/api";
import VenueCards from "../cards/dashboard/VenueCard";
import Modal from "../modal/Modal";

const UserOverview = ({ username }) => {
  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useGetProfileByNameQuery(username);
  console.log(user);

  return (
    <Container className="flex flex-col justify-center md:py-12 md:flex-row">
      <InfoContainer className=" pb-12 my-10  w-100 max-w-xlg md:mx-0 md:px-8 md:pb-0 lg:pe-14 md:w-1/2">
        <NoBookingsYet />
        <Modal />
      </InfoContainer>
      <div className="flex flex-col gap-8 pb-8 my-10 w-100 max-w-xlg md:mx-0 md:px-8 md:pb-0 lg:ps-14 md:w-1/2">
        {user?.venues.length > 0 ? (
          <h2 className="h2">Your venues ({user?.venues.length})</h2>
        ) : (
          ""
        )}
        {user?.venues.length > 0 ? (
          <VenueCards user={user} />
        ) : (
          <NoVenuesYet user={user} />
        )}
      </div>
    </Container>
  );
};

export default UserOverview;
