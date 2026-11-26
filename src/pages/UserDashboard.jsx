import { useState } from "react";
import { Link } from "react-router-dom";
import defaultPets from "../data/pets";

function UserDashboard() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  // Load pets added or managed by Admin
  const [petList] = useState(() => {
    return (
      JSON.parse(localStorage.getItem("pawhomePets")) ||
      defaultPets
    );
  });

  // Search and category filtering
  const filteredPets = petList.filter((pet) => {
    const matchesSearch =
      pet.name.toLowerCase().includes(search.toLowerCase()) ||
      pet.breed.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || pet.type === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="dashboard">

      {/* BANNER */}
      <section className="dashboard-banner">
        <div className="banner-content">
          <span className="banner-tag">
            🐾 PAWHOME PET ADOPTION
          </span>

          <h1>
            Find Your <span>Perfect</span> Companion
          </h1>

          <p>
            Some friendships are meant to have four paws.
            Meet your new best friend today!
          </p>

          <a href="#available-pets" className="banner-button">
            Explore Our Pets ↓
          </a>
        </div>
      </section>

      {/* PETS SECTION */}
      <section className="pets-section" id="available-pets">

        <div className="pets-heading">
          <span className="section-tag">
            MEET YOUR NEW FRIEND
          </span>

          <h2>Pets Waiting For You ❤️</h2>

          <p>
            Every pet deserves a loving home.
            Find the one that steals your heart.
          </p>
        </div>

        {/* SEARCH AND FILTER */}
        <div className="pet-controls">

          <input
            type="text"
            placeholder="🔍 Search by pet name or breed..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="filter-buttons">
            {["All", "Dog", "Cat"].map((item) => (
              <button
                key={item}
                className={
                  category === item ? "active-filter" : ""
                }
                onClick={() => setCategory(item)}
              >
                {item === "All" ? "All Pets" : item + "s"}
              </button>
            ))}
          </div>

        </div>

        {/* PET CARDS */}
        <div className="pet-grid">

          {filteredPets.length > 0 ? (

            filteredPets.map((pet) => (

              <div className="pet-card" key={pet.id}>

                <div className="pet-image-wrapper">

                  <img
                    src={pet.image}
                    alt={pet.name}
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://placehold.co/600x400?text=Pet+Photo";
                    }}
                  />

                  <span className="pet-type">
                    {pet.type}
                  </span>

                </div>

                <div className="pet-card-content">

                  <div className="pet-title">
                    <h3>{pet.name}</h3>
                    <span>🐾</span>
                  </div>

                  <p className="pet-breed">
                    {pet.breed}
                  </p>

                  <div className="pet-info">
                    <span>🎂 {pet.age}</span>
                    <span>📍 {pet.location}</span>
                  </div>

                  <Link
                    to={`/pet/${pet.id}`}
                    className="pet-button"
                  >
                    Meet {pet.name} →
                  </Link>

                </div>

              </div>

            ))

          ) : (

            <h3 className="no-pets">
              No pets found. Try another search! 🐾
            </h3>

          )}

        </div>

      </section>

    </div>
  );
}

export default UserDashboard;