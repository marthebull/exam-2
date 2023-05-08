import React from "react";
import { useGetProfileByNameQuery } from "../../state/api/api";
import {
  ButtonOutlineDark,
  CenterContainer,
  DashAvatar,
} from "../../styles/GlobalStyles";
import { Edit } from "./styles";
import { Link } from "react-router-dom";

const UserInfo = ({ username }) => {
  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useGetProfileByNameQuery(username);
  console.log(user);

  return (
    <>
      <CenterContainer className="pt-8">
        <div className="relative">
          <Edit>edit</Edit>
          <DashAvatar
            src={user?.avatar ? user.avatar : "/images/placeholder-avatar.svg"}
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
    </>
  );
};

export default UserInfo;
