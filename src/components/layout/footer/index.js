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
            <Link to="/" className="link">
              <Logo src="/images/logo-holidaze.svg"></Logo>
            </Link>
            <p>+47 234 54 000</p>
            <p>book@holidaze.co</p>
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
