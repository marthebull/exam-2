import React from "react";
import { Link, useParams } from "react-router-dom";
import { useGetVenueByIdQuery } from "../../state/api/api";
import {
  Avatar,
  ButtonSolidDark,
  InfoContainer,
} from "../../styles/GlobalStyles";
import { useSelector } from "react-redux";

const VenueInfo = () => {
  const { id } = useParams();

  const name = useSelector((state) => state.persisted.auth.name);

  const { data, isLoading, isError } = useGetVenueByIdQuery(id);
  console.log(useGetVenueByIdQuery(id));

  if (isLoading) {
    return (
      <InfoContainer className=" pb-8 my-10 w-100 md:max-w-lg md:mx-0 md:px-8 md:pb-0 lg:pe-14 md:w-1/2">
        loading...
      </InfoContainer>
    );
  }

  if (isError) {
    return <div>Something wrong</div>;
  }
  return (
    <InfoContainer className=" pb-8 my-10 w-100 md:max-w-lg md:mx-0 md:px-8 md:pb-0 lg:pe-14 md:w-1/2">
      {/* {data.owner.name === name ? (
        <div className="mb-6">This your own venue:</div>
      ) : (
        ""
      )} */}

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
      <div className="flex flex-row items-center gap-2 mb-10">
        <div className="h-full">
          <Avatar
            className=" "
            src={
              data.owner.avatar
                ? data.owner.avatar
                : "/images/placeholder-avatar.svg"
            }
            alt={data.owner.name + "'s profilepicture"}
          ></Avatar>
        </div>
        <div>
          <p>owner:</p>
          <p>{data.owner.name}</p>
        </div>
      </div>
      {/* {data.owner.name === name ? (
        <Link to={"/manage-venue/" + data?.id} key={data?.id}>
          <ButtonSolidDark className="opacity-1">edit venue</ButtonSolidDark>
        </Link>
      ) : (
        ""
      )} */}
    </InfoContainer>
  );
};

export default VenueInfo;
