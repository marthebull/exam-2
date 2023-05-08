import React from "react";
import { useGetProfileByNameQuery } from "../../state/api/api";
import { CenterContainer, DashAvatar } from "../../styles/GlobalStyles";
import { Edit } from "./styles";

const UserInfo = ({ username }) => {
  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useGetProfileByNameQuery(username);

  return (
    <>
      <CenterContainer className="pt-8">
        <div className="relative">
          <Edit>edit</Edit>
          <DashAvatar
            src={user ? user.avatar : "/images/placeholder-avatar.svg"}
          ></DashAvatar>
        </div>
        <h1 className="h3 pb-1">{user?.name}</h1>
        <div className="flex flex-row gap-3">
          <img src="/images/sun-sea-icon.svg" alt="Guests"></img>
          <img src="/images/house-icon.svg" alt="Guests"></img>
          {user?.venueManager ? <p>guest</p> : <p>host</p>}
        </div>
      </CenterContainer>
    </>
  );
};

export default UserInfo;
