import { useEffect, useState } from "react";

function ManageApplications() {
  const [applications, setApplications] = useState([]);

  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("applications")) || [];
    setApplications(saved);
  }, []);

  const updateStatus = (id, status) => {
    const updated = applications.map((app) =>
      app.id === id ? { ...app, status } : app
    );

    setApplications(updated);
    localStorage.setItem("applications", JSON.stringify(updated));
  };

  if (!user || user.role !== "admin") {
    return (
      <div className="applications-page">
        <div className="access-denied">
          <h2>Access Denied!</h2>
          <p>Admin login is required to access this page.</p>
        </div>
      </div>
    );
  }

  const pending = applications.filter(
    (app) => (app.status || "Pending") === "Pending"
  ).length;

  const approved = applications.filter(
    (app) => app.status === "Approved"
  ).length;

  const rejected = applications.filter(
    (app) => app.status === "Rejected"
  ).length;

  return (
    <div className="applications-page">
      <div className="applications-header">
        <div>
          <span className="admin-label">PAWHOME ADMIN PANEL</span>
          <h1>Manage Applications</h1>
          <p>Review and manage pet adoption requests.</p>
        </div>
        <div className="application-total">
          <span>Total Applications</span>
          <h2>{applications.length}</h2>
        </div>
      </div>

      <div className="application-stats">
        <div className="application-stat">
          <span>📋</span>
          <div>
            <p>Total Requests</p>
            <h2>{applications.length}</h2>
          </div>
        </div>

        <div className="application-stat pending-stat">
          <span>⏳</span>
          <div>
            <p>Pending</p>
            <h2>{pending}</h2>
          </div>
        </div>

        <div className="application-stat approved-stat">
          <span>✅</span>
          <div>
            <p>Approved</p>
            <h2>{approved}</h2>
          </div>
        </div>

        <div className="application-stat rejected-stat">
          <span>❌</span>
          <div>
            <p>Rejected</p>
            <h2>{rejected}</h2>
          </div>
        </div>
      </div>

      <div className="applications-section">
        <h2>Adoption Requests</h2>
        <p className="section-subtitle">
          Check applicant details and update application status.
        </p>

        {applications.length === 0 ? (
          <div className="empty-applications">
            <span>🐾</span>
            <h3>No Applications Yet</h3>
            <p>New adoption requests will appear here.</p>
          </div>
        ) : (
          <div className="applications-grid">
            {applications.map((app, index) => (
              <div className="application-card" key={app.id || index}>
                <div className="application-card-top">
                  <div className="pet-icon">🐾</div>
                  <span
                    className={`status-badge ${(app.status || "Pending").toLowerCase()}`}
                  >
                    {app.status || "Pending"}
                  </span>
                </div>

                <h3>{app.petName || app.pet || "Pet Adoption"}</h3>
                <p className="pet-request-label">Adoption Request</p>

                <div className="applicant-details">
                  <p>
                    <strong>Applicant</strong>
                    <span>{app.userName || app.name || "N/A"}</span>
                  </p>
                  <p>
                    <strong>Email</strong>
                    <span>{app.email || "N/A"}</span>
                  </p>
                </div>

                {(app.status || "Pending") === "Pending" ? (
                  <div className="application-actions">
                    <button
                      className="approve-btn"
                      onClick={() => updateStatus(app.id, "Approved")}
                    >
                      ✓ Approve
                    </button>

                    <button
                      className="reject-btn"
                      onClick={() => updateStatus(app.id, "Rejected")}
                    >
                      ✕ Reject
                    </button>
                  </div>
                ) : (
                  <div className="decision-message">
                    Application {app.status}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ManageApplications;