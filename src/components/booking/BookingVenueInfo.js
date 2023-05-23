import React from "react";
import { Avatar, InfoContainer } from "../../styles/GlobalStyles";

const BookingVenueInfo = ({
  bookingData,
  isBookingDataLoading,
  isBookingDataError,
}) => {
  if (isBookingDataLoading) {
    return (
      <InfoContainer className=" pb-8 my-10 w-100 md:max-w-lg md:mx-0 md:px-8 md:pb-0 lg:pe-14 md:w-1/2">
        loading...
      </InfoContainer>
    );
  }

  if (isBookingDataError) {
    return <div>Something wrong</div>;
  }
  console.log(bookingData);

  return (
    <InfoContainer className=" pb-8 my-10 w-100 md:max-w-lg md:mx-0 md:px-8 md:pb-0 lg:pe-14 md:w-1/2">
      {/* {data.owner.name === name ? (
    <div className="mb-6">This your own venue:</div>
  ) : (
    ""
  )} */}

      <h1 className="h1 mb-1">{bookingData?.venue.name}</h1>

      {bookingData.venue?.location.city === "Unknown" ? (
        ""
      ) : (
        <h2 className="h5 mb-8">
          {bookingData?.venue.location.city},{" "}
          {bookingData?.venue.location.country}
        </h2>
      )}

      <p className="h3 mb-8">{bookingData?.venue.price} NOK / night</p>
      <h3 className="h5 mb-1">Description</h3>
      <p className="p mb-10">{bookingData?.venue.description}</p>

      <div className="flex flex-col gap-2 mb-10">
        <div className="flex flex-row gap-3">
          <img
            className="icon"
            src="/images/star-icon.svg"
            alt="Rating star icon"
          ></img>
          <p className="h5">{bookingData?.venue.rating}/5</p>
        </div>
        <div className="flex flex-row gap-3">
          <img
            className="icon"
            src="/images/people-icon.svg"
            alt="Guests icon"
          ></img>
          <p className="h5">max {bookingData?.venue.maxGuests} guests</p>
        </div>
        <div
          className="flex flex-row gap-3"
          style={{ opacity: bookingData?.venue.meta.parking ? 1 : 0.3 }}
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
          style={{ opacity: bookingData?.venue.meta.breakfast ? 1 : 0.3 }}
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
          style={{ opacity: bookingData?.venue.meta.pets ? 1 : 0.3 }}
        >
          <img className="icon" src="/images/paw-icon.svg" alt="Guests"></img>
          <p className="h5">pets allowed</p>
        </div>
        <div
          className="flex flex-row gap-3"
          style={{ opacity: bookingData?.venue.meta.wifi ? 1 : 0.3 }}
        >
          <img className="icon" src="/images/wifi-icon.svg" alt="Guests"></img>
          <p className="h5">wifi</p>
        </div>
      </div>
    </InfoContainer>
  );
};

export default BookingVenueInfo;
