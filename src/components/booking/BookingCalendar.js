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
      console.log(venueData.bookings);
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
  }, [venueData?.bookings]);

  useEffect(() => {
    if (venueData.bookings.length > 0) {
      // Find the latest booking end date
      const lastBookingEndDate = venueData.bookings.reduce(
        (lastDate, booking) => {
          const bookingEndDate = parseISO(booking.dateTo);
          return bookingEndDate > lastDate ? bookingEndDate : lastDate;
        },
        new Date(0)
      ); // 0 initializes a very early date

      // Iterate from today to the last booking end date to find the earliest available date
      let earliestAvailableDate = new Date();
      while (earliestAvailableDate <= lastBookingEndDate) {
        // Check if the date is booked
        if (
          !disabledDates.find(
            (date) => date.getTime() === earliestAvailableDate.getTime()
          )
        ) {
          break; // Found an available date
        }
        earliestAvailableDate = addDays(earliestAvailableDate, 1);
      }

      setState([
        {
          startDate: earliestAvailableDate,
          endDate: earliestAvailableDate,
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
