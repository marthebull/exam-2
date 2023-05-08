import React from "react";
import { useParams } from "react-router-dom";
import { useGetVenueByIdQuery } from "../../state/api/api";
import { InfoContainer } from "../../styles/GlobalStyles";

const VenueInfo = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useGetVenueByIdQuery(id);
  console.log(useGetVenueByIdQuery(id));

  if (isLoading) {
    return <div>loading...</div>;
  }

  if (isError) {
    return <div>Something wrong</div>;
  }
  return (
    <InfoContainer className=" pb-8 my-10 mx-auto w-100 max-w-lg md:mx-0 md:px-8 md:pb-0 lg:pe-14 md:w-1/2">
      <h1 className="h1 mb-1">{data.name}</h1>
      <h2 className="h5 mb-8">
        {data.location.city}, {data.location.country}
      </h2>
      <p className="h3 mb-8">{data.price} NOK / night</p>
      <h3 className="h5 mb-1">Description</h3>
      <p className="p mb-10">{data.description}</p>

      <div className="flex flex-col gap-2 mb-10">
        <div className="flex flex-row gap-3">
          <img
            className="icon"
            src="/images/star-icon.svg"
            alt="Rating star icon"
          ></img>
          <p className="h5">{data.rating}/5</p>
        </div>
        <div className="flex flex-row gap-3">
          <img
            className="icon"
            src="/images/people-icon.svg"
            alt="Guests icon"
          ></img>
          <p className="h5">max {data.maxGuests} guests</p>
        </div>
        <div
          className="flex flex-row gap-3"
          style={{ opacity: data.meta.parking ? 1 : 0.3 }}
        >
          <img
            className="icon"
            src="/images/car-icon.svg"
            alt="Parking icon"
          ></img>
          <p className="h5">parking</p>
        </div>
        <div
          className="flex flex-row gap-3"
          style={{ opacity: data.meta.breakfast ? 1 : 0.3 }}
        >
          <img
            className="icon"
            src="/images/coffe-cup-icon.svg"
            alt="Breakfast icon"
          ></img>
          <p className="h5">breakfast</p>
        </div>
        <div
          className="flex flex-row gap-3"
          style={{ opacity: data.meta.pets ? 1 : 0.3 }}
        >
          <img className="icon" src="/images/paw-icon.svg" alt="Guests"></img>
          <p className="h5">pets allowed</p>
        </div>
        <div
          className="flex flex-row gap-3"
          style={{ opacity: data.meta.wifi ? 1 : 0.3 }}
        >
          <img className="icon" src="/images/wifi-icon.svg" alt="Guests"></img>
          <p className="h5">wifi</p>
        </div>
      </div>
      <h3 className="h5 mb-2">Address</h3>
      <p className="p mb-1">{data.location.address}</p>
      <p className="p  mb-10">
        {data.location.city}, {data.location.country}
      </p>
      <div className="flex flex-row items-center gap-2">
        <div className="h-full">
          <img
            className="icon rounded-full h-8"
            src={
              data.owner.avatar
                ? data.owner.avatar
                : "/images/placeholder-avatar.svg"
            }
            alt={data.owner + "'s profilepicture"}
            style={{ height: "46px", width: "auto" }}
          ></img>
        </div>
        <div>
          <p>owner:</p>
          <p>{data.owner.name}</p>
        </div>
      </div>
    </InfoContainer>
  );
};

export default VenueInfo;
