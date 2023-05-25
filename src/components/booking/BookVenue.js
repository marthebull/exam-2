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
import { formatDate, getDateDifference } from "../../utils/formatDate";
import { Link, useNavigate } from "react-router-dom";
import ModalBody from "../modal/ModalBody";

const BookVenue = ({ venueData, venueDataIsLoading }) => {
  const [postBooking] = usePostBookingMutation();

  const name = useSelector((state) => state.persisted.auth.name);
  const accessToken = useSelector((state) => state.persisted.auth.accessToken);
  const isLoggedIn = name !== null;

  const [showModal, setShowModal] = useState(false);
  const [guests, setGuests] = useState(1);
  const [bookingStart, setBookingStart] = useState("");
  const [bookingEnd, setBookingEnd] = useState("");
  const [bookedNights, setBookedNights] = useState(0);
  const [total, setTotal] = useState(0);

  let navigate = useNavigate();

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

  const postBookingBody = {
    dateFrom: new Date(bookingStart),
    // .toISOString()
    dateTo: new Date(bookingEnd),
    // .toISOString()
    guests: guests,
    venueId: venueData.id,
  };

  const handleConfirm = () => {
    setShowModal(!showModal);
    console.log(postBookingBody);
  };

  useEffect(() => {
    setBookedNights(getDateDifference(bookingStart, bookingEnd) + 1);
    setTotal(
      venueData.price * (getDateDifference(bookingStart, bookingEnd) + 1)
    );
  }, [bookingStart, bookingEnd]);

  const handleAddNewBooking = async () => {
    const response = await postBooking(postBookingBody);

    console.log(response);
    if (!response.error) {
      navigate(`/dashboard`);
    }
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

        {accessToken && name === venueData?.owner.name ? (
          ""
        ) : accessToken ? (
          <h1 className="h1">Book venue</h1>
        ) : (
          <h1 className="h1">Availability</h1>
        )}

        {name !== venueData?.owner.name ? (
          <>
            {/* Booking calendar component */}
            <BookingCalendar
              venueData={venueData}
              venueDataIsLoading={venueDataIsLoading}
              setBookingStart={setBookingStart}
              setBookingEnd={setBookingEnd}
            />
            <div className="flex flex-row mb-10">
              <div className="me-5 flex flex-row gap-2 items-center">
                <div className="legend legend-available"> </div>
                <p>available</p>
              </div>
              <div className="me-5 flex flex-row gap-2 items-center">
                <div className="legend legend-unavailable "> </div>
                <p>unavailable</p>
              </div>
              <div className=" flex flex-row gap-2 items-center">
                <div className="legend legend-selected "> </div>
                <p>selected</p>
              </div>
            </div>
          </>
        ) : null}
        {accessToken && name === venueData?.owner.name ? null : accessToken ? (
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

        {accessToken && name === venueData?.owner.name ? null : accessToken ? (
          <ButtonSolidDark showModal={showModal} onClick={handleConfirm}>
            book venue
          </ButtonSolidDark>
        ) : (
          <Link to="/sign-in" className="link pt-6">
            <ButtonSolidDark>sign in to book </ButtonSolidDark>
          </Link>
        )}
      </div>
      {/* Booking confirmation modal */}
      <ModalBody
        showModal={showModal}
        setShowModal={setShowModal}
        className="items-center"
      >
        <small className="text-center block">confirm booking for</small>
        <h1 className="h3 text-center mb-10">{venueData?.name}</h1>
        <div
          className="relative w-full h-[200px] overflow-hidden bg-no-repeat md:w-[400px] md:h-[200px] mb-10"
          style={{
            backgroundImage:
              venueData?.media.length > 0
                ? `url(${venueData?.media[0]})`
                : `url(/images/placeholder-image.svg)`,
            backgroundPosition: `center`,
            backgroundSize: `cover`,
          }}
        ></div>
        {/* <img
          src={
            venueData?.media.length > 0
              ? venueData?.media[0]
              : `/images/placeholder-image.svg`
          }
          alt={venueData?.name}
          className="mb-10 w-[400px] h-[300] object-cover "
        ></img> */}
        <h3 className="h3 mb-2">
          {formatDate(postBookingBody?.dateFrom)} -{" "}
          {formatDate(postBookingBody?.dateTo)}
        </h3>

        <div className="flex flex-row gap-3">
          <img
            className="icon"
            src="/images/people-icon.svg"
            alt="Guests"
          ></img>
          <p className="a">{postBookingBody?.guests} x guests</p>
        </div>
        <div className="flex flex-row gap-3">
          <img
            className="icon"
            src="/images/moon-sea-icon.svg"
            alt="Guests"
          ></img>
          <p className="a">
            {getDateDifference(
              postBookingBody?.dateFrom,
              postBookingBody?.dateTo
            )}{" "}
            x nights
          </p>
        </div>
        <div className="flex flex-row justify-between pt-5">
          <p className="h4">total </p>
          <p className="h4 mb-10"> {total} NOK</p>
        </div>

        <ButtonSolidDark
          showModal={showModal}
          disabled={venueDataIsLoading}
          onClick={handleAddNewBooking}
        >
          {venueDataIsLoading ? "booking..." : "confirm"}
        </ButtonSolidDark>
      </ModalBody>
    </>
  );
};

export default BookVenue;
