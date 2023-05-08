import React, { useState } from "react";
import * as Yup from "yup";
import { useNewVenueMutation } from "../../state/api/api";
import { useNavigate } from "react-router-dom";
import { ButtonSolidDark } from "../../styles/GlobalStyles";

const NewVenueSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string(),
  media: Yup.string()
    .url("Invalid URL")
    .test("is-image-url", "Image must be a valid image URL", (value) => {
      if (!value) {
        return true; // allowing empty value
      }
      return /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(value);
    }),
  price: Yup.number(),
  maxGuests: Yup.number()
    .required("Max guests is required")
    .positive("Max guests must be a positive number")
    .integer("Max guests must be an integer"),
  rating: Yup.number()
    .required("Rating is required")
    .min(1, "Rating must be between 1 and 5")
    .max(5, "Rating must be between 1 and 5"),
  meta: Yup.object().shape({
    wifi: Yup.boolean(),
    parking: Yup.boolean(),
    breakfast: Yup.boolean(),
    pets: Yup.boolean(),
  }),
  location: Yup.object().shape({
    address: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
    zip: Yup.string(),
    country: Yup.string().required("Country is required"),
    continent: Yup.string(),
    lat: Yup.number(),
    lng: Yup.number(),
  }),
});

const NewVenueForm = () => {
  const [newVenueDetails, setNewVenueDetails] = useState({
    name: "",
    description: "",
    media: [""],
    price: 0,
    maxGuests: 100,
    rating: 5,
    meta: {
      wifi: true,
      parking: true,
      breakfast: true,
      pets: true,
    },
    location: {
      address: "",
      city: "",
      zip: "",
      country: "",
      continent: "",
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
    } else {
      // if the checkbox name doesn't start with 'meta.'
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
      navigate("/venues");
    } catch (error) {
      console.error(error);
      if (error.inner) {
        const formErrors = error.inner.reduce((acc, err) => {
          acc[err.path] = err.message;
          return acc;
        }, {});
        setErrors(formErrors);
      }
      // handle error
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col ">
      <div className="gap-2 mb-6 ">
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

      <div className="gap-2 mb-6 ">
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
          style={{ color: "#d3d3d3" }}
        />
        {errors.description && <div>{errors.description}</div>}
      </div>

      <ButtonSolidDark type="submit" disabled={isLoading}>
        {isLoading ? "Loading..." : "submit"}
      </ButtonSolidDark>
    </form>
  );
};

export default NewVenueForm;
