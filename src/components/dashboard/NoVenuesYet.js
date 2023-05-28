import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ButtonOutlineDark, ButtonSolidDark } from "../../styles/GlobalStyles";
import { useDispatch } from "react-redux";
import { setVenueManager } from "../../state/features/authSlice";
import ModalBody from "../modal/ModalBody";
import { usePutVenueManagerMutation } from "../../state/api/api";

const NoVenuesYet = ({ user }) => {
  const [showModal, setShowModal] = useState(false);
  const [isVenueManager, setIsVenueManager] = useState(false);

  const dispatch = useDispatch();
  const [updateVenueManager] = usePutVenueManagerMutation();

  const handleChange = (event) => {
    setIsVenueManager(event.target.checked);
  };

  const handleRegisterHost = async () => {
    try {
      const response = await updateVenueManager({
        username: user.name,
        venuemanager: isVenueManager,
      });
      console.log(response);
      dispatch(setVenueManager());
      setShowModal(false);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center mx-auto">
        <img
          src="/images/house-icon.svg"
          className="big-icon"
          alt="Venues icon"
        ></img>

        {user?.venueManager ? (
          <>
            <h2 className="text-center">no venues to manage.</h2>
            <h2 className="text-center">
              start hosting by creating your first venue
            </h2>
          </>
        ) : (
          <>
            <h2 className="text-center">no venues to manage.</h2>
            <h2 className="text-center">register as host to add new venues</h2>
          </>
        )}

        {user?.venueManager ? (
          <Link to="/create-new-venue" className="link pt-6">
            <ButtonOutlineDark>+ new venue</ButtonOutlineDark>
          </Link>
        ) : (
          <ButtonOutlineDark onClick={() => setShowModal(true)}>
            register
          </ButtonOutlineDark>
        )}
      </div>

      <ModalBody
        id={user.id}
        showModal={showModal}
        setShowModal={setShowModal}
        className="items-center"
      >
        <small className="text-center block">{user?.name}</small>
        <h1 className="h3 text-center mb-10">register as host</h1>
        <div className="flex flex-row items-center mb-10">
          <input
            id="venueManager"
            name="venueManager"
            type="checkbox"
            onChange={handleChange}
            checked={isVenueManager}
            className="check"
          />
          <label htmlFor="venueManager" className="max-w-[400px]">
            I accept the terms and conditions for use of Holidaze as
            venuemanager.
          </label>
        </div>

        <ButtonSolidDark
          showModal={showModal}
          onClick={handleRegisterHost}
          disabled={!isVenueManager}
        >
          register
        </ButtonSolidDark>
      </ModalBody>
    </>
  );
};

export default NoVenuesYet;
