import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar({ onSearchClick }) {
  return (
    <header className="navbar-wrapper">
      <div className="logo">Book Explorer</div>
      <div className="right-section">
        <nav className="nav-links">
          <Link to="/" className="nav-link" onClick={onSearchClick}>
            Search
          </Link>
          <Link to="/favorites" className="nav-link">
            Favorites
          </Link>
        </nav>
        <div className="theme-toggle">Theme</div>
      </div>
    </header>
  );
}

export default Navbar;