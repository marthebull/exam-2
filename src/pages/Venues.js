import { useDispatch } from "react-redux";
import { useGetVenuesQuery } from "../state/api/api";
import { loginUser } from "./state/features/authSlice";
import { useState } from "react";

function ListVenues() {
  const { data: venues, isLoading: venuesIsLoading } = useGetVenuesQuery();

  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = () => {
    dispatch(loginUser({ email, password }));
  };
  return (
    <div className="App">
      <input
        type="text"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <button onClick={handleLogin}>login</button>

      {venues?.map((profile) => (
        <div key={profile.name}>
          <h1>{profile.name}</h1>
          <p>{profile.email}</p>
        </div>
      ))}
    </div>
  );
}

export default ListVenues;
