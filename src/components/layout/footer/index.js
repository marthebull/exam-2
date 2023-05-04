import React from "react";
import { BrandInfo, FooterCont, FooterInner, FooterNav } from "./styles";
import { Logo } from "../../../styles/GlobalStyles";
import { Link } from "react-router-dom";

const Footer = () => {
  const thisYear = new Date();

  return (
    <>
      <FooterCont className="mt-10">
        <FooterInner>
          <BrandInfo>
            <Link to="/" className="link flex justify-center md:justify-start">
              <Logo src="/images/logo-holidaze.svg" className="mb-4"></Logo>
            </Link>
            <p className="p">+47 234 54 000</p>
            <p className="p">book@holidaze.co</p>
          </BrandInfo>
          <FooterNav>
            <Link to="/venues" className="link nav-link">
              venues
            </Link>
            <Link to="/dashboard" className="link nav-link">
              dashboard
            </Link>
          </FooterNav>
        </FooterInner>
        <small>
          holidaze © {thisYear.getFullYear()} | marthe bull pettersen{" "}
        </small>
      </FooterCont>
    </>
  );
};

export default Footer;
