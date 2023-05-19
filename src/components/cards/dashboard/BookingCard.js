import React from "react";
import { Link } from "react-router-dom";
import { ButtonOutlineWhite } from "../../../styles/GlobalStyles";
import { formatDate } from "../../../utils/formatDate";

const BookingCard = ({ user }) => {
  const sortedBookings = [...user.bookings].sort((a, b) => {
    const dateA = new Date(a.dateFrom);
    const dateB = new Date(b.dateFrom);
    return dateA - dateB;
  });

  return (
    <>
      {sortedBookings.map((booking) => (
        <div key={booking?.id}>
          <div className="w-full rounded overflow-hidden shadow-md ">
            <div
              className="relative overflow-hidden bg-no-repeat h-80"
              style={{
                backgroundImage:
                  booking.venue.media?.length > 0
                    ? `url(${booking.venue?.media[0]})`
                    : `url(/images/placeholder-image.svg)`,
                backgroundPosition: `center`,
                backgroundSize: `cover`,
              }}
            >
              <div className="flex flex-col justify-center align-middle absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-dark bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100">
                <Link to={"/manage-booking/" + booking?.id}>
                  <ButtonOutlineWhite className="opacity-1">
                    view booking
                  </ButtonOutlineWhite>
                </Link>
              </div>
            </div>
            <div className="px-3 py-4">
              <h3 className="h3 mb-2">
                {formatDate(booking?.dateFrom)} - {formatDate(booking?.dateTo)}
              </h3>

              <div className="flex flex-row gap-3">
                <img
                  className="ms-1 me-3"
                  src="/images/pin-icon.svg"
                  alt="Night icon"
                ></img>
                <p className="a">
                  {booking.venue.location?.city},{" "}
                  {booking.venue.location?.country}
                </p>
              </div>

              <div className="flex flex-row gap-3">
                <img
                  className="icon"
                  src="/images/moon-sea-icon.svg"
                  alt="Night icon"
                ></img>
                <p className="a">{booking.venue?.price} NOK</p>
              </div>

              <div className="flex flex-row gap-3">
                <img
                  className="icon"
                  src="/images/people-icon.svg"
                  alt="Guests"
                ></img>
                <p className="a">max {booking.venue?.maxGuests} guests</p>
              </div>

              <div className="flex flex-row md:pt-8 lg:pt-1 justify-end">
                <div className="flex flex-row gap-4 content-center">
                  <img
                    className="icon-row opacity-50 my-auto"
                    style={{ opacity: booking.meta?.breakfast ? 1 : 0.3 }}
                    src="/images/coffe-cup-icon.svg"
                    alt="Guests"
                  ></img>
                  <img
                    className="icon-row opacity-50 my-auto"
                    style={{ opacity: booking.meta?.parking ? 1 : 0.3 }}
                    src="/images/car-icon.svg"
                    alt="Guests"
                  ></img>
                  <img
                    className="icon-row opacity-50 my-auto"
                    style={{ opacity: booking.meta?.pets ? 1 : 0.3 }}
                    src="/images/paw-icon.svg"
                    alt="Guests"
                  ></img>
                  <img
                    className="icon-row my-auto"
                    style={{ opacity: booking.meta?.wifi ? 1 : 0.3 }}
                    src="/images/wifi-icon.svg"
                    alt="Guests"
                  ></img>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default BookingCard;
