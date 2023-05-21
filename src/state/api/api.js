import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://nf-api.onrender.com/api/v1/holidaze",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().persisted.auth.accessToken;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (build) => ({
    getProfiles: build.query({
      query: () => `profiles`,
    }),

    getProfileByName: build.query({
      query: (username) => `profiles/${username}?_bookings=true&_venues=true`,
    }),

    getAvatarByName: build.query({
      query: (username) => `profiles/${username}`,
    }),

    putAvatar: build.mutation({
      query: ({ username, avatar }) => ({
        url: `profiles/${username}/media`,
        method: "PUT",
        body: { avatar: avatar },
      }),
    }),

    getVenues: build.query({
      query: () => `venues?sort=created&sortOrder=desc&_owner=true`,
    }),

    getVenueById: build.query({
      query: (id) => `venues/${id}?_owner=true&_bookings=true`,
    }),

    getBookingById: build.query({
      query: (id) => `bookings/${id}?_venue=true`,
    }),

    postBooking: build.mutation({
      query: (postBookingBody) => ({
        url: `bookings?_customer=true&_venue=true`,
        method: "POST",
        body: postBookingBody,
      }),
    }),

    putVenueById: build.mutation({
      query: ({ id, newVenueDetails }) => ({
        url: `venues/${id}`,
        method: "PUT",
        body: { newVenueDetails: newVenueDetails },
      }),
    }),

    register: build.mutation({
      query: (credentials) => ({
        url: `auth/register`,
        method: "POST",
        body: credentials,
      }),
    }),

    login: build.mutation({
      query: (credentials) => ({
        url: `auth/login`,
        method: "POST",
        body: credentials,
      }),
    }),

    newVenue: build.mutation({
      query: (credentials) => ({
        url: `venues`,
        method: "POST",
        body: credentials,
      }),
    }),

    deleteVenueById: build.mutation({
      query: ({ id }) => ({
        url: `venues/${id}`,
        method: "DELETE",
      }),
    }),

    deleteBookingById: build.mutation({
      query: ({ id }) => ({
        url: `bookings/${id}`,
        method: "DELETE",
      }),
    }),
  }),
  onError: (error, query) => {
    console.error("API request failed", { error, query });
  },
});

export const {
  useGetProfilesQuery,
  useGetProfileByNameQuery,
  useGetAvatarByNameQuery,
  usePutAvatarMutation,
  useGetVenuesQuery,
  useGetVenueByIdQuery,
  useGetBookingByIdQuery,
  usePostBookingMutation,
  usePutVenueByIdMutation,
  useRegisterMutation,
  useLoginMutation,
  useNewVenueMutation,
  useDeleteVenueByIdMutation,
  useDeleteBookingByIdMutation,
} = api;
export const loginEndpoint = api.endpoints.login;
