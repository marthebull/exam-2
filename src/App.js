import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Venues from "./pages/venues";
import Venue from "./pages/venue";
import CreateNewVenue from "./pages/create-new-venue";
import SignIn from "./pages/sign-in";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import ManageBooking from "./pages/manage-booking";
import ManageVenue from "./pages/manage-venue";
import PageNotFound from "./pages/page-not-found";
import Layout from "./components/layout";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import EditVenue from "./pages/edit-venue";
import { LoadScript } from "@react-google-maps/api";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <>
      <LoadScript
        googleMapsApiKey={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places`}
      >
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/venues" element={<Venues />} />
            <Route path="/venues/:id" element={<Venue />} />
            <Route path="/create-new-venue" element={<CreateNewVenue />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/manage-booking/:id" element={<ManageBooking />} />
            <Route path="/manage-venue/:id" element={<ManageVenue />} />
            <Route path="/edit-venue/:id" element={<EditVenue />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Layout>
      </LoadScript>
    </>
  );
}

export default App;
