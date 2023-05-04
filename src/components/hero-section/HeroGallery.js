import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetVenueByIdQuery } from "../../state/api/api";
import { HeroContainer } from "./styles";

const HeroGallery = () => {
  const { id } = useParams();

  const [index, setIndex] = useState(0);

  const handleIndicatorClick = (i) => {
    setIndex(i);
  };

  const handlePrevClick = () => {
    setIndex((index + data.media.length - 1) % data.media.length);
  };

  const handleNextClick = () => {
    setIndex((index + 1) % data.media.length);
  };

  const { data, isLoading, isError } = useGetVenueByIdQuery(id);
  console.log(useGetVenueByIdQuery(id));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something wrong</div>;
  }

  return (
    <>
      <HeroContainer className="relative">
        <div className="relative w-full h-full">
          {data.media.map((image, i) => (
            <img
              key={i}
              src={image}
              alt={` ${i}`}
              className={`absolute top-0 left-0 w-full h-full object-center object-cover ${
                i === index ? "opacity-100" : "opacity-0"
              } transition-opacity duration-500`}
            />
          ))}
        </div>
      </HeroContainer>

      {data.media.length > 1 && (
        <div className=" flex gap-6 mb-4 items-center justify-center mt-3">
          <div
            onClick={handlePrevClick}
            className="inline-flex me-1 items-center rounded-full cursor-pointer text-gray-700 hover:text-gray-300 "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              viewBox="0 0 24 24"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              stroke="currentColor"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </div>
          <div className="flex items-center">
            {data.media.map((_, i) => (
              <button
                key={i}
                onClick={() => handleIndicatorClick(i)}
                className={`w-3 h-3 mx-1 rounded-full cursor-pointer ${
                  i === index
                    ? "ring-2 ring-inset ring-gray-700 bg-gray-700"
                    : "ring-2 ring-inset ring-gray-700 bg-white"
                }  hover:bg-gray-300`}
              />
            ))}
          </div>
          <div
            onClick={handleNextClick}
            className="inline-flex ms-1 items-center rounded-full cursor-pointer text-gray-700 hover:text-gray-300 "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              viewBox="0 0 24 24"
              strokeWidth="4"
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
