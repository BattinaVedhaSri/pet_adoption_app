import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <p className="hero-tag">🐾 ADOPT • LOVE • CARE</p>

          <h1>
            Find your new
            <br />
            <span>best friend.</span>
          </h1>

          <p className="hero-description">
            Every pet deserves a loving home. Meet adorable companions
            waiting to fill your life with happiness.
          </p>

          <Link to="/pets" className="hero-button">
            Explore Pets →
          </Link>
        </div>

        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=900&q=80"
            alt="Two adorable dogs"
          />
        </div>
      </section>

      <section className="home-info">
        <h2>Love comes with four paws.</h2>
        <p>
          Don't shop. Adopt. Find a companion who is waiting to become
          a part of your family.
        </p>
      </section>
    </div>
  );
}

export default Home;