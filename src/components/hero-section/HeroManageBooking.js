import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeroSpinner from "../loaders/HeroSpinner";
import { HeroContainer, TextHero } from "./styles";
import {
  ButtonOutlineWhite,
  ButtonSolidDark,
  ButtonSolidWhite,
} from "../../styles/GlobalStyles";
import ModalBody from "../modal/ModalBody";
import { useDeleteBookingByIdMutation } from "../../state/api/api";

const HeroManageBooking = ({ bookingData, isBookingDataLoading }) => {
  let navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [deleteBooking] = useDeleteBookingByIdMutation();

  const handleCancelBooking = async () => {
    setIsLoading(true);
    try {
      await deleteBooking({ id: bookingData?.id });
    } catch (error) {
      console.log("Error cancelling booking:", error);
    } finally {
      setIsLoading(false);
      setShowModal(!showModal);
      navigate(`/dashboard`);
    }
  };

  if (isBookingDataLoading) {
    return <HeroSpinner />;
  }

  return (
    <>
      <HeroContainer className="relative" id={bookingData.id}>
        <TextHero
          style={{
            backgroundImage:
              bookingData?.venue.media.length > 0
                ? `url(${bookingData?.venue.media[0]})`
                : `url(/images/placeholder-image.svg)`,
            backgroundPosition: `center`,
            backgroundSize: `cover`,
            backgroundColor: `#424242`,
          }}
          className="z-20"
        >
          <div className="flex absolute z-20 bg-gray-900 opacity-50 w-full h-full items-center"></div>
          <div className="w-fit mx-auto z-50">
            <small className="white">manage booking for</small>
            <h1 className="white h3">{bookingData.venue?.name}</h1>
            <div className="flex flex-col mx-auto pt-6 gap-1 md:flex-row md:gap-4">
              <ButtonSolidWhite className="opacity-50">
                feat coming soon...
              </ButtonSolidWhite>

              <ButtonOutlineWhite
                showModal={showModal}
                onClick={() => setShowModal(!showModal)}
              >
                cancel booking
              </ButtonOutlineWhite>
            </div>
          </div>
        </TextHero>
      </HeroContainer>

      {/* Cancel booking modal */}
      <ModalBody
        id={bookingData.venue?.id}
        showModal={showModal}
        setShowModal={setShowModal}
        className="items-center"
      >
        <small className="text-center block">cancel booking for</small>
        <h1 className="h3 text-center mb-10">{bookingData?.venue.name}</h1>
        <p className="text-center p mb-12">
          Are you sure you want to cancel this booking?
        </p>

        <ButtonSolidDark
          showModal={showModal}
          onClick={handleCancelBooking}
          disabled={isLoading}
        >
          {isLoading ? "cancelling..." : "yes, cancel booking"}
        </ButtonSolidDark>
      </ModalBody>
    </>
  );
};

export default HeroManageBooking;
