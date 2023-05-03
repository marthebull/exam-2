import React from "react";
import { ButtonSolidDark, CenterContainer } from "../../styles/GlobalStyles";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <>
      <CenterContainer>
        <h1 className="h1">page not found</h1>
        <img
          src="images/broken-heart-icon.svg"
          className="big-icon"
          alt="Broken heart icon"
        ></img>
        <p>Sorry! We could not find the page you’re trying to find. </p>
        <p>Please go back and try again. </p>
        <Link to="/" className="link pt-6">
          <ButtonSolidDark>home</ButtonSolidDark>
        </Link>
      </CenterContainer>
    </>
  );
};

export default PageNotFound;
