import { useGetVenuesQuery } from "../../../state/api/api";
import { Link } from "react-router-dom";
import { ButtonOutlineWhite } from "../../../styles/GlobalStyles";
import CardLoader from "../../loaders/CardLoader";

const FeaturedVenues = () => {
  const { data: list, isLoading } = useGetVenuesQuery();
  console.log(useGetVenuesQuery());

  if (isLoading) {
    return (
      <div className="w-100 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-6">
        <CardLoader />
        <CardLoader />
        <CardLoader />
      </div>
    );
  }

  return (
    <div>
      <div className="w-100 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-6">
        {list?.slice(0, 6).map((venue) => (
          <Link to={"/venues/" + venue.id} key={venue.id}>
            <div className="full-w rounded overflow-hidden shadow-md ">
              <div
                className="relative overflow-hidden bg-no-repeat h-80"
                style={{
                  backgroundImage: `url(${venue.media})`,
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
                <h3 className="mb-2 h3">
                  {venue.location.city}, {venue.location.country}
                </h3>
                <div className="flex flex-row gap-3">
                  <img
                    className="icon"
                    src="/images/moon-sea-icon.svg"
                    alt="Night icon"
                  ></img>

                  <p>{venue.price} NOK</p>
                </div>
                <div className="flex flex-row justify-between">
                  <div className="flex flex-row gap-3">
                    <img
                      className="icon"
                      src="/images/people-icon.svg"
                      alt="Guests"
                    ></img>
                    <p>{venue.maxGuests}</p>
                  </div>
                  <div className="flex flex-row gap-4 content-center">
                    <img
                      className="icon-row opacity-50 my-auto"
                      style={{ opacity: venue.meta.breakfast ? 1 : 0.3 }}
                      src="/images/coffe-cup-icon.svg"
                      alt="Guests"
                    ></img>
                    <img
                      className="icon-row opacity-50 my-auto"
                      style={{ opacity: venue.meta.parking ? 1 : 0.3 }}
                      src="/images/car-icon.svg"
                      alt="Guests"
                    ></img>
                    <img
                      className="icon-row opacity-50 my-auto"
                      style={{ opacity: venue.meta.pets ? 1 : 0.3 }}
                      src="/images/paw-icon.svg"
                      alt="Guests"
                    ></img>
                    <img
                      className="icon-row my-auto"
                      style={{ opacity: venue.meta.wifi ? 1 : 0.3 }}
                      src="/images/wifi-icon.svg"
                      alt="Guests"
                    ></img>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FeaturedVenues;
