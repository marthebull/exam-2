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

    getVenues: build.query({
      query: () => `venues?_owner=true`,
    }),

    getVenueById: build.query({
      query: (id) => `venues/${id}?_owner=true&_bookings=true`,
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
  }),
  onError: (error, query) => {
    console.error("API request failed", { error, query });
  },
});

export const {
  useGetProfilesQuery,
  useGetVenuesQuery,
  useGetVenueByIdQuery,
  useRegisterMutation,
  useLoginMutation,
} = api;
export const loginEndpoint = api.endpoints.login;
