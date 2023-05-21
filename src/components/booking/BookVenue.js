import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BookingsOnVenue from "./BookingsOnVenue";
import { usePostBookingMutation } from "../../state/api/api";
import {
  AmountInput,
  ButtonOutlineDark,
  ButtonSolidDark,
} from "../../styles/GlobalStyles";
import BookingCalendar from "./BookingCalendar";
import { getDateDifference } from "../../utils/formatDate";

const BookVenue = ({ venueData, venueDataIsLoading }) => {
  const [postBooking] = usePostBookingMutation();

  const name = useSelector((state) => state.persisted.auth.name);
  const isLoggedIn = name !== null;

  const [guests, setGuests] = useState(1);
  const [bookingStart, setBookingStart] = useState("");
  const [bookingEnd, setBookingEnd] = useState("");
  const [bookedNights, setBookedNights] = useState(0);
  const [total, setTotal] = useState(0);

  const handleDecrease = () => {
    if (guests > 1) {
      setGuests(guests - 1);
    }
  };

  const handleIncrease = () => {
    if (guests < venueData?.maxGuests) {
      setGuests(guests + 1);
    }
  };

  const handleInputChange = (event) => {
    const guestsAmount = parseInt(event.target.value);
    if (!isNaN(guestsAmount) && guestsAmount >= 1) {
      setGuests(guestsAmount);
    }
  };

  useEffect(() => {
    setBookedNights(getDateDifference(bookingStart, bookingEnd) + 1);
    setTotal(
      venueData.price * (getDateDifference(bookingStart, bookingEnd) + 1)
    );
  }, [bookingStart, bookingEnd]);

  const handleAddNewBooking = async () => {
    alert(bookingStart);

    //
    const postBookingBody = {
      dateFrom: new Date(bookingStart).toISOString(),
      dateTo: new Date(bookingEnd).toISOString(),
      guests: guests,
      venueId: venueData.id,
    };

    const response = await postBooking(postBookingBody);
    console.log(response);
  };

  return (
    <>
      <div className="pb-8 my-10 mx-auto w-full max-w-lg md:mx-0 md:px-8 md:pb-0 lg:ps-14 md:w-1/2">
        {venueData?.owner.name === name ? (
          <BookingsOnVenue venueData={venueData} />
        ) : (
          ""
        )}
        {venueData?.owner.name === name ? (
          ""
        ) : (
          <h1 className="h1">Book this venue</h1>
        )}

        {/* Booking calendar component */}
        <BookingCalendar
          venueData={venueData}
          venueDataIsLoading={venueDataIsLoading}
          setBookingStart={setBookingStart}
          setBookingEnd={setBookingEnd}
        />
        {name !== venueData?.owner.name ? (
          <>
            <div>
              <p className="h5">guests (max {venueData?.maxGuests})</p>
              <div className="flex flex-row overflow-hidden items-center w-full gap-2">
                <ButtonOutlineDark className="w-100" onClick={handleDecrease}>
                  -
                </ButtonOutlineDark>
                <AmountInput
                  type="number"
                  value={guests}
                  onChange={handleInputChange}
                  className="text-center w-5"
                />
                <ButtonOutlineDark className="w-100" onClick={handleIncrease}>
                  +
                </ButtonOutlineDark>
              </div>
              <div className="text-center pt-8 pb-5">
                <p className="h3">total {total} NOK</p>
                <p className="text-gray-400">{bookedNights} days</p>
              </div>
            </div>
          </>
        ) : null}

        {isLoggedIn && name === venueData?.owner.name ? null : isLoggedIn ? (
          <ButtonSolidDark onClick={handleAddNewBooking}>
            Book Venue
          </ButtonSolidDark>
        ) : (
          <ButtonSolidDark>Login to Book</ButtonSolidDark>
        )}
      </div>
    </>
  );
};

export default BookVenue;
