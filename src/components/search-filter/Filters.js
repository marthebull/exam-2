import React from "react";
import { FilterWrapper } from "./styles";

const Filters = () => {
  return (
    <>
      <FilterWrapper>
        <img
          src="/images/breakfast.svg"
          alt="Breakfast filter icon"
          className="cursor-pointer"
        ></img>
        <img
          src="/images/parking.svg"
          alt="Parking filter icon"
          className="cursor-pointer"
        ></img>
        <img
          src="/images/pets.svg"
          alt="Pets filter icon"
          className="cursor-pointer"
        ></img>
        <img
          src="/images/wifi.svg"
          alt="Wifi filter icon"
          className="cursor-pointer"
        ></img>
      </FilterWrapper>
    </>
  );
};

export default Filters;
