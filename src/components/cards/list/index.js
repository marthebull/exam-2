import { Link } from "react-router-dom";
import { ButtonOutlineWhite } from "../../../styles/GlobalStyles";
import { useGetVenuesQuery } from "../../../state/api/api";

const ListCard = () => {
  const { data: venues, isLoading: venuesIsLoading } = useGetVenuesQuery();
  console.log(useGetVenuesQuery());

  return (
    <Link>
      <div class="full-w rounded overflow-hidden shadow-md ">
        <div className="relative overflow-hidden bg-no-repeat h-80">
          <img
            src="https://images.unsplash.com/photo-1470229678033-3a6dc3d6bf76?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
            alt="Sunset in the mountains"
          ></img>
          <div class="flex flex-col justify-center align-middle absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-dark bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100">
            <Link to="/venue/:id">
              <ButtonOutlineWhite className="opacity-1">
                view venue
              </ButtonOutlineWhite>
            </Link>
          </div>
        </div>
        <div className="px-3 py-4">
          <h3 class="mb-2 h3">Placencia Village, Belize</h3>
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
  );
};

export default ListCard;
