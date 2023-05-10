import React from "react";
import { CenterContainer, DashAvatarLoading } from "../../styles/GlobalStyles";

const UserInfoLoader = () => {
  return (
    <CenterContainer role="status" className="pt-12 animate-pulse">
      <DashAvatarLoading className="bg-gray-200 dark:bg-gray-700"></DashAvatarLoading>

      <h3 className="mb-2 h3 w-40 rounded-md bg-gray-200 dark:bg-gray-700">
        &nbsp;
      </h3>
      <p className="mb-2 rounded-md w-20 bg-gray-200 dark:bg-gray-700">
        &nbsp;
      </p>
    </CenterContainer>
  );
};

export default UserInfoLoader;
