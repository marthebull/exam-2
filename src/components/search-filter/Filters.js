import React, { useState } from "react";
import { FilterWrapper } from "./styles";

const Filters = () => {
  const [criteria, setCriteria] = useState({
    parking: false,
    breakfast: false,
    wifi: false,
    pets: false,
  });

  function handleCriteriaChange(name) {
    setCriteria((prevCriteria) => ({
      ...prevCriteria,
      [name]: !prevCriteria[name],
    }));
  }

  return (
    <>
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
    </>
  );
};

export default Filters;
