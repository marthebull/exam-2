import React, { useState } from "react";
import { useGetProfileByNameQuery } from "../../state/api/api";
import {
  ButtonOutlineDark,
  CenterContainer,
  DashAvatar,
} from "../../styles/GlobalStyles";
import { Edit } from "./styles";
import { Link } from "react-router-dom";
import ModalBody from "../modal/ModalBody";
import UpdateAvatar from "../forms/UpdateAvatar";
import { useSelector } from "react-redux";
import UserInfoLoader from "../loaders/UserInfoLoader";

const UserInfo = ({ username }) => {
  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useGetProfileByNameQuery(username);

  const currentAvatar = useSelector((state) => state.persisted.auth.avatar);

  const [showModal, setShowModal] = useState(false);

  if (isUserLoading) {
    return <UserInfoLoader />;
  }

  if (isUserError) {
    return (
      <CenterContainer>
        <p>Error loading userinfo</p>
      </CenterContainer>
    );
  }

  return (
    <>
      <CenterContainer className="pt-12">
        <div className="relative">
          <Edit showModal={showModal} onClick={() => setShowModal(!showModal)}>
            edit
          </Edit>
          <DashAvatar
            src={
              currentAvatar ? currentAvatar : "/images/placeholder-avatar.svg"
            }
          ></DashAvatar>
        </div>
        <h1 className="h3 pb-1">{user?.name}</h1>
        <div className="flex flex-row gap-3 pb-6">
          {user?.venueManager ? (
            <img src="/images/house-icon.svg" alt="Host icon"></img>
          ) : (
            <img src="/images/sun-sea-icon.svg" alt="Guests icon"></img>
          )}
          {user?.venueManager ? <p>host</p> : <p>guest</p>}
        </div>
        {user?.venueManager && (
          <Link to="/create-new-venue" className="link">
            <ButtonOutlineDark>+ new venue</ButtonOutlineDark>
          </Link>
        )}
      </CenterContainer>
      <ModalBody showModal={showModal} setShowModal={setShowModal}>
        <h1 className="h2 pt-4 pb-8 text-center">update avatar</h1>
        <UpdateAvatar
          username={username}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      </ModalBody>
    </>
  );
};

export default UserInfo;
