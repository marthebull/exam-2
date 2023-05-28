import React from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";

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
    <GoogleMap
      mapContainerStyle={mapStyles}
      zoom={13}
      center={defaultCenter}
      options={options}
    >
      <Marker position={defaultCenter} />
    </GoogleMap>
  );
};
export default MapWithMarker;
