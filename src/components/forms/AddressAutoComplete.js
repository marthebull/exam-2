import React from "react";
import { useLoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import { Autocomplete } from "@react-google-maps/api";
import { useState } from "react";
import _ from "lodash";

export default function AddressAutoComplete({
  setZip,
  setCountry,
  setAddress,
  setLongitude,
  setLatitude,
}) {
  const libraries = ["places"];
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyB5txE4RJufR8FvvlKG1ktaBQ6zQVqNt0A",
    libraries,
  });
  const [autocomplete, setAutocomplete] = useState(null);
  const onLoad = (autocomplete) => {
    setAutocomplete(autocomplete);
  };
  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      let city, zip, country;
      for (let i = 0; i < place.address_components.length; i++) {
        let component = place.address_components[i];
        switch (component.types[0]) {
          case "locality":
          case "administrative_area_level_1":
          case "administrative_area_level_2":
            city = component.long_name;
            break;
          case "postal_code":
            zip = component.long_name;
            break;
          case "country":
            country = component.long_name;
            break;
          default:
            break;
        }
      }
      setZip(zip);
      setCountry(country);
      setAddress(place.formatted_address);
      setLongitude(place.geometry.location.lng());
      setLatitude(place.geometry.location.lat());
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
  };
  if (loadError) {
    return "Error loading maps";
  }
  if (!isLoaded) {
    return "Loading Maps";
  }
  return (
    <div>
      <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
        <input type="text" placeholder="address" />
      </Autocomplete>
    </div>
  );
}
