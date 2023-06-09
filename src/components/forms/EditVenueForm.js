import React, { useState } from "react";
import { usePutVenueByIdMutation } from "../../state/api/api";
import { ButtonSolidDark, FormImg } from "../../styles/GlobalStyles";
import { NewVenueSchema } from "../../utils/schema";
import { useNavigate, useParams } from "react-router-dom";
import AddressAutoComplete from "./AddressAutoComplete";

const EditVenueForm = ({ currentVenueData }) => {
  const { id } = useParams();

  const [newVenueDetails, setNewVenueDetails] = useState({
    name: currentVenueData?.name,
    description: currentVenueData?.description,
    media: currentVenueData?.media || [],
    price: currentVenueData?.price,
    maxGuests: currentVenueData?.maxGuests,
    rating: currentVenueData?.rating,
    meta: {
      wifi: currentVenueData?.meta.wifi,
      parking: currentVenueData?.meta.parking,
      breakfast: currentVenueData?.meta.breakfast,
      pets: currentVenueData?.meta.pets,
    },
    location: {
      address: currentVenueData?.location?.address,
      city: currentVenueData?.location?.city,
      zip: currentVenueData?.location?.zip,
      country: currentVenueData?.location?.country,
      lat: currentVenueData?.location?.lat,
      lng: currentVenueData?.location?.lng,
    },
  });

  const [city, setCity] = useState(currentVenueData?.location.city);
  const [zip, setZip] = useState(currentVenueData?.location.zip);
  const [country, setCountry] = useState(currentVenueData?.location.country);
  const [address, setAddress] = useState(currentVenueData?.location.address);
  const [latitude, setLatitude] = useState(currentVenueData?.location.lat);
  const [longitude, setLongitude] = useState(currentVenueData?.location.lng);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [data] = usePutVenueByIdMutation(id);

  const navigate = useNavigate();

  const handleMediaChange = (index, value) => {
    setNewVenueDetails((prevState) => {
      const updatedMedia = [...prevState.media];
      updatedMedia[index] = value;

      return {
        ...prevState,
        media: updatedMedia,
      };
    });
  };

  const handleRemoveMedia = (index) => {
    setNewVenueDetails((prevState) => {
      const updatedMedia = [...prevState.media];
      updatedMedia.splice(index, 1);

      return {
        ...prevState,
        media: updatedMedia,
      };
    });
  };

  const handleChange = (event) => {
    const { name, value, checked } = event.target;
    if (name === "media") {
      setNewVenueDetails((prevState) => ({
        ...prevState,
        media: [value],
      }));
    } else if (name.startsWith("meta.")) {
      setNewVenueDetails((prevState) => ({
        ...prevState,
        meta: {
          ...prevState.meta,
          [name.slice(5)]: checked,
        },
      }));
    } else if (name.includes("location")) {
      const [parent, child] = name.split(".");
      setNewVenueDetails((prevState) => ({
        ...prevState,
        [parent]: {
          ...prevState[parent],
          [child]: value,
        },
      }));
    } else {
      setNewVenueDetails((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      // handle success
      await NewVenueSchema.validate(newVenueDetails, { abortEarly: false });

      const editVenueBody = {
        ...newVenueDetails,
        price: parseFloat(newVenueDetails.price), // parse as number
        maxGuests: parseInt(newVenueDetails.maxGuests), // parse as number
        rating: parseFloat(newVenueDetails.rating),
        location: {
          address: address,
          city: city,
          zip: zip,
          country: country,
          continent: "",
          lat: latitude,
          lng: longitude,
        },
        media: newVenueDetails.media.filter((imageUrl) => imageUrl !== ""), // Remove empty URLs
      };

      const response = await data({ editVenueBody, id });

      if (!response.error) {
        navigate(`/dashboard`);
      }
    } catch (error) {
      console.error(error);

      if (error.inner) {
        const formErrors = error.inner.reduce((acc, err) => {
          acc[err.path] = err.message;

          return acc;
        }, {});
        setErrors(formErrors);
        console.log(formErrors);
        console.log(error.inner);
        console.log(data);
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

      {/* Display media images */}
      {newVenueDetails.media.map((imageUrl, index) => (
        <div className="gap-2 mb-1 items-start" id="imgInputs" key={index}>
          <label htmlFor={`media-${index}`} className="mb-1">
            image URL {index + 1}
          </label>
          <div className="relative">
            <input
              id={`media-${index}`}
              name={`media-${index}`}
              type="text"
              onChange={(event) => handleMediaChange(index, event.target.value)}
              value={imageUrl}
              placeholder="example.url.gif"
              className="mb-2 image-input"
            />
            <div
              className="absolute right-4 top-3 cursor-pointer"
              onClick={() => handleRemoveMedia(index)}
            >
              &times;
            </div>
          </div>
          {errors[`media-${index}`] && <div>{errors[`media-${index}`]}</div>}

          {imageUrl && (
            <FormImg
              src={imageUrl}
              className="mb-3 rounded-sm"
              alt={`Image ${index + 1}`}
            />
          )}
        </div>
      ))}

      <p
        className="text-end cursor-pointer label mb-3 hover:text-gray-400"
        onClick={() => handleMediaChange(newVenueDetails.media.length, "")}
      >
        + add image
      </p>

      <div className="gap-2 mb-3 ">
        <label htmlFor="price" className="mb-1 ">
          price per night in NOK
        </label>
        <input
          id="price"
          name="price"
          type="number"
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
          type="number"
          onChange={handleChange}
          defaultValue={newVenueDetails.maxGuests}
          placeholder="16"
          className="mb-1"
        />
        {errors.maxGuests && <div>{errors.maxGuests}</div>}
      </div>

      <div className="gap-2 mb-3 ">
        <label htmlFor="rating" className="mb-1 ">
          rating 1 to 5
        </label>
        <input
          id="rating"
          name="rating"
          type="number"
          onChange={handleChange}
          defaultValue={newVenueDetails.rating}
          placeholder="5"
          className="mb-1"
        />
        {errors.rating && <div>{errors.rating}</div>}
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
          value={currentVenueData?.location.address}
        />
      </div>

      <div className="gap-2 mb-3 ">
        <label htmlFor="city" className="mb-1 ">
          city
        </label>
        <input
          id="city"
          name="city"
          type="text"
          onChange={handleChange}
          value={city}
          placeholder="Venice"
          className="mb-1"
        />
        {errors.city && <div>{errors.city}</div>}
      </div>

      <div className="flex flex-col gap-2 py-4">
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
        {isLoading ? "Loading..." : "list venue"}
      </ButtonSolidDark>
    </form>
  );
};

export default EditVenueForm;
