
import "./SearchBar.css";

const SearchBar = () => {

  const handleSubmit = (e) => {
    e.preventDefault();
   
  };

  return (
    <div className="search-bar-container">
      <h2>Search for books</h2>
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
         value="Readonly value" readOnly
        />
        <input
          type="text"
          placeholder="Author"
          value="Readonly value" readOnly
          
        />
        <input
          type="text"
          placeholder="Genre"
          value="Readonly value" readOnly
          
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default SearchBar;
