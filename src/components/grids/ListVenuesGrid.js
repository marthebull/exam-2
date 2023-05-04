import { useState } from "react";
import { useGetVenuesQuery } from "../../state/api/api";

const ListVenuesGrid = () => {
  const { data: list, isLoading } = useGetVenuesQuery();
  console.log(useGetVenuesQuery());
  const [criteria, setCriteria] = useState({
    parking: false,
    breakfast: false,
    wifi: false,
    petsAllowed: false,
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
    if (criteria.petsAllowed && !item.meta.petsAllowed) return false;
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      if (
        !item.name.toLowerCase().includes(searchLower) &&
        !item.city.toLowerCase().includes(searchLower) &&
        !item.country.toLowerCase().includes(searchLower)
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
      <h2>Filter Component</h2>
      <div>
        <img
          src={"/images/parking.svg"}
          alt="Parking"
          style={{ cursor: "pointer", opacity: criteria.parking ? 1 : 0.5 }}
          onClick={() => handleCriteriaChange("parking")}
        />
        <img
          src={"/images/breakfast.svg"}
          alt="Breakfast"
          style={{ cursor: "pointer", opacity: criteria.breakfast ? 1 : 0.5 }}
          onClick={() => handleCriteriaChange("breakfast")}
        />
        <img
          src={"/images/wifi.svg"}
          alt="Wifi"
          style={{ cursor: "pointer", opacity: criteria.wifi ? 1 : 0.5 }}
          onClick={() => handleCriteriaChange("wifi")}
        />
        <img
          src={"/images/pets.svg"}
          alt="Pets Allowed"
          style={{ cursor: "pointer", opacity: criteria.petsAllowed ? 1 : 0.5 }}
          onClick={() => handleCriteriaChange("petsAllowed")}
        />
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
      </div>
      <ul>
        {filteredList?.map((item) => (
          <li key={item.id}>
            {item.name} - {item.city}, {item.country} - Parking:{" "}
            {item.parking ? "Yes" : "No"}, Breakfast:{" "}
            {item.breakfast ? "Yes" : "No"}, Wifi: {item.wifi ? "Yes" : "No"},
            Pets Allowed: {item.petsAllowed ? "Yes" : "No"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListVenuesGrid;
