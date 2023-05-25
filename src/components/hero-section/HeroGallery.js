import React, { useState, useEffect, useRef } from "react";
import { HeroContainer } from "./styles";
import HeroSpinner from "../loaders/HeroSpinner";
import { Link } from "react-router-dom";
import { ButtonSolidWhite, CenterContainer } from "../../styles/GlobalStyles";
import { useSelector } from "react-redux";

const HeroGallery = ({ venueData, isVenueDataLoading, isVenueDataError }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const name = useSelector((state) => state.persisted.auth.name);
  const lightboxRef = useRef();

  const openLightbox = () => {
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const showNextImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex + 1) % venueData.media.length
    );
  };

  const showPrevImage = () => {
    setCurrentImageIndex(
      (prevIndex) =>
        (prevIndex + venueData.media.length - 1) % venueData.media.length
    );
  };

  const handleBackgroundClick = (event) => {
    if (event.target === lightboxRef.current) {
      closeLightbox();
    }
  };

  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        closeLightbox();
      }
    };

    if (lightboxOpen) {
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [lightboxOpen]);

  if (isVenueDataLoading) {
    return <HeroSpinner />;
  }

  if (isVenueDataError) {
    return (
      <CenterContainer>
        <h1 className="h1">Sorry!</h1>
        <img
          src="/images/broken-heart-icon.svg"
          className="big-icon"
          alt="Broken heart icon"
        ></img>
        <p>Something went wrong.</p>
      </CenterContainer>
    );
  }

  return (
    <>
      <HeroContainer className="relative cursor-pointer">
        <div className="relative w-full h-full">
          {venueData?.media.length > 0 ? (
            venueData?.media.map((image, i) => (
              <img
                key={i}
                src={image}
                alt={` ${image}`}
                className={`absolute top-0 left-0 w-full h-full object-center object-cover ${
                  i === currentImageIndex ? "opacity-100" : "opacity-0"
                } transition-opacity duration-500`}
                onClick={openLightbox}
              />
            ))
          ) : (
            <img
              src="/images/placeholder-image.svg"
              alt="Placeholder"
              className="absolute top-0 left-0 w-full h-full object-center object-cover"
            />
          )}
        </div>

        {name === venueData?.owner.name ? (
          <Link
            to={"/manage-venue/" + venueData?.id}
            key={venueData?.id}
            className="pt-6 absolute bottom-4 right-50% z-50"
          >
            <ButtonSolidWhite className="opacity-1">
              manage venue
            </ButtonSolidWhite>
          </Link>
        ) : null}
      </HeroContainer>

      {lightboxOpen && (
        <div
          ref={lightboxRef}
          className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-75 z-50"
          onClick={handleBackgroundClick}
        >
          <div
            className="absolute top-2 right-4 text-white text-2xl cursor-pointer"
            onClick={closeLightbox}
          >
            &times;
          </div>
          {/* <button
            className="absolute top-1/2 left-2 text-white text-2xl"
            onClick={showPrevImage}
          >
            &lt;
          </button>

          <div
            onClick={showNextImage}
            className="absolute top-1/2 right-2 text-white rounded-full cursor-pointer hover:text-gray-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              viewBox="0 0 24 24"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              stroke="currentColor"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </div> */}
          {/* <button
            className="absolute top-1/2 right-2 text-white text-2xl"
            onClick={showNextImage}
          >
            &gt;
          </button> */}
          <img
            src={venueData?.media[currentImageIndex]}
            alt={` ${venueData?.media[currentImageIndex]}`}
            className="max-h-[600px] max-w-full rounded-sm"
          />
          {venueData.media.length > 1 && (
            <div className="flex absolute bottom-2 gap-6 mb-4 items-center justify-center mt-3">
              <div
                onClick={showPrevImage}
                className="inline-flex me-1 items-center rounded-full cursor-pointer text-white hover:text-gray-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </div>
              <div className="flex items-center">
                {venueData.media.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImageIndex(i)}
                    className={`w-3 h-3 mx-1 rounded-full cursor-pointer ${
                      i === currentImageIndex
                        ? "ring-2 ring-inset ring-white bg-white"
                        : "ring-2 ring-inset ring-white bg-gray-700"
                    }  hover:bg-gray-300`}
                  />
                ))}
              </div>
              <div
                onClick={showNextImage}
                className="inline-flex ms-1 items-center rounded-full cursor-pointer text-white hover:text-gray-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </div>
            </div>
          )}
        </div>
      )}

      {venueData.media.length > 1 && (
        <div className="flex gap-6 mb-4 items-center justify-center mt-3">
          <div
            onClick={showPrevImage}
            className="inline-flex me-1 items-center rounded-full cursor-pointer text-gray-700 hover:text-gray-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              viewBox="0 0 24 24"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              stroke="currentColor"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </div>
          <div className="flex items-center">
            {venueData.media.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentImageIndex(i)}
                className={`w-3 h-3 mx-1 rounded-full cursor-pointer ${
                  i === currentImageIndex
                    ? "ring-2 ring-inset ring-gray-700 bg-gray-700"
                    : "ring-2 ring-inset ring-gray-700 bg-white"
                }  hover:bg-gray-300`}
              />
            ))}
          </div>
          <div
            onClick={showNextImage}
            className="inline-flex ms-1 items-center rounded-full cursor-pointer text-gray-700 hover:text-gray-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              viewBox="0 0 24 24"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              stroke="currentColor"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </div>
        </div>
      )}
    </>
  );
};

export default HeroGallery;
