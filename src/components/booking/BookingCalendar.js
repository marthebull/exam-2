import { useState, useEffect } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import {
  parseISO,
  eachDayOfInterval,
  isWithinInterval,
  addDays,
} from "date-fns";

const BookingCalendar = ({ venueData, setBookingStart, setBookingEnd }) => {
  console.log(
    "🚀 ~ file: BookingCalendar.js:13 ~ BookingCalendar ~ venueData:",
    venueData
  );
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [disabledDates, setDisabledDates] = useState([]);
  const [invalidRange, setInvalidRange] = useState(false);

  useEffect(() => {
    if (venueData.bookings) {
      let bookedDates = [];

      venueData.bookings.forEach((booking) => {
        let range = eachDayOfInterval({
          start: parseISO(booking.dateFrom),
          end: parseISO(booking.dateTo),
        });
        bookedDates = [...bookedDates, ...range];
      });

      setDisabledDates(bookedDates);
    }
  }, []);

  useEffect(() => {
    if (venueData.bookings.length > 0) {
      const lastBooking = venueData.bookings[venueData.bookings.length - 1];
      const nextAvailableDate = addDays(parseISO(lastBooking.dateTo), 1);

      setState([
        {
          startDate: nextAvailableDate,
          endDate: nextAvailableDate,
          key: "selection",
        },
      ]);
    }
  }, [venueData.bookings]);

  useEffect(() => {
    setSelectedDates();
  }, [state]);

  const handleSelect = (item) => {
    const inRange = disabledDates.find((date) =>
      isWithinInterval(date, {
        start: item.selection.startDate,
        end: item.selection.endDate,
      })
    );

    if (!inRange) {
      setState([item.selection]);
      setInvalidRange(false);
    } else {
      setInvalidRange(true);
    }
  };

  function setSelectedDates() {
    if (state[0].startDate && state[0].endDate) {
      setBookingStart(state[0].startDate);
      setBookingEnd(state[0].endDate);
    } else if (state[0].startDate) {
      setBookingStart(state[0].startDate);
      setBookingEnd(state[0].startDate);
    } else {
      console.log("No dates selected");
    }
  }

  return (
    <div id="calendar">
      {invalidRange && (
        <p style={{ color: "red" }}>
          Invalid selection. Please select an available date range.
        </p>
      )}
      <DateRange
        ranges={state}
        onChange={handleSelect}
        disabledDates={disabledDates}
        showSelectionPreview={false}
        showMonthAndYearPickers={true}
        weekStartsOn={1} // Start week on Monday
        editableDateInputs={false} // Hide date input fields
        minDate={new Date()}
      />
    </div>
  );
};

export default BookingCalendar;
