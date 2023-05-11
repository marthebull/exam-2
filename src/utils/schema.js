import * as yup from "yup";

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
