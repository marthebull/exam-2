import React from "react";
import { Link } from "react-router-dom";
import { ButtonOutlineWhite } from "../../../styles/GlobalStyles";

const VenueCard = () => {
  return (
    <>
      <Link>
        <h3 class="mb-2">Villa Rosa</h3>
        <div class="w-full rounded overflow-hidden shadow-md ">
          <div className="relative overflow-hidden bg-cover bg-center bg-no-repeat max-h-80">
            <img
              classname="w-full"
              src="https://images.unsplash.com/photo-1414510451013-d0a41fea512e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
              alt="Sunset in the mountains"
            ></img>
            <div class="flex flex-col justify-center align-middle absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-dark bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100">
              <Link to="/manage-venue">
                <ButtonOutlineWhite className="opacity-1">
                  manage venue
                </ButtonOutlineWhite>
              </Link>
            </div>
          </div>
          <div className="px-3 py-4">
            <h4 class="mb-2 h3">Placencia Village, Belize</h4>
            <div className="flex flex-row gap-3">
              <img
                classname="icon"
                src="/images/moon-sea-icon.svg"
                alt="Night icon"
              ></img>

              <p>48 668 NOK</p>
            </div>
            <div className="flex flex-row gap-3">
              <img
                classname="icon"
                src="/images/people-icon.svg"
                alt="Guests"
              ></img>
              <p>2</p>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default VenueCard;
