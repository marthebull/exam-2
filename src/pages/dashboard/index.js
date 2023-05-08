import React from "react";
import UserInfo from "../../components/dashboard/UserInfo";
import UserOverview from "../../components/dashboard/UserOverview";
import { useParams } from "react-router-dom";

const Dashboard = () => {
  const { username } = useParams();
  return (
    <div>
      <UserInfo username={username} />
      <UserOverview username={username} />
    </div>
  );
};

export default Dashboard;
