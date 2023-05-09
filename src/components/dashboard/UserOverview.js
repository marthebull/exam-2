import React from "react";
import { Container, InfoContainer } from "../../styles/GlobalStyles";
import NoBookingsYet from "./NoBookingsYet";
import NoVenuesYet from "./NoVenuesYet";
import { useGetProfileByNameQuery } from "../../state/api/api";
import VenueCards from "../cards/dashboard/VenueCard";

const UserOverview = ({ username }) => {
  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useGetProfileByNameQuery(username);
  console.log(user);

  return (
    <Container className="flex flex-col justify-center py-20 md:flex-row">
      <InfoContainer className=" pb-8 my-10 mx-auto w-100 max-w-xlg md:mx-0 md:px-8 md:pb-0 lg:pe-14 md:w-1/2">
        <NoBookingsYet />
      </InfoContainer>
      <div className="flex flex-col gap-12 pb-8 my-10 mx-auto w-100 max-w-xlg md:mx-0 md:px-8 md:pb-0 lg:ps-14 md:w-1/2">
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
