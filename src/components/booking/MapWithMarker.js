import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const MapWithMarker = ({ lat, lng }) => {
  const mapStyles = {
    height: "400px",
    width: "100%",
  };
  const defaultCenter = {
    lat: lat,
    lng: lng,
  };

  const options = {
    disableDefaultUI: true,
    zoomControl: false,
  };

  return (
    // <LoadScript
    //   googleMapsApiKey="AIzaSyB5txE4RJufR8FvvlKG1ktaBQ6zQVqNt0A" // Replace with your Google Maps API Key
    // >
    <GoogleMap
      mapContainerStyle={mapStyles}
      zoom={13}
      center={defaultCenter}
      options={options}
    >
      <Marker position={defaultCenter} />
    </GoogleMap>
    // </LoadScript>
  );
};
export default MapWithMarker;
