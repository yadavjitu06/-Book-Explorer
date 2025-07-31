import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import "./SearchBar.css";

const SearchBar = forwardRef(({ onSearch }, ref) => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
  });
  const [error, setError] = useState("");
  const titleRef = useRef(null); 
  const authorRef = useRef(null);
  const genreRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useImperativeHandle(ref, () => ({
    focusInput() {
      
      [titleRef, authorRef, genreRef].forEach((inputRef) => {
        if (inputRef.current) {
          inputRef.current.classList.add("shake"); 
          setTimeout(() => {
            inputRef.current.classList.remove("shake"); // Remove after 500ms
          }, 500);
        }
      });
    },
  }));

  const handleSubmit = (event) => {
    event.preventDefault();

    let searchParts = [];
    if (formData.title) searchParts.push(`intitle:${formData.title}`);
    if (formData.author) searchParts.push(`inauthor:${formData.author}`);
    if (formData.genre) searchParts.push(`subject:${formData.genre}`);

    const finalQuery = searchParts.join("+");
    if (finalQuery) {
      onSearch(finalQuery);
      setError("");
    } else {
      setError("Please fill at least one field to search.");
    }
  };

  return (
    <div className="search-bar-container">
      <h2>Search for books</h2>
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Search by Title"
          className="search-input"
          ref={titleRef} 
        />
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
          placeholder="Search by Author"
          className="search-input"
          ref={authorRef} 
        />
        <input
          type="text"
          name="genre"
          value={formData.genre}
          onChange={handleChange}
          placeholder="Search by Genre or Keyword"
          className="search-input"
          ref={genreRef} 
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
      {error && <p className="error-text">{error}</p>}
    </div>
  );
});

export default SearchBar;