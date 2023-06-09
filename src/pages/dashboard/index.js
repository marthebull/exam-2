import React from "react";
import UserInfo from "../../components/dashboard/UserInfo";
import UserOverview from "../../components/dashboard/UserOverview";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const username = useSelector((state) => state.persisted.auth.name);

  return (
    <div>
      <UserInfo username={username} />
      <UserOverview username={username} />
    </div>
  );
};

export default Dashboard;
