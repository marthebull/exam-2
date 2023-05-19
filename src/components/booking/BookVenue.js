import React, { useState } from "react";
import { useSelector } from "react-redux";
import BookingsOnVenue from "./BookingsOnVenue";

import Datepicker from "react-tailwindcss-datepicker";
import {
  AmountInput,
  ButtonOutlineDark,
  ButtonSolidDark,
} from "../../styles/GlobalStyles";
import { Link } from "react-router-dom";

const BookVenue = ({ venueData }) => {
  const name = useSelector((state) => state.persisted.auth.name);
  const isLoggedIn = name !== null;
  console.log(isLoggedIn);

  const [guests, setGuests] = useState(1);

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

  // for date picker
  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });

  const handleValueChange = (newValue) => {
    console.log("newValue:", newValue);
    setValue(newValue);
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
        {/* <div>
          <label className="mb-2 pt-6">check in - check out</label>
          <Datepicker
            useRange={false}
            value={value}
            separator={" to "}
            startWeekOn="mon"
            onChange={handleValueChange}
            popoverDirection="down"
            inputClassName=" w-full mb-6"
            primaryColor={"amber"}
            displayFormat={"DD/MM/YYYY"}
            // disabledDates={[
            //   {
            //     startDate: "2023-05-02",
            //     endDate: "2023-05-05",
            //   },
            //   {
            //     startDate: "2023-05-11",
            //     endDate: "2023-05-12",
            //   },
            // ]}
          />
        </div> */}
        {name !== venueData?.owner.name ? (
          <>
            <div>
              <label className="mb-2 pt-6">check in date</label>
              <input type="date" />
            </div>
            <div className="mb-6">
              <label className="mb-2 pt-6">check out date</label>
              <input type="date" />
            </div>

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
                <p className="h3">total 3444 NOK</p>
                <p className="text-gray-400">x x nights</p>
              </div>
            </div>
          </>
        ) : null}

        {isLoggedIn && name === venueData?.owner.name ? null : isLoggedIn ? (
          <ButtonSolidDark>Book Venue</ButtonSolidDark>
        ) : (
          <ButtonSolidDark>Login to Book</ButtonSolidDark>
        )}
      </div>
    </>
  );
};

export default BookVenue;
