import "./Home.css";
import SearchBar from "../components/SearchBar/SearchBar";
import BookCard from "../components/BookCard/BookCard";



import useBookList from "../hooks/useBookList";

function Home() { 
 const defaultQueries = ["rich dad poor dad", "harry potter"]; // Default queries
  const { bookList, handleSearch } = useBookList(defaultQueries);

  const handleSearchResults = (query) => {
    console.log("Searching with query:", query); // Debug
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
                key={book.id}
                title={book.volumeInfo.title}
                author={book.volumeInfo.authors?.join(", ") || "Unknown Author"}
                image={book.volumeInfo.imageLinks?.thumbnail || "https://via.placeholder.com/120x180"}
                description={book.volumeInfo.description || "No description available"}
              />
            ))
          ) : (
            <p>No books found, try a little more! </p>
          )}
        </div>
      </div>
    </>
  );
}

export default Home;