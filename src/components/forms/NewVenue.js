import React, { useState } from "react";
import { useNewVenueMutation } from "../../state/api/api";
import { useNavigate } from "react-router-dom";
import { ButtonSolidDark, FormImg } from "../../styles/GlobalStyles";
import { NewVenueSchema } from "../../utils/schema";
import MapComponent from "./AddressAutoComplete";
import AddressAutoComplete from "./AddressAutoComplete";

const NewVenueForm = () => {
  const [newVenueDetails, setNewVenueDetails] = useState({
    name: "",
    description: "",
    media: [],
    price: 0,
    maxGuests: 0,
    rating: 0,
    meta: {
      wifi: false,
      parking: false,
      breakfast: false,
      pets: false,
    },
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [data] = useNewVenueMutation();

  let navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value, checked } = event.target;
    if (name === "media") {
      setNewVenueDetails((prevState) => ({
        ...prevState,
        media: [value],
      }));
      //console.log(newVenueDetails);
    } else if (name.startsWith("meta.")) {
      // if the checkbox name starts with 'meta.'
      setNewVenueDetails((prevState) => ({
        ...prevState,
        meta: {
          ...prevState.meta,
          [name.slice(5)]: checked, // update the corresponding property in the meta object
        },
      }));
      //console.log(value);
      //console.log(newVenueDetails);
    } else if (name.includes("location")) {
      // if the input name includes 'location.', treat it as a nested property
      const [parent, child] = name.split(".");
      setNewVenueDetails((prevState) => ({
        ...prevState,
        [parent]: {
          ...prevState[parent],
          [child]: value,
        },
      }));
      //console.log(value);
      //console.log(newVenueDetails);
    } else {
      setNewVenueDetails((prevState) => ({
        ...prevState,
        [name]: value,
      }));
      //console.log(value);
      //console.log(newVenueDetails);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      // handle success
      await NewVenueSchema.validate(newVenueDetails, { abortEarly: false });

      const response = await data({
        ...newVenueDetails,
        price: parseFloat(newVenueDetails.price), // parse as number
        maxGuests: parseInt(newVenueDetails.maxGuests), // parse as number
        rating: parseFloat(newVenueDetails.rating), // parse as number
        location: {
          address: address,
          city: city,
          zip: zip,
          country: country,
          continent: "",
          lat: latitude,
          lng: longitude,
        },
      });
      console.log(response);
      if (!response.error) {
        navigate(`/dashboard`);
      }
    } catch (error) {
      console.error(error);
      console.log(useNewVenueMutation);
      if (error.inner) {
        const formErrors = error.inner.reduce((acc, err) => {
          acc[err.path] = err.message;

          return acc;
        }, {});
        setErrors(formErrors);
        console.log(formErrors);
        console.log(error.inner);
        console.log(data);
        console.log(newVenueDetails);
      }
      // handle error
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col ">
      <div className="gap-2 mb-3 ">
        <label htmlFor="name" className="mb-1 ">
          venue name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          onChange={handleChange}
          value={newVenueDetails.name}
          placeholder="Villa Rosa"
          className="mb-2"
        />
        {errors.name && <div>{errors.name}</div>}
      </div>

      <div className="gap-2 mb-3 ">
        <label htmlFor="description" className="mb-1 ">
          description
        </label>
        <textarea
          id="description"
          name="description"
          rows="4"
          onChange={handleChange}
          value={newVenueDetails.description}
          placeholder="describe the venue and location"
          className="mb-2"
        />
        {errors.description && <div>{errors.description}</div>}
      </div>

      {newVenueDetails.media.length !== "" && (
        <FormImg
          src={newVenueDetails.media}
          className="mb-3 rounded-sm"
          alt={newVenueDetails.name}
        ></FormImg>
      )}

      <div className="gap-2 mb-1 items-start" id="imgInputs">
        <label htmlFor="media" className="mb-1">
          main image URL
        </label>
        <input
          id="media"
          name="media"
          type="text"
          onChange={handleChange}
          value={newVenueDetails.media}
          placeholder="example.url.gif"
          className="mb-2"
        />
        {errors.media && <div>{errors.media}</div>}
      </div>
      <p className="text-end cursor-pointer label mb-3 hover:text-gray-400">
        + add image
      </p>

      <div className="gap-2 mb-3 ">
        <label htmlFor="price" className="mb-1 ">
          price per night in NOK
        </label>
        <input
          id="price"
          name="price"
          type="text"
          onChange={handleChange}
          defaultValue={newVenueDetails.price}
          placeholder="899"
          className="mb-1"
        />
        {errors.price && <div>{errors.price}</div>}
      </div>

      <div className="gap-2 mb-3 ">
        <label htmlFor="maxGuests" className="mb-1 ">
          max guests
        </label>
        <input
          id="maxGuests"
          name="maxGuests"
          type="text"
          onChange={handleChange}
          defaultValue={newVenueDetails.maxGuests}
          placeholder="16"
          className="mb-1"
        />
        {errors.maxGuests && <div>{errors.maxGuests}</div>}
      </div>

      <div className="gap-2 mb-3 ">
        <label htmlFor="rating" className="mb-1 ">
          rating
        </label>
        <input
          id="rating"
          name="rating"
          type="text"
          onChange={handleChange}
          defaultValue={newVenueDetails.rating}
          placeholder="5"
          className="mb-1"
        />
        {errors.rating && <div>{errors.rating}</div>}
      </div>

      <div className="gap-2 mb-3 ">
        <label htmlFor="city" className="mb-1 ">
          city
        </label>
        <input
          id="city"
          name="location.city"
          type="text"
          onChange={(event) => {
            setCity(event.target.value);
          }}
          value={city}
          placeholder="Venice"
          className="mb-1"
        />
        {errors.city && <div>{errors.city}</div>}
      </div>

      <div className="mb-3">
        <label className="mb-1 ">address</label>
        <AddressAutoComplete
          setCity={setCity}
          setZip={setZip}
          setCountry={setCountry}
          setAddress={setAddress}
          setLongitude={setLongitude}
          setLatitude={setLatitude}
        />
      </div>

      <div className="flex flex-col gap-2 pt-4 pb-8">
        <div className="flex flex-row items-center gap-2">
          <input
            id="breakfast"
            name="meta.breakfast"
            type="checkbox"
            onChange={handleChange}
            checked={newVenueDetails.meta.breakfast}
            className="check"
          />
          <label htmlFor="breakfast">
            <div className="flex flex-row">
              <img
                className="icon"
                src="/images/coffe-cup-icon.svg"
                alt="Breakfast icon"
              ></img>
              <p className="h5">breakfast</p>
            </div>
          </label>
        </div>

        <div className="flex flex-row items-center gap-2">
          <input
            id="parking"
            name="meta.parking"
            type="checkbox"
            onChange={handleChange}
            checked={newVenueDetails.meta.parking}
            className="check"
          />
          <label htmlFor="parking">
            <div className="flex flex-row">
              <img
                className="icon"
                src="/images/car-icon.svg"
                alt="Parking icon"
              ></img>
              <p className="h5">parking</p>
            </div>
          </label>
        </div>

        <div className="flex flex-row items-center gap-2">
          <input
            id="wifi"
            name="meta.wifi"
            type="checkbox"
            onChange={handleChange}
            checked={newVenueDetails.meta.wifi}
            className="check"
          />
          <label htmlFor="wifi">
            <div className="flex flex-row">
              <img
                className="icon"
                src="/images/wifi-icon.svg"
                alt="Wifi icon"
              ></img>
              <p className="h5">wifi</p>
            </div>
          </label>
        </div>

        <div className="flex flex-row items-center gap-2">
          <input
            id="pets"
            name="meta.pets"
            type="checkbox"
            onChange={handleChange}
            checked={newVenueDetails.meta.pets}
            className="check"
          />
          <label htmlFor="pets">
            <div className="flex flex-row">
              <img
                className="icon"
                src="/images/paw-icon.svg"
                alt="Pets icon"
              ></img>
              <p className="h5">pets allowed</p>
            </div>
          </label>
        </div>
      </div>

      <ButtonSolidDark type="submit" disabled={isLoading}>
        {isLoading ? "Loading..." : "add venue"}
      </ButtonSolidDark>
    </form>
  );
};

export default NewVenueForm;
