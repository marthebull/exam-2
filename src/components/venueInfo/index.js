import React from "react";
import { Link, useParams } from "react-router-dom";
import { useGetVenueByIdQuery } from "../../state/api/api";
import { Avatar, InfoContainer } from "../../styles/GlobalStyles";
import { useSelector } from "react-redux";
import MapWithMarker from "../booking/MapWithMarker";
import HeroSpinner from "../loaders/HeroSpinner";

const VenueInfo = ({ venueData, isVenueDataLoading, isVenueDataError }) => {
  console.log("🚀 ~ file: index.js:10 ~ VenueInfo ~ venueData:", venueData);

  if (isVenueDataLoading) {
    return (
      // <InfoContainer className=" pb-8 my-10 w-100 md:max-w-lg md:mx-0 md:px-8 md:pb-0 lg:pe-14 md:w-1/2">
      //   loading...
      // </InfoContainer>
      <HeroSpinner />
    );
  }

  if (isVenueDataError) {
    return <div>Something wrong</div>;
  }
  return (
    <InfoContainer className=" pb-8 my-10 w-100 md:max-w-lg md:mx-0 md:px-8 md:pb-0 lg:pe-14 md:w-1/2">
      {/* {data.owner.name === name ? (
        <div className="mb-6">This your own venue:</div>
      ) : (
        ""
      )} */}

      <h1 className="h1 mb-1">{venueData.name}</h1>
      {venueData.location.city === "Unknown" ? (
        ""
      ) : (
        <h2 className="h5 mb-8">
          {venueData.location.city}, {venueData.location.country}
        </h2>
      )}

      {/* <h2 className="h5 mb-8">
        {venueData.location.city}, {venueData.location.country}
      </h2> */}
      <p className="h3 mb-8">{venueData.price} NOK / night</p>
      <h3 className="h5 mb-1">Description</h3>
      <p className="p mb-10">{venueData.description}</p>

      <div className="flex flex-col gap-2 mb-10">
        <div className="flex flex-row gap-3">
          <img
            className="icon"
            src="/images/star-icon.svg"
            alt="Rating star icon"
          ></img>
          <p className="h5">{venueData.rating}/5</p>
        </div>
        <div className="flex flex-row gap-3">
          <img
            className="icon"
            src="/images/people-icon.svg"
            alt="Guests icon"
          ></img>
          <p className="h5">max {venueData.maxGuests} guests</p>
        </div>
        <div
          className="flex flex-row gap-3"
          style={{ opacity: venueData.meta.parking ? 1 : 0.3 }}
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
          style={{ opacity: venueData.meta.breakfast ? 1 : 0.3 }}
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
          style={{ opacity: venueData.meta.pets ? 1 : 0.3 }}
        >
          <img className="icon" src="/images/paw-icon.svg" alt="Guests"></img>
          <p className="h5">pets allowed</p>
        </div>
        <div
          className="flex flex-row gap-3"
          style={{ opacity: venueData.meta.wifi ? 1 : 0.3 }}
        >
          <img className="icon" src="/images/wifi-icon.svg" alt="Guests"></img>
          <p className="h5">wifi</p>
        </div>
      </div>
      <div className="flex flex-row items-center gap-2 mb-10">
        <div className="h-full">
          <Avatar
            className=" "
            src={
              venueData.owner.avatar
                ? venueData.owner.avatar
                : "/images/placeholder-avatar.svg"
            }
            alt={venueData.owner.name + "'s profilepicture"}
          ></Avatar>
        </div>
        <div>
          <p>owner:</p>
          <p>{venueData.owner.name}</p>
        </div>
      </div>
      {venueData.location.city === "Unknown" ? (
        ""
      ) : (
        <>
          <h3 className="h5 mb-2">Address</h3>
          <p className="p mb-1">{venueData.location.address}</p>
          <p className="p  mb-10">
            {venueData.location.city}, {venueData.location.country}
          </p>
        </>
      )}

      {venueData?.location.lat !== 0 && (
        <MapWithMarker
          lat={venueData?.location.lat}
          lng={venueData?.location.lng}
        />
      )}
    </InfoContainer>
  );
};

export default VenueInfo;
