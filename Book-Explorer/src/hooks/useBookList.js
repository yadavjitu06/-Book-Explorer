import { useEffect, useState } from "react";
import axios from "axios";
import { searchBook } from "../apis/GoogleBooks ";

// Yeh ek custom hook hai jo default books load karta hai
// aur search functionality bhi deta hai
function useBookList(defaultSearchTerms = []) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ✅ Ye function default search terms se books laata hai
  const getDefaultBooks = async () => {
    if (!Array.isArray(defaultSearchTerms) || defaultSearchTerms.length === 0) {
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Sabhi search terms ke liye ek-ek API call bnaao
      const requests = defaultSearchTerms.map((term) => axios.get(searchBook(term)));
      const responses = await Promise.all(requests);

      // Sabhi results ko combine karke ek list banao
      const allBooks = responses
        .filter((res) => res.data?.items)
        .flatMap((res) => res.data.items);

      setBooks(allBooks);
    } catch (err) {
      console.error("Error loading default books:", err);
      setError("Default books load nahi ho payi");
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Jab component mount ho ya defaultSearchTerms change ho
  useEffect(() => {
    getDefaultBooks();
  }, [JSON.stringify(defaultSearchTerms)]); // stringify to track changes correctly

  // ✅ Ye function search input ke base par books fetch karta hai
  const searchBooks = async (query) => {
    const searchText = query.trim();

    // Agar search box khaali hai toh default books dikhao
    if (!searchText) {
      getDefaultBooks();
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(searchBook(searchText));
      const results = response.data?.items || [];
      setBooks(results);
    } catch (err) {
      console.error("Search error:", err);
      setError("Search nahi ho payi");
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Yeh cheezein component ko return ho rahi hain
  return {
    bookList: books,
    handleSearch: searchBooks,
    isLoading: loading,
    error,
  };
}

export default useBookList;
