import { Routes, Route } from "react-router-dom";
import ManagePets from "./pages/ManagePets";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserDashboard from "./pages/UserDashboard";
import PetDetails from "./pages/PetDetails";
import MyApplications from "./pages/MyApplications";
import AdminDashboard from "./pages/AdminDashboard";
import ManageApplications from "./pages/ManageApplications";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/admin/pets" element={<ManagePets />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/pets" element={<UserDashboard />} />
        <Route path="/pet/:id" element={<PetDetails />} />
        <Route path="/my-applications" element={<MyApplications />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/applications" element={<ManageApplications />} />
      </Routes>
    </>
  );
}

export default App;