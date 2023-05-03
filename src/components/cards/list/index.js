import { Link } from "react-router-dom";
import { ButtonOutlineWhite } from "../../../styles/GlobalStyles";
import { useGetVenuesQuery } from "../../../state/api/api";

const ListCards = () => {
  const { data: venues, isLoading: venuesIsLoading } = useGetVenuesQuery();
  console.log(useGetVenuesQuery());

  return (
    <div className="w-100 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-6">
      {venues.map((venues) => (
        <Link to="/venues/:id">
          <div className="full-w rounded overflow-hidden shadow-md ">
            <div
              className="relative overflow-hidden bg-no-repeat h-80"
              style={{
                backgroundImage: `url(${venues.media})`,
                backgroundPosition: `center`,
                backgroundSize: `cover`,
              }}
            >
              <div className="flex flex-col justify-center align-middle absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-dark bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100">
                <ButtonOutlineWhite className="opacity-1">
                  view venue
                </ButtonOutlineWhite>
              </div>
            </div>
            <div className="px-3 py-4">
              <h3 className="mb-2 h3">Placencia Village, Belize</h3>
              <div className="flex flex-row gap-3">
                <img
                  className="icon"
                  src="/images/moon-sea-icon.svg"
                  alt="Night icon"
                ></img>

                <p>48 668 NOK</p>
              </div>
              <div className="flex flex-row gap-3">
                <img
                  className="icon"
                  src="/images/people-icon.svg"
                  alt="Guests"
                ></img>
                <p>2</p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ListCards;
