import React from "react";
import { HeroContainer, ImgNoText } from "./styles";
import { useGetVenueByIdQuery } from "../../state/api/api";
import { useParams } from "react-router-dom";

const HeroVenue = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useGetVenueByIdQuery(id);
  console.log(useGetVenueByIdQuery(id));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something wrong</div>;
  }

  return (
    <>
      <HeroContainer className="relative">
        <ImgNoText src="https://images.unsplash.com/photo-1414510451013-d0a41fea512e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"></ImgNoText>
      </HeroContainer>
    </>
  );
};

export default HeroVenue;
