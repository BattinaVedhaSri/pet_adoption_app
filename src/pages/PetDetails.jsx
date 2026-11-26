import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import defaultPets from "../data/pets";

function PetDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const pets =
    JSON.parse(localStorage.getItem("pawhomePets")) || defaultPets;

  const pet = pets.find((p) => String(p.id) === String(id));

  const [form, setForm] = useState({
    phone: "",
    address: "",
    reason: "",
    experience: ""
  });

  if (!pet) {
    return <h2>Pet not found!</h2>;
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleApply = (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("loggedInUser"));

    if (!user || user.role !== "user") {
      alert("Please login as a user first!");
      navigate("/login");
      return;
    }

    const applications =
      JSON.parse(localStorage.getItem("applications")) || [];

    const alreadyApplied = applications.some(
      (app) =>
        app.petId === pet.id &&
        app.userEmail === user.email
    );

    if (alreadyApplied) {
      alert("You have already applied for this pet!");
      return;
    }

    const newApplication = {
      id: Date.now(),
      petId: pet.id,
      petName: pet.name,
      userName: user.name,
      userEmail: user.email,
      ...form,
      status: "Pending"
    };

    applications.push(newApplication);

    localStorage.setItem(
      "applications",
      JSON.stringify(applications)
    );

    // Confirm that the login session is still available.
    const savedUser = localStorage.getItem("loggedInUser");

    if (!savedUser) {
      alert("Application saved, but login session is missing. Please login again.");
      navigate("/login");
      return;
    }

    alert("Adoption application submitted successfully! 🐾");

    navigate("/my-applications");
  };

  return (
    <div className="pet-details-page">
      <div className="details-breadcrumb">
        <Link to="/">Home</Link> / <Link to="/pets">Adopt Pets</Link> / {pet.name}
      </div>

      <section className="details-container">
        <div className="details-image">
          <img
            src={pet.image}
            alt={pet.name}
            onError={(e) => {
              e.currentTarget.src =
                "https://placehold.co/800x700?text=Pet+Photo";
            }}
          />
          <span className="image-badge">❤️ Ready for a loving home</span>
        </div>

        <div className="details-content">
          <span className="details-tag">🐾 AVAILABLE FOR ADOPTION</span>

          <h1>Meet <span>{pet.name}</span></h1>

          <p className="details-description">{pet.description}</p>

          <div className="details-info">
            <div className="detail-item">
              <span>🐕</span>
              <div><small>Breed</small><strong>{pet.breed}</strong></div>
            </div>

            <div className="detail-item">
              <span>🎂</span>
              <div><small>Age</small><strong>{pet.age}</strong></div>
            </div>

            <div className="detail-item">
              <span>⚧</span>
              <div><small>Gender</small><strong>{pet.gender}</strong></div>
            </div>

            <div className="detail-item">
              <span>📍</span>
              <div><small>Location</small><strong>{pet.location}</strong></div>
            </div>

            <div className="detail-item">
              <span>🏥</span>
              <div><small>Health</small><strong>{pet.health}</strong></div>
            </div>

            <div className="detail-item">
              <span>🐾</span>
              <div><small>Pet Type</small><strong>{pet.type}</strong></div>
            </div>
          </div>

          <a href="#adoption-form" className="details-apply-button">
            Give {pet.name} a Home ❤️
          </a>

          <p className="details-note">
            A little love can change a life forever.
          </p>
        </div>
      </section>

      <section className="adoption-form-container" id="adoption-form">
        <div className="form-heading">
          <span>MAKE A DIFFERENCE</span>
          <h2>Adopt {pet.name} ❤️</h2>
          <p>Fill in the details below to begin your adoption journey.</p>
        </div>

        <form onSubmit={handleApply}>
          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Enter your 10-digit phone number"
              pattern="[0-9]{10}"
              maxLength="10"
              required
            />
          </div>

          <div className="form-group">
            <label>Address</label>
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Enter your complete address"
              required
            />
          </div>

          <div className="form-group">
            <label>Why would you like to adopt {pet.name}?</label>
            <textarea
              name="reason"
              value={form.reason}
              onChange={handleChange}
              placeholder="Tell us about your love for pets..."
              required
            />
          </div>

          <div className="form-group">
            <label>Previous Pet Experience</label>
            <select
              name="experience"
              value={form.experience}
              onChange={handleChange}
              required
            >
              <option value="">Select an option</option>
              <option value="Yes">Yes, I have experience</option>
              <option value="No">No, this will be my first pet</option>
            </select>
          </div>

          <button type="submit" className="submit-adoption">
            Submit Application →
          </button>

          <p className="form-footer">
            🐾 Thank you for choosing adoption!
          </p>
        </form>
      </section>
    </div>
  );
}

export default PetDetails;