import React from "react";
import { venueSchema } from "../../utils/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { ButtonSolidDark } from "../../styles/GlobalStyles";

const EditVenueForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(venueSchema),
  });

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col ">
        <div className="gap-2 mb-3 ">
          <label className="mb-1 ">venue name</label>
          <input
            {...register("name")}
            placeholder="Villa Rosa"
            type="text"
            className="mb-2"
          />
          {/* <p>{errors.name?.message}</p> */}
          {errors.name?.message && <p>{errors.name.message}</p>}
        </div>

        <div className="gap-2 mb-3 ">
          <label className="mb-1 ">description</label>
          <textarea
            {...register("description")}
            placeholder="describe the venue and location"
            className="mb-2"
          />
          {errors.description?.message && <p>{errors.description.message}</p>}
        </div>

        <div className="gap-2 mb-1 ">
          <label className="mb-1 ">image URL</label>
          <input
            {...register("media")}
            placeholder="example/image/url.jpg"
            type="text"
            className="mb-2"
          />
          {errors.media?.message && <p>{errors.media.message}</p>}
        </div>
        <p className="text-end cursor-pointer label mb-3 hover:text-gray-400">
          + add image
        </p>

        {/* price
        maxGuests
        rating
        address
        city 
        zip
        country
        continent
        lat
        lng
         */}

        {/* 
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
        </div> */}

        <ButtonSolidDark type="submit">list venue</ButtonSolidDark>
      </form>
    </>
  );
};

export default EditVenueForm;
