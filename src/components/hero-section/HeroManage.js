import React, { useState } from "react";
import { HeroContainer, TextHero } from "./styles";
import {
  ButtonOutlineWhite,
  ButtonSolidWhite,
} from "../../styles/GlobalStyles";
import ModalBody from "../modal/ModalBody";
import EditVenue from "../forms/EditVenue";
import HeroSpinner from "../loaders/HeroSpinner";

const HeroManage = ({ venueData, isVenueDataLoading }) => {
  //console.log(venueData.venueData);

  const [showModal, setShowModal] = useState(false);

  if (isVenueDataLoading) {
    return <HeroSpinner />;
  }

  return (
    <>
      <HeroContainer className="relative">
        <TextHero
          style={{
            backgroundImage:
              venueData?.media.length > 0
                ? `url(${venueData.media[0]})`
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
              <ButtonSolidWhite
                venueData={venueData}
                showModal={showModal}
                onClick={() => setShowModal(!showModal)}
              >
                edit
              </ButtonSolidWhite>
              <ButtonOutlineWhite>delete</ButtonOutlineWhite>
            </div>
          </div>
        </TextHero>
      </HeroContainer>
      <ModalBody
        id={venueData.id}
        showModal={showModal}
        setShowModal={setShowModal}
        className="items-center"
      >
        <small className="text-center block">update venue</small>
        <h1 className="h3 text-center">{venueData?.name}</h1>
        <EditVenue showModal={showModal} setShowModal={setShowModal} />
      </ModalBody>
    </>
  );
};

export default HeroManage;
