import { useEffect, useState } from "react";
import axios from "axios";
import { searchBook } from "../apis/GoogleBooks ";


function useBookList(defaultSearchTerms = []) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const getDefaultBooks = async () => {
    if (!Array.isArray(defaultSearchTerms) || defaultSearchTerms.length === 0) {
      return;
    }

    try {
      setLoading(true);
      setError(null);

     
      const requests = defaultSearchTerms.map((term) => axios.get(searchBook(term)));
      const responses = await Promise.all(requests);


      const allBooks = responses
        .filter((res) => res.data?.items)
        .flatMap((res) => res.data.items);

      setBooks(allBooks);
    } catch (err) {
      console.error("Error loading default books:", err);
      setError("Default books  could not be load");
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    getDefaultBooks();
  }, [JSON.stringify(defaultSearchTerms)]);

  const searchBooks = async (query) => {
    const searchText = query.trim();


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
      setError("Search could not be done");
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };


  return {
    bookList: books,
    handleSearch: searchBooks,
    isLoading: loading,
    error,
  };
}

export default useBookList;
