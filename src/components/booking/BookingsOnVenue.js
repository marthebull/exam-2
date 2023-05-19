import React from "react";
import { formatDate } from "../../utils/formatDate";

const BookingsOnVenue = ({ venueData }) => {
  console.log(venueData);

  const sortedBookings = [...venueData.bookings]
    .filter((booking) => new Date(booking.dateFrom) > new Date())
    .sort((a, b) => new Date(a.dateFrom) - new Date(b.dateFrom));

  return (
    <div className="mb-10">
      <h1 className="h1 mb-6">Bookings ({sortedBookings.length})</h1>
      {sortedBookings?.length > 0 ? (
        ""
      ) : (
        <p className="p">There are no bookings for this venue yet</p>
      )}
      {sortedBookings.map((booking) => (
        <div key={booking?.id} className="mb-3">
          <h3>
            {formatDate(booking?.dateFrom)} - {formatDate(booking?.dateTo)}
          </h3>
          <div className="flex flex-row gap-1">
            <img
              className="icon"
              src="/images/people-icon.svg"
              alt="Guests"
            ></img>
            <p>{booking?.guests}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookingsOnVenue;
