import React, { useEffect, useState } from "react";
import { HeroContainer, TextHero } from "./styles";
import {
  ButtonOutlineWhite,
  ButtonSolidDark,
  ButtonSolidWhite,
} from "../../styles/GlobalStyles";
import ModalBody from "../modal/ModalBody";
import HeroSpinner from "../loaders/HeroSpinner";
import { Link, useNavigate } from "react-router-dom";
import {
  useDeleteVenueByIdMutation,
  useGetVenueByIdQuery,
} from "../../state/api/api";
import { useSelector } from "react-redux";

const HeroManage = ({ id }) => {
  let navigate = useNavigate();
  const name = useSelector((state) => state.persisted.auth.name);

  const {
    data: venueData,
    isLoading: isVenueDataLoading,

    refetch: refetchVenueData,
  } = useGetVenueByIdQuery(id);

  const [showModal, setShowModal] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [deleteVenue] = useDeleteVenueByIdMutation();

  useEffect(() => {
    if (venueData) {
      refetchVenueData();
    }
  }, [isVenueDataLoading, refetchVenueData, venueData]);

  const handleDeleteVenue = async () => {
    setIsLoading(true);
    try {
      // Call the deleteVenue mutation with the venue ID
      await deleteVenue({ id: venueData?.id });
    } catch (error) {
      console.log("Error deleting venue:", error);
    } finally {
      setIsLoading(false);
      setShowModal(!showModal);
      navigate(`/dashboard`);
    }
  };

  if (isVenueDataLoading) {
    return <HeroSpinner />;
  }

  return (
    <>
      <HeroContainer className="relative" id={venueData.id}>
        <TextHero
          style={{
            backgroundImage:
              venueData?.media.length > 0
                ? `url(${venueData?.media[0]})`
                : `url(/images/placeholder-image.svg)`,
            backgroundPosition: `center`,
            backgroundSize: `cover`,
            backgroundColor: `#424242`,
          }}
          className="z-20"
        >
          <div className="flex absolute z-20 bg-gray-900 opacity-50 w-full h-full items-center"></div>
          <div className="w-fit mx-auto z-50">
            <small className="white">manage venue</small>
            <h1 className="white h3">{venueData?.name}</h1>
            <div className="flex flex-col mx-auto pt-6 gap-1 md:flex-row md:gap-4">
              <Link to={"/edit-venue/" + venueData?.id}>
                <ButtonSolidWhite id={venueData?.id}>
                  edit venue
                </ButtonSolidWhite>
              </Link>

              <ButtonOutlineWhite
                showModal={showModal}
                onClick={() => setShowModal(!showModal)}
              >
                delete venue
              </ButtonOutlineWhite>
            </div>
          </div>
        </TextHero>
        {name === venueData?.owner.name ? (
          <Link
            to={"/venues/" + venueData?.id}
            className="link link-white pt-6 absolute bottom-4 right-50% z-50 hover:opacity-70"
          >
            preview venue
          </Link>
        ) : null}
      </HeroContainer>
      <ModalBody
        id={venueData.id}
        showModal={showModal}
        setShowModal={setShowModal}
        className="items-center"
      >
        <small className="text-center block">delete venue</small>
        <h1 className="h3 text-center mb-10">{venueData?.name}</h1>
        <p className="text-center p mb-10">
          Are you sure you want to delete this venue?
        </p>

        <ButtonSolidDark
          showModal={showModal}
          onClick={handleDeleteVenue}
          disabled={isLoading}
        >
          {isLoading ? "Deleting..." : "yes, delete venue"}
        </ButtonSolidDark>
      </ModalBody>
    </>
  );
};

export default HeroManage;
