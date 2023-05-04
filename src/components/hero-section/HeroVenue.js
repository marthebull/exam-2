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
        <ImgNoText src={data.media}></ImgNoText>
      </HeroContainer>
    </>
  );
};

export default HeroVenue;
