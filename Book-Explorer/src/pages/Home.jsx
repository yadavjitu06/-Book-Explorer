import "./Home.css";
import SearchBar from "../components/SearchBar/SearchBar";
import BookCard from "../components/BookCard/BookCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { searchBook } from "../apis/GoogleBooks ";

function Home({ searchRef }) { 
  const [bookList, setBookList] = useState([]);

  const handleSearch = async (query) => {
    console.log("Search query mili!", query); 
    try {
      const response = await axios.get(searchBook(query));
      if (response.data.items) {
        setBookList(response.data.items); 
      } else {
        setBookList([]); 
      }
    } catch (error) {
      console.error("Error while searching books:", error);
      setBookList([]);
    }
  };

  // Default books fetch
  useEffect(() => {
    handleSearch("rich dad poor dad"); 
  }, []);

  return (
    <>
      <div className="home-container">
        <div className="search-bar-container">
          <SearchBar onSearch={handleSearch} ref={searchRef} /> {/* Ref pass  here */}
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