import * as yup from "yup";

export const RegisterSchema = yup.object().shape({
  name: yup.string().required("Name is required."),
  email: yup
    .string()
    .email("Invalid email")
    .required("Email is required.")
    .matches(
      /(@stud\.noroff\.no|@noroff\.no)$/,
      "Email must be a @stud.noroff.no or @noroff.no address"
    ),
  avatar: yup
    .string()
    .url("Invalid URL")
    .test("is-image-url", "Avatar must be a valid image URL", (value) => {
      if (!value) {
        return true; // allowing empty value
      }
      return /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(value);
    }),
  venueManager: yup.boolean(),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

export const NewVenueSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
  price: yup.number().required("Price is required"),
  maxGuests: yup
    .number()
    .positive()
    .integer()
    .min(1, "Guests must be between 1 and 100")
    .max(100, "Guests must be between 1 and 100")
    .required("Max guests is required"),
  rating: yup
    .number()
    .min(1, "Rating must be between 1 and 5")
    .max(5, "Rating must be between 1 and 5"),
  meta: yup.object().shape({
    wifi: yup.boolean(),
    parking: yup.boolean(),
    breakfast: yup.boolean(),
    pets: yup.boolean(),
  }),
  location: yup.object().shape({
    address: yup.string(),
    city: yup.string(),
    zip: yup.string(),
    country: yup.string(),
    continent: yup.string(),
    lat: yup.number(),
    lng: yup.number(),
  }),
});

export const venueSchema = yup
  .object({
    name: yup.string().required("Venue name is equired"),
    description: yup.string().required("Description is required"),
    avatar: yup
      .string()
      .url("Invalid URL")
      .test("is-image-url", "Avatar must be a valid image URL", (value) => {
        if (!value) {
          return true; // allowing empty value
        }
        return /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(value);
      }),
    price: yup.number().positive().integer().required("Price is required"),
    maxGuests: yup
      .number()
      .positive()
      .integer()
      .min(1, "Guests must be between 1 and 100")
      .max(100, "Guests must be between 1 and 100")
      .required("Max guests is required"),
    rating: yup
      .number()
      .positive()
      .integer()
      .min(1, "Rating must be between 1 and 5")
      .max(5, "Rating must be between 1 and 5"),
    meta: yup.object({
      wifi: yup.boolean(),
      parking: yup.boolean(),
      breakfast: yup.boolean(),
      pets: yup.boolean(),
    }),
    location: yup.object({
      address: yup.string(),
      city: yup.string(),
      zip: yup.string(),
      country: yup.string(),
      continent: yup.string(),
      lat: yup.number(),
      lng: yup.number(),
    }),
  })
  .required();
