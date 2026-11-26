import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("loggedInUser"));
  });

  // Refresh login information whenever the page changes
  useEffect(() => {
    const savedUser = JSON.parse(
      localStorage.getItem("loggedInUser")
    );

    setUser(savedUser);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        🐾 PawHome
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>

        {user?.role === "admin" ? (
          <>
            <Link to="/admin">Admin Dashboard</Link>
            <Link to="/admin/pets">Manage Pets</Link>
            <Link to="/admin/applications">
              Manage Applications
            </Link>
          </>
        ) : (
          <>
            <Link to="/pets">Adopt</Link>

            {user?.role === "user" && (
              <Link to="/my-applications">
                My Applications
              </Link>
            )}
          </>
        )}

        {!user ? (
          <>
            <Link to="/login">Login</Link>

            <Link to="/signup" className="nav-signup">
              Sign Up
            </Link>
          </>
        ) : (
          <button
            className="logout-button"
            onClick={handleLogout}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;