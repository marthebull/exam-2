import React from "react";
import HeroManage from "../../components/hero-section/HeroManage";
import { Container } from "../../styles/GlobalStyles";
import VenueInfo from "../../components/venueInfo";
import BookVenue from "../../components/booking/BookVenue";
import { useParams } from "react-router-dom";
import { useGetBookingByIdQuery } from "../../state/api/api";
import HeroManageBooking from "../../components/hero-section/HeroManageBooking";
import BookingVenueInfo from "../../components/booking/BookingVenueInfo";
import BookingDetails from "../../components/booking/BookingDetails";

const ManageBooking = () => {
  const { id } = useParams();

  const {
    data: bookingData,
    isLoading: isBookingDataLoading,
    isError: isBookingDataError,
  } = useGetBookingByIdQuery(id);

  console.log(bookingData);
  return (
    <>
      <HeroManageBooking
        bookingData={bookingData}
        isBookingDataLoading={isBookingDataLoading}
        isBookingDataError={isBookingDataError}
        id={id}
      />
      <Container className="flex flex-col justify-center md:flex-row">
        <BookingVenueInfo
          bookingData={bookingData}
          isBookingDataLoading={isBookingDataLoading}
          isBookingDataError={isBookingDataError}
          id={id}
        />
        <BookingDetails
          bookingData={bookingData}
          isBookingDataLoading={isBookingDataLoading}
          isBookingDataError={isBookingDataError}
          id={id}
        />
      </Container>
    </>
  );
};

export default ManageBooking;
