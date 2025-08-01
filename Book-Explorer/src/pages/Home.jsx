import "./Home.css";
import SearchBar from "../components/SearchBar/SearchBar";
import BookCard from "../components/BookCard/BookCard";

import useBookList from "../hooks/useBookList";

function Home() {
  const defaultQueries = ["rich dad poor dad", "harry potter"]; 
  const { bookList, handleSearch } = useBookList(defaultQueries);

  const handleSearchResults = (query) => {
    
    handleSearch(query);
  };

  return (
    <>
      <div className="home-container">
        <div className="search-bar-container">
          <SearchBar onSearch={handleSearchResults} />
        </div>
        <div className="book-card-wrapper">
          {bookList.length > 0 ? (
            bookList.map((book) => (
              <BookCard
                id={book.id}
                key={book.id}
                title={book.volumeInfo.title}
                author={book.volumeInfo.authors?.join(", ") || "Unknown Author"}
                image={
                  book.volumeInfo.imageLinks?.thumbnail ||
                  "https://via.placeholder.com/120x180"
                }
                description={
                  book.volumeInfo.description || "No description available"
                }
              />
            ))
          ) : (
            <p className="no-books-message">
              📚✨ Oops! No Books Found! — Looks like our magical bookshelf is
              empty! 🪄 Try a different spell and let’s uncover some amazing
              reads! 🔍😄
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
