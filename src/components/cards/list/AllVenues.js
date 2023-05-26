import { useState } from "react";
import { useGetVenuesQuery } from "../../../state/api/api";
import { FilterWrapper } from "./styles";
import { Link } from "react-router-dom";
import { ButtonOutlineWhite } from "../../../styles/GlobalStyles";
import CardLoader from "../../loaders/CardLoader";

const ListAllVenues = () => {
  const { data: list, isLoading, isError } = useGetVenuesQuery();
  console.log(list);
  const [criteria, setCriteria] = useState({
    parking: false,
    breakfast: false,
    wifi: false,
    pets: false,
  });

  const [searchQuery, setSearchQuery] = useState("");

  function handleCriteriaChange(name) {
    setCriteria((prevCriteria) => ({
      ...prevCriteria,
      [name]: !prevCriteria[name],
    }));
  }

  const filteredList = list?.filter((venues) => {
    if (criteria.parking && !venues.meta.parking) return false;
    if (criteria.breakfast && !venues.meta.breakfast) return false;
    if (criteria.wifi && !venues.meta.wifi) return false;
    if (criteria.pets && !venues.meta.pets) return false;
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      if (
        !venues?.name?.toLowerCase().includes(searchLower) &&
        !venues?.owner.name?.toLowerCase().includes(searchLower) &&
        !venues?.location.city?.toLowerCase().includes(searchLower) &&
        !venues?.location.country?.toLowerCase().includes(searchLower)
      )
        return false;
    }
    return true;
  });

  if (isLoading) {
    return (
      <div>
        <input
          type="text"
          placeholder="search for country, city, host etc..."
          className="mx-auto mb-1"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        ></input>
        <FilterWrapper>
          <img
            src="/images/breakfast.svg"
            alt="Breakfast filter icon"
            className="medium-icon"
            style={{ cursor: "pointer", opacity: 0.5 }}
          ></img>
          <img
            src="/images/parking.svg"
            alt="Parking filter icon"
            className="medium-icon"
            style={{ cursor: "pointer", opacity: 0.5 }}
          ></img>
          <img
            src="/images/pets.svg"
            alt="Pets filter icon"
            className="medium-icon"
            style={{ cursor: "pointer", opacity: 0.5 }}
          ></img>
          <img
            src="/images/wifi.svg"
            alt="Wifi filter icon"
            className="medium-icon"
            style={{ cursor: "pointer", opacity: 0.5 }}
          ></img>
        </FilterWrapper>
        <div className="w-100 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-6">
          <CardLoader />
          <CardLoader />
          <CardLoader />
        </div>
      </div>
    );
  }

  if (isError) {
    return <div>Something wrong!</div>;
  }

  return (
    <div>
      <input
        type="text"
        placeholder="search for country, city, host etc..."
        className="mx-auto mb-1"
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
      ></input>
      <FilterWrapper>
        <img
          src="/images/breakfast.svg"
          alt="Breakfast filter icon"
          className="medium-icon"
          style={{ cursor: "pointer", opacity: criteria.breakfast ? 1 : 0.5 }}
          onClick={() => handleCriteriaChange("breakfast")}
        ></img>
        <img
          src="/images/parking.svg"
          alt="Parking filter icon"
          className="medium-icon"
          style={{ cursor: "pointer", opacity: criteria.parking ? 1 : 0.5 }}
          onClick={() => handleCriteriaChange("parking")}
        ></img>
        <img
          src="/images/pets.svg"
          alt="Pets filter icon"
          className="medium-icon"
          style={{ cursor: "pointer", opacity: criteria.pets ? 1 : 0.5 }}
          onClick={() => handleCriteriaChange("pets")}
        ></img>
        <img
          src="/images/wifi.svg"
          alt="Wifi filter icon"
          className="medium-icon"
          style={{ cursor: "pointer", opacity: criteria.wifi ? 1 : 0.5 }}
          onClick={() => handleCriteriaChange("wifi")}
        ></img>
      </FilterWrapper>

      <div className="w-100 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-6">
        {filteredList?.map((venue) => (
          <Link to={venue.id} key={venue.id}>
            <div className="full-w rounded overflow-hidden shadow-md h-full">
              <div
                className="relative overflow-hidden bg-no-repeat h-80"
                style={{
                  backgroundImage:
                    venue?.media.length > 0
                      ? `url(${venue?.media[0]})`
                      : `url(/images/placeholder-image.svg)`,
                  backgroundPosition: `center`,
                  backgroundSize: `cover`,
                }}
              >
                <div className="flex flex-col justify-center align-middle absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-dark bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100">
                  <ButtonOutlineWhite className="opacity-1">
                    view venue
                  </ButtonOutlineWhite>
                </div>
              </div>
              <div className="px-3 py-4">
                <h3 className="mb-2 h3">{venue.name}</h3>

                <div className="flex flex-row gap-3">
                  <img
                    className="icon"
                    src="/images/moon-sea-icon.svg"
                    alt="Night icon"
                  ></img>
                  <p>{venue.price} NOK</p>
                </div>

                <div className="flex flex-row justify-between">
                  <div className="flex flex-row gap-3">
                    <img
                      className="icon"
                      src="/images/people-icon.svg"
                      alt="Guests"
                    ></img>
                    <p>{venue.maxGuests}</p>
                  </div>

                  <div className="flex flex-row gap-4 content-center">
                    <img
                      className="icon-row opacity-50 my-auto"
                      style={{ opacity: venue.meta.breakfast ? 1 : 0.3 }}
                      src="/images/coffe-cup-icon.svg"
                      alt="Guests"
                    ></img>
                    <img
                      className="icon-row opacity-50 my-auto"
                      style={{ opacity: venue.meta.parking ? 1 : 0.3 }}
                      src="/images/car-icon.svg"
                      alt="Guests"
                    ></img>
                    <img
                      className="icon-row opacity-50 my-auto"
                      style={{ opacity: venue.meta.pets ? 1 : 0.3 }}
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
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ListAllVenues;
