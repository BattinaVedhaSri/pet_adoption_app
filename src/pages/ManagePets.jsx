import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import defaultPets from "../data/pets";

function ManagePets() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  const [pets, setPets] = useState(() => {
    return JSON.parse(localStorage.getItem("pawhomePets")) || defaultPets;
  });

  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    name: "",
    type: "Dog",
    breed: "",
    age: "",
    gender: "Male",
    location: "",
    image: "",
    description: "",
    health: "Healthy"
  });

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

  const savePets = (updatedPets) => {
    setPets(updatedPets);
    localStorage.setItem("pawhomePets", JSON.stringify(updatedPets));
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleAddPet = (e) => {
    e.preventDefault();

    const newPet = {
      ...form,
      id: Date.now()
    };

    savePets([...pets, newPet]);

    setForm({
      name: "",
      type: "Dog",
      breed: "",
      age: "",
      gender: "Male",
      location: "",
      image: "",
      description: "",
      health: "Healthy"
    });

    setShowForm(false);
    alert("New pet added successfully! 🐾");
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this pet?")) {
      const updatedPets = pets.filter((pet) => pet.id !== id);
      savePets(updatedPets);
    }
  };

  return (
    <div className="manage-pets-page">

      <div className="manage-pets-header">
        <div>
          <span>PAWHOME ADMIN PANEL 🐾</span>
          <h1>Manage Pets</h1>
          <p>Add new pets and manage existing adoption listings.</p>
        </div>

        <Link to="/admin" className="back-admin-button">
          ← Dashboard
        </Link>
      </div>

      <div className="manage-pets-summary">
        <div>
          <h2>Our Lovely Pets 🐶</h2>
          <p>{pets.length} pets currently listed</p>
        </div>

        <button
          className="add-pet-button"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "✕ Close Form" : "+ Add New Pet"}
        </button>
      </div>

      {showForm && (
        <form className="add-pet-form" onSubmit={handleAddPet}>
          <h2>🐾 Add a New Pet</h2>

          <div className="add-pet-grid">
            <input
              name="name"
              placeholder="Pet Name"
              value={form.name}
              onChange={handleChange}
              required
            />

            <select
              name="type"
              value={form.type}
              onChange={handleChange}
            >
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
            </select>

            <input
              name="breed"
              placeholder="Breed"
              value={form.breed}
              onChange={handleChange}
              required
            />

            <input
              name="age"
              placeholder="Age (Example: 2 Years)"
              value={form.age}
              onChange={handleChange}
              required
            />

            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
            >
              <option>Male</option>
              <option>Female</option>
            </select>

            <input
              name="location"
              placeholder="Location"
              value={form.location}
              onChange={handleChange}
              required
            />

            <input
              name="image"
              placeholder="Pet Image URL"
              value={form.image}
              onChange={handleChange}
              required
            />

            <input
              name="health"
              placeholder="Health Status"
              value={form.health}
              onChange={handleChange}
              required
            />
          </div>

          <textarea
            name="description"
            placeholder="Write a short description about the pet..."
            value={form.description}
            onChange={handleChange}
            required
          />

          <button type="submit" className="save-pet-button">
            Save Pet →
          </button>
        </form>
      )}

      <div className="manage-pets-grid">

        {pets.length > 0 ? (
          pets.map((pet) => (
            <div className="manage-pet-card" key={pet.id}>

              <img src={pet.image} alt={pet.name} />

              <div className="manage-pet-content">

                <div className="manage-pet-title">
                  <h3>{pet.name}</h3>
                  <span>{pet.type}</span>
                </div>

                <p>{pet.breed}</p>

                <div className="manage-pet-info">
                  <span>🎂 {pet.age}</span>
                  <span>📍 {pet.location}</span>
                  <span>❤️ {pet.health}</span>
                </div>

                <div className="manage-pet-actions">
                  <Link
                    to={`/pet/${pet.id}`}
                    className="manage-view-button"
                  >
                    View Details
                  </Link>

                  <button
                    className="delete-pet-button"
                    onClick={() => handleDelete(pet.id)}
                  >
                    Delete
                  </button>
                </div>

              </div>
            </div>
          ))
        ) : (
          <h3>No pets available. Add your first pet!</h3>
        )}

      </div>

      <div className="admin-applications-link">
        <h2>📋 Adoption Applications</h2>
        <p>Check and manage applications submitted by users.</p>
        <Link to="/admin/applications">
          View All Applications →
        </Link>
      </div>

    </div>
  );
}

export default ManagePets;