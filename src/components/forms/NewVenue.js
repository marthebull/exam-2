import React, { useState } from "react";
import * as Yup from "yup";
import { useNewVenueMutation } from "../../state/api/api";
import { useNavigate } from "react-router-dom";
import { ButtonSolidDark } from "../../styles/GlobalStyles";

const NewVenueSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),

  media: Yup.string()
    .url("Invalid URL")
    .test("is-image-url", "Image must be a valid image URL", (value) => {
      if (!value) {
        return true; // allowing empty value
      }
      return /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(value);
    }),

  price: Yup.number().required("Price is required"),
  maxGuests: Yup.number()
    .required("Max guests is required")
    .positive("Max guests must be a positive number")
    .integer("Max guests must be an integer"),

  rating: Yup.number()
    .min(1, "Rating must be between 0 and 5")
    .max(5, "Rating must be between 0 and 5"),

  meta: Yup.object().shape({
    wifi: Yup.boolean(),
    parking: Yup.boolean(),
    breakfast: Yup.boolean(),
    pets: Yup.boolean(),
  }),

  location: Yup.object().shape({
    address: Yup.string(),
    city: Yup.string(),
    zip: Yup.string(),
    country: Yup.string(),
    continent: Yup.string(),
    lat: Yup.number(),
    lng: Yup.number(),
  }),
});

const NewVenueForm = () => {
  const [newVenueDetails, setNewVenueDetails] = useState({
    name: "",
    description: "",
    media: "",
    price: 899,
    maxGuests: 16,
    rating: 5,
    meta: {
      wifi: false,
      parking: false,
      breakfast: false,
      pets: false,
    },
    location: {
      address: "unknown",
      city: "unknown",
      zip: "unknown",
      country: "unknown",
      continent: "unknown",
      lat: 0,
      lng: 0,
    },
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [data] = useNewVenueMutation();

  let navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    if (name.startsWith("meta.")) {
      // if the checkbox name starts with 'meta.'
      setNewVenueDetails((prevState) => ({
        ...prevState,
        meta: {
          ...prevState.meta,
          [name.slice(5)]: checked, // update the corresponding property in the meta object
        },
      }));
    } else if (name.includes("location")) {
      // if the input name includes a dot ('.'), treat it as a nested property
      const [parent, child] = name.split(".");
      setNewVenueDetails((prevState) => ({
        ...prevState,
        [parent]: {
          ...prevState[parent],
          [child]: value,
        },
      }));
    } else {
      // for all other inputs, update the state directly
      setNewVenueDetails((prevState) => ({
        ...prevState,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      // handle success
      await NewVenueSchema.validate(newVenueDetails, { abortEarly: false });
      const response = await data(newVenueDetails);
      console.log(response);
      if (!response.error) {
        navigate("/venues");
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

      {newVenueDetails.media.length > 0 && (
        <img
          src={newVenueDetails.media}
          className="mb-3 rounded-sm"
          alt={newVenueDetails.name}
        ></img>
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
          value={newVenueDetails.price}
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
          value={newVenueDetails.maxGuests}
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
          value={newVenueDetails.rating}
          placeholder="5"
          className="mb-1"
        />
        {errors.rating && <div>{errors.rating}</div>}
      </div>

      <div className="gap-2 mb-3 ">
        <label htmlFor="address" className="mb-1 ">
          address
        </label>
        <input
          id="address"
          name="location.address"
          type="text"
          onChange={handleChange}
          value={newVenueDetails.address}
          placeholder="Calle San Paternian 1 - San Marco"
          className="mb-1"
        />
        {errors.address && <div>{errors.address}</div>}
      </div>

      <div className="gap-2 mb-3 ">
        <label htmlFor="city" className="mb-1 ">
          city
        </label>
        <input
          id="city"
          name="location.city"
          type="text"
          onChange={handleChange}
          value={newVenueDetails.city}
          placeholder="Venice"
          className="mb-1"
        />
        {errors.city && <div>{errors.city}</div>}
      </div>

      <div className="gap-2 mb-3 ">
        <label htmlFor="zip" className="mb-1 ">
          zip
        </label>
        <input
          id="zip"
          name="location.zip"
          type="text"
          onChange={handleChange}
          value={newVenueDetails.zip}
          placeholder="30124"
          className="mb-1"
        />
        {errors.zip && <div>{errors.zip}</div>}
      </div>

      <div className="gap-2 mb-3 ">
        <label htmlFor="country" className="mb-1 ">
          country
        </label>
        <input
          id="country"
          name="location.country"
          type="text"
          onChange={handleChange}
          value={newVenueDetails.country}
          placeholder="Italy"
          className="mb-1"
        />
        {errors.country && <div>{errors.country}</div>}
      </div>

      <div className="gap-2 mb-3 ">
        <label htmlFor="continent" className="mb-1 ">
          continent
        </label>
        <input
          id="continent"
          name="location.continent"
          type="text"
          onChange={handleChange}
          value={newVenueDetails.continent}
          placeholder="Europe"
          className="mb-1"
        />
        {errors.continent && <div>{errors.continent}</div>}
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

export default NewVenueForm;
