import { useContext, useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import useBookList from "../../hooks/useBookList";
import useDebounce from "../../hooks/useDebounce";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';


// Context import
import ThemeContext from "../../context/ThemeContext";

function Navbar() {
  const [isAutoCompleteVisible, setIsAutoCompleteVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { bookList, handleSearch, isLoading } = useBookList(searchTerm);
  const navigate = useNavigate();
 const {theme, setTheme} = useContext(ThemeContext);
  // Debounced version of handleSearch
  const debouncedSearch = useDebounce((value) => {
    handleSearch(value);
  }, 500);

  function updateTheme() {
    if (theme == "dark") {
      setTheme("light");
      localStorage.setItem("app-theme", "light");
    } else {
      setTheme("dark");
      localStorage.setItem("app-theme", "dark");
    }
  }

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  const handleAutoCompleteClick = (bookId) => {
    navigate(`/book/${bookId}`);
    setIsAutoCompleteVisible(false);
    setSearchTerm("");
  };

  return (
    <header className="navbar-wrapper">
      <Link to="/" className="logo">
        Book Explorer
      </Link>

      <div className="search-bar">
        <input
          id="book-search-input"
          type="text"
          value={searchTerm}
          onFocus={() => setIsAutoCompleteVisible(true)}
          onBlur={() => setTimeout(() => setIsAutoCompleteVisible(false), 200)}
          onChange={handleInputChange}
          placeholder="Search for books, authors and more..."
        />

        <div
          id="result-list"
          style={{
            display: isAutoCompleteVisible && searchTerm ? "block" : "none",
          }}
        >
          {isLoading ? (
            <div className="autocomplete-result">Loading...</div>
          ) : bookList.length > 0 ? (
            bookList.map((book) => (
              <div
                key={book.id}
                onMouseDown={() => handleAutoCompleteClick(book.id)}
                className="autocomplete-result"
              >
                {book.volumeInfo.title}
              </div>
            ))
          ) : (
            searchTerm && (
              <div className="autocomplete-result">No results found</div>
            )
          )}
        </div>
      </div>

      <div className="right-section">
        <Link to="/favorites" className="nav-link">
          Favorites
        </Link>
        <div className="theme-toggle" onClick={updateTheme}>
          <FontAwesomeIcon
            className="theme-icon"
            icon={theme == "dark" ? faSun : faMoon}
          />
        </div>
      </div>
    </header>
  );
}

export default Navbar;
