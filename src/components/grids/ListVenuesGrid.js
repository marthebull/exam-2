import { useState } from "react";
import { useGetVenuesQuery } from "../../state/api/api";
import { FilterWrapper } from "../search-filter/styles";

const ListVenuesGrid = () => {
  const { data: list, isLoading } = useGetVenuesQuery();
  console.log(useGetVenuesQuery());
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

  const filteredList = list?.filter((item) => {
    if (criteria.parking && !item.meta.parking) return false;
    if (criteria.breakfast && !item.meta.breakfast) return false;
    if (criteria.wifi && !item.meta.wifi) return false;
    if (criteria.pets && !item.meta.pets) return false;
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      if (
        !item.name?.toLowerCase().includes(searchLower) &&
        !item.owner.name?.toLowerCase().includes(searchLower) &&
        !item.location.city?.toLowerCase().includes(searchLower) &&
        !item.location.country?.toLowerCase().includes(searchLower)
      )
        return false;
    }
    return true;
  });

  if (isLoading) {
    return <div>Loading...</div>;
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
          style={{ cursor: "pointer", opacity: criteria.breakfast ? 1 : 0.5 }}
          onClick={() => handleCriteriaChange("breakfast")}
        ></img>
        <img
          src="/images/parking.svg"
          alt="Parking filter icon"
          style={{ cursor: "pointer", opacity: criteria.parking ? 1 : 0.5 }}
          onClick={() => handleCriteriaChange("parking")}
        ></img>
        <img
          src="/images/pets.svg"
          alt="Pets filter icon"
          style={{ cursor: "pointer", opacity: criteria.pets ? 1 : 0.5 }}
          onClick={() => handleCriteriaChange("pets")}
        ></img>
        <img
          src="/images/wifi.svg"
          alt="Wifi filter icon"
          style={{ cursor: "pointer", opacity: criteria.wifi ? 1 : 0.5 }}
          onClick={() => handleCriteriaChange("wifi")}
        ></img>
      </FilterWrapper>

      <ul>
        {filteredList?.map((item) => (
          <li key={item.id}>
            {item.name} - {item.location.city}, {item.location.country} -
            Parking: {item.meta.parking ? "Yes" : "No"}, Breakfast:{" "}
            {item.meta.breakfast ? "Yes" : "No"}, Wifi:{" "}
            {item.meta.wifi ? "Yes" : "No"}, Pets:{" "}
            {item.meta.pets ? "Yes" : "No"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListVenuesGrid;
