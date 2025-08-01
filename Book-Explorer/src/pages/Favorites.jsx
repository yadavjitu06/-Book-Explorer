import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BookCard from "../components/BookCard/BookCard";
import "./Favorites.css";

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Load favorites from localStorage (or replace with API/state management)
    const savedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(savedFavorites);
  }, []);

  const removeFavorite = (id) => {
    const updatedFavorites = favorites.filter((book) => book.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  if (favorites.length === 0) {
    return (
      <div className="favorites-empty">
        <p>No favorite books yet! Explore and add some! 📚😄</p>
        <button onClick={() => navigate("/")}>Go to Home</button>
      </div>
    );
  }

  return (
    <div className="favorites-container">
      <h1 className="favorites-title">Your Favorite Books ✨</h1>
      <div className="favorites-grid">
        {favorites.map((book) => (
          <div key={book.id} className="favorite-card">
            <BookCard
              id={book.id}
              title={book.volumeInfo.title}
              author={book.volumeInfo.authors?.join(", ") || "Unknown"}
              image={book.volumeInfo.imageLinks?.thumbnail || "https://via.placeholder.com/120x180"}
              description={book.volumeInfo.description}
            />
            <button
              className="remove-button"
              onClick={(e) => {
                e.stopPropagation();
                removeFavorite(book.id);
              }}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favorites;