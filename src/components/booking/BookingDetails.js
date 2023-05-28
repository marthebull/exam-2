import React from "react";
import { formatDate, getDateDifference } from "../../utils/formatDate";
import MapWithMarker from "./MapWithMarker";

const BookingDetails = ({ bookingData }) => {
  const numberOfDays = getDateDifference(
    bookingData?.dateFrom,
    bookingData?.dateTo
  );

  const total = bookingData?.venue.price * numberOfDays;

  return (
    <>
      <div className="pb-8 my-10 mx-auto w-100 max-w-lg md:mx-0 md:px-8 md:pb-0 lg:ps-14 md:w-1/2">
        <div className="full-w rounded overflow-hidden shadow-md p-4 mb-10">
          <p className="mb-3 text-neutral-400">booking details:</p>
          <h3 className="h3 mb-2">
            {formatDate(bookingData?.dateFrom)} -{" "}
            {formatDate(bookingData?.dateTo)}
          </h3>
          <div className="flex flex-row gap-3">
            <img
              className="icon"
              src="/images/people-icon.svg"
              alt="Guests"
            ></img>
            <p className="a">{bookingData?.guests} x guests</p>
          </div>
          <div className="flex flex-row gap-3">
            <img
              className="icon"
              src="/images/moon-sea-icon.svg"
              alt="Guests"
            ></img>
            <p className="a">
              {getDateDifference(bookingData?.dateFrom, bookingData?.dateTo)} x
              nights
            </p>
          </div>
          <div className="flex flex-row justify-between pt-5">
            <p className="h4">total </p>
            <p className="h4"> {total} NOK</p>
          </div>
        </div>

        {bookingData?.venue.location.city === "Unknown" ? (
          ""
        ) : (
          <>
            <h3 className="h5 mb-2">Address</h3>
            <p className="p mb-1">{bookingData?.venue.location.address}</p>
            <p className="p mb-5">
              {bookingData?.venue.location.city},{" "}
              {bookingData?.venue.location.country}
            </p>
          </>
        )}

        {bookingData?.venue.location.lat !== 0 && (
          <MapWithMarker
            lat={bookingData?.venue.location.lat}
            lng={bookingData?.venue.location.lng}
          />
        )}
      </div>
    </>
  );
};

export default BookingDetails;
