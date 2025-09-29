import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link, Outlet } from "react-router-dom";
import dog from "../images/dog10.jpg";
import dogtwo from "../images/dog6.jpg";
import DoggoBackground from "./DoggoBackground";
import "../style/DoggoBackground.css";
const BASE_URL = "https://frontend-take-home-service.fetch.com";
//in the app.css is where i imported the fontawesome icons
function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await axios.post(
        `${BASE_URL}/auth/login`,
        { name, email },
        { withCredentials: true }
      );
      navigate("/search"); // Redirect to search page
    } catch (err) {
      setError("Login failed. Try again.");
    }
  };

  return (
    <DoggoBackground>
      <div className="login-outer-container">
        <div className="login-container">
          {/* <h2 className="two">Login</h2> */}
          {/* Header / Navbar */}
          <header className="lp-header">
            <div className="lp-logo">
              <span className="lp-logo-paw">🐾</span>
              <span>My Pet</span>
            </div>

            <nav className="lp-nav">
              <Link to="/" className="lp-link">
                Home
              </Link>
              <a href="#how" className="lp-link">
                How it works?
              </a>
              <a href="#about" className="lp-link">
                About Us
              </a>
              <a href="#faq" className="lp-link">
                FAQ
              </a>
            </nav>

            {/* <div className="lp-actions">
              <Link to="/login" className="lp-ghost">
                Create Account
              </Link>
            </div> */}
          </header>

          {/* Hero */}
          <section className="lp-hero">
            {/* Left copy */}
            <div className="lp-copy">
              <span className="lp-pill">We Luv Furry Friends</span>
              <h1 className="lp-title">
                Find a <span className="lp-accent">new</span> pet for you.
              </h1>
              <p className="lp-sub">
                We don't just help you find a dog; we help you find a new member
                of the family.
              </p>

              {/* ⬇️ ORANGE CARD MOVED UNDER SUBTITLE */}
              <figure id="doge" className="lp-card lp-card-orange">
                <img
                  id="doge-image"
                  src={dogtwo}
                  alt="Puppy in a jacket"
                  loading="lazy"
                />

                <figcaption className="lp-cert">
                  <div className="lp-cert-text">
                    {/* Trigger */}
                    <button
                      type="button"
                      className="lp-cert-trigger"
                      aria-expanded={open}
                      aria-controls="adopt-form"
                      onClick={() => setOpen((v) => !v)}
                    >
                      <strong class="button-title">Click ~ Woof woof</strong>
                    </button>

                    {/* Revealed on toggle */}
                    {open && (
                      <>
                        <small className="lp-hint">
                          Please enter your name and email!
                        </small>

                        <form
                          id="adopt-form"
                          className="login-form"
                          onSubmit={handleLogin}
                        >
                          <input
                            className="login-name"
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                          />
                          <input
                            className="login-email"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                          <button className="submit-button" type="submit">
                            Login <i className="fas fa-paw"></i>
                          </button>
                        </form>

                        {error && <p role="alert">{error}</p>}
                      </>
                    )}
                  </div>
                </figcaption>
              </figure>
            </div>

            {/* Right media — only the blue card now, made taller */}
            <div className="lp-media">
              <figure className="lp-card lp-card-blue">
                <img src={dog} alt="Puppy in a jacket" loading="lazy" />
                <figcaption className="lp-stat"></figcaption>
              </figure>
            </div>
          </section>

          {/* <form className="login-form" onSubmit={handleLogin}>
          <input
            className="login-name"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            className="login-email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button className="submit-button" type="submit">
            Login <i className="fas fa-paw"></i>
          </button>
        </form>
        {error && <p>{error}</p>} */}
        </div>
      </div>
    </DoggoBackground>
  );
}

export default Login;
