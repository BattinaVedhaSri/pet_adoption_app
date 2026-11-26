import { Link } from "react-router-dom";

function MyApplications() {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  const applications =
    JSON.parse(localStorage.getItem("applications")) || [];

  if (!user || user.role !== "user") {
    return (
      <div className="user-applications-page">
        <div className="user-empty-state">
          <h2>Please Login First</h2>
          <p>Login to view your adoption applications.</p>
          <Link to="/login" className="explore-link">
            Login Now
          </Link>
        </div>
      </div>
    );
  }

  const myApplications = applications.filter(
    (app) => app.userEmail === user.email
  );

  return (
    <div className="user-applications-page">
      <div className="user-applications-header">
        <span>YOUR PAWHOME JOURNEY</span>
        <h1>My Adoption Applications 🐾</h1>
        <p>Keep track of your applications and find your forever friend.</p>
      </div>

      <div className="user-application-summary">
        <div>
          <h2>{myApplications.length}</h2>
          <p>Total Applications</p>
        </div>

        <div>
          <h2>
            {myApplications.filter(
              (app) => (app.status || "Pending") === "Pending"
            ).length}
          </h2>
          <p>Pending</p>
        </div>

        <div>
          <h2>
            {myApplications.filter(
              (app) => app.status === "Approved"
            ).length}
          </h2>
          <p>Approved</p>
        </div>
      </div>

      {myApplications.length === 0 ? (
        <div className="user-empty-state">
          <div className="empty-paw">🐾</div>
          <h2>No Applications Yet!</h2>
          <p>
            Your adoption journey starts with finding your perfect
            companion.
          </p>
          <Link to="/pets" className="explore-link">
            Explore Pets →
          </Link>
        </div>
      ) : (
        <div className="user-application-grid">
          {myApplications.map((app, index) => {
            const status = app.status || "Pending";

            return (
              <div className="user-application-card" key={app.id || index}>
                <div className="user-app-card-header">
                  <div className="user-pet-icon">🐶</div>

                  <span className={`user-status ${status.toLowerCase()}`}>
                    {status}
                  </span>
                </div>

                <h2>{app.petName || app.pet || "Pet Adoption"}</h2>
                <p className="user-app-subtitle">Adoption Application</p>

                <div className="user-app-details">
                  <p>
                    <strong>Applicant</strong>
                    <span>{app.userName || "N/A"}</span>
                  </p>

                  <p>
                    <strong>Phone</strong>
                    <span>{app.phone || "N/A"}</span>
                  </p>

                  <p>
                    <strong>Email</strong>
                    <span>{app.userEmail || app.email || "N/A"}</span>
                  </p>

                  <p>
                    <strong>Reason for Adoption</strong>
                    <span>{app.reason || "N/A"}</span>
                  </p>
                </div>

                <div className="user-status-message">
                  {status === "Pending" &&
                    "Your application is waiting for admin review."}

                  {status === "Approved" &&
                    "Congratulations! Your application has been approved."}

                  {status === "Rejected" &&
                    "Your application was not approved this time."}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default MyApplications;