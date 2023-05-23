import React from "react";
import { Link } from "react-router-dom";
import { ButtonOutlineWhite } from "../../../styles/GlobalStyles";

const VenueCards = ({ user }) => {
  return (
    <>
      {user.venues.map((venue) => (
        <div key={venue?.id}>
          <div className="w-full rounded overflow-hidden shadow-md ">
            <div
              className="relative overflow-hidden bg-no-repeat h-80"
              style={{
                backgroundImage:
                  venue.media.length > 0
                    ? `url(${venue?.media[0]})`
                    : `url(/images/placeholder-image.svg)`,
                backgroundPosition: `center`,
                backgroundSize: `cover`,
              }}
            >
              <div className="flex flex-col justify-center align-middle absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-dark bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100">
                <Link to={"/manage-venue/" + venue?.id} key={venue?.id}>
                  <ButtonOutlineWhite className="opacity-1">
                    manage venue
                  </ButtonOutlineWhite>
                </Link>
              </div>
            </div>

            <div className="px-3 py-4">
              <h4 className="mb-2 h3">{venue?.name}</h4>

              <div className="flex flex-row gap-3">
                <img
                  className="ms-1 me-3"
                  src="/images/pin-icon.svg"
                  alt="Night icon"
                ></img>
                <p className="a">
                  {venue.location?.city}, {venue.location?.country}
                </p>
              </div>

              <div className="flex flex-row gap-3">
                <img
                  className="icon"
                  src="/images/moon-sea-icon.svg"
                  alt="Night icon"
                ></img>
                <p className="a">{venue?.price} NOK</p>
              </div>

              <div className="flex flex-row gap-3">
                <img
                  className="icon"
                  src="/images/people-icon.svg"
                  alt="Guests"
                ></img>
                <p className="a">max {venue?.maxGuests} guests</p>
              </div>

              <div className="flex flex-row md:pt-8 lg:pt-1 justify-end">
                <div className="flex flex-row gap-4 content-center">
                  <img
                    className="icon-row opacity-50 my-auto"
                    style={{ opacity: venue.meta?.breakfast ? 1 : 0.3 }}
                    src="/images/coffe-cup-icon.svg"
                    alt="Guests"
                  ></img>
                  <img
                    className="icon-row opacity-50 my-auto"
                    style={{ opacity: venue?.meta.parking ? 1 : 0.3 }}
                    src="/images/car-icon.svg"
                    alt="Guests"
                  ></img>
                  <img
                    className="icon-row opacity-50 my-auto"
                    style={{ opacity: venue?.meta.pets ? 1 : 0.3 }}
                    src="/images/paw-icon.svg"
                    alt="Guests"
                  ></img>
                  <img
                    className="icon-row my-auto"
                    style={{ opacity: venue.meta.wifi ? 1 : 0.3 }}
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

export default VenueCards;
