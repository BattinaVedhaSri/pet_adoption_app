import { Link, useNavigate } from "react-router-dom";
import pets from "../data/pets";

function AdminDashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  if (!user || user.role !== "admin") {
    return (
      <div className="access-denied">
        <h2>Access Denied!</h2>
        <button onClick={() => navigate("/login")}>
          Login as Admin
        </button>
      </div>
    );
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const applications =
    JSON.parse(localStorage.getItem("applications")) || [];

  const pending = applications.filter(
    (app) => app.status === "Pending"
  ).length;

  const stats = [
    {
      icon: "👥",
      title: "Total Users",
      value: users.length,
      description: "Registered members",
      color: "purple"
    },
    {
      icon: "🐶",
      title: "Available Pets",
      value: pets.length,
      description: "Lovely companions",
      color: "orange"
    },
    {
      icon: "📋",
      title: "Total Applications",
      value: applications.length,
      description: "Adoption applications",
      color: "blue"
    },
    {
      icon: "⏳",
      title: "Pending Requests",
      value: pending,
      description: "Awaiting review",
      color: "green"
    }
  ];

  return (
    <div className="admin-dashboard">

      {/* Welcome Banner */}
      <section className="admin-welcome">
        <div className="admin-welcome-content">
          <span className="admin-label">
            🐾 PAWHOME ADMIN PANEL
          </span>

          <h1>Welcome Back, Admin!</h1>

          <p>
            Your dashboard to manage pets, users and adoption requests.
          </p>

          <Link
            to="/admin/applications"
            className="admin-welcome-button"
          >
            View Applications →
          </Link>
        </div>

        <div className="admin-welcome-icon">
          🐕
        </div>
      </section>

      {/* Statistics */}
      <section className="admin-section">
        <div className="admin-section-heading">
          <div>
            <span>YOUR PLATFORM AT A GLANCE</span>
            <h2>Dashboard Overview</h2>
            <p>Here is what's happening at PawHome today.</p>
          </div>
        </div>

        <div className="admin-stats">
          {stats.map((stat) => (
            <div
              className={`admin-stat-card ${stat.color}`}
              key={stat.title}
            >
              <div className="admin-stat-top">
                <div className="admin-stat-icon">
                  {stat.icon}
                </div>
                <span className="admin-stat-dot">●</span>
              </div>

              <h3>{stat.value}</h3>
              <h4>{stat.title}</h4>
              <p>{stat.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Management Options */}
      <section className="admin-section admin-management">
        <div className="admin-section-heading">
          <div>
            <span>CONTROL YOUR PLATFORM</span>
            <h2>Manage Platform</h2>
            <p>Choose what you would like to manage.</p>
          </div>
        </div>

        <div className="admin-actions">

          <Link
            to="/admin/pets"
            className="admin-action-card"
          >
            <div className="admin-action-icon pet-action-icon">
              🐾
            </div>

            <h3>Manage Pets</h3>

            <p>
              Add new pets, update their details and manage
              available adoption listings.
            </p>

            <div className="admin-action-link">
              Manage Pets <span>→</span>
            </div>
          </Link>

          <Link
            to="/admin/applications"
            className="admin-action-card"
          >
            <div className="admin-action-icon application-action-icon">
              📋
            </div>

            <h3>Adoption Requests</h3>

            <p>
              Review applications, check adopter information
              and manage adoption requests.
            </p>

            <div className="admin-action-link">
              View Requests <span>→</span>
            </div>
          </Link>

        </div>
      </section>

      {/* Footer */}
      <footer className="admin-footer">
        🐾 PawHome Admin Panel | Making every adoption special ❤️
      </footer>

    </div>
  );
}

export default AdminDashboard;