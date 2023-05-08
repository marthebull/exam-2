import React from "react";
import { useGetProfileByNameQuery } from "../../state/api/api";
import { CenterContainer, DashAvatar } from "../../styles/GlobalStyles";
import { Edit } from "./styles";
import { useSelector } from "react-redux";

const UserInfo = ({ username }) => {
  const { accessToken } = useSelector((state) => state.persisted.auth);
  const { data, isLoading, isError } = useGetProfileByNameQuery(username, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return (
    <>
      <CenterContainer className="pt-8">
        <div className="relative">
          <Edit>edit</Edit>
          <DashAvatar src="/images/placeholder-avatar.svg"></DashAvatar>
        </div>
        <h1 className="h3 pb-1">username</h1>
        <div className="flex flex-row gap-3">
          <img src="/images/sun-sea-icon.svg" alt="Guests"></img>
          <img src="/images/house-icon.svg" alt="Guests"></img>
          <p>guest/host</p>
        </div>
      </CenterContainer>
    </>
  );
};

export default UserInfo;
