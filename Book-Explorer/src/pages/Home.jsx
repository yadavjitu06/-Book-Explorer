import "./Home.css";
import SearchBar from "../components/SearchBar/SearchBar";
import BookCard from "../components/BookCard/BookCard";

function Home() {
  return (
    <>
      <div className="home-container">
        <div className="search-bar-container">
          <SearchBar />
        </div>
        <div className="book-card-wrapper">
          
          <BookCard
            title="JavaScript: The Good Parts"
            author="Douglas Crockford"
            image="https://image-url.com/another-thumbnail.jpg"
            description="An object-oriented language for interactive websites..."
          />
          <BookCard
            title="Clean Code"
            author="Robert C. Martin"
            image="https://image-url.com/clean-code.jpg"
            description="A guide to writing readable and maintainable code..."
          />
           <BookCard
            title="Clean Code"
            author="Robert C. Martin"
            image="https://image-url.com/clean-code.jpg"
            description="A guide to writing readable and maintainable code..."
          />
           <BookCard
            title="Clean Code"
            author="Robert C. Martin"
            image="https://image-url.com/clean-code.jpg"
            description="A guide to writing readable and maintainable code..."
          />
           <BookCard
            title="Clean Code"
            author="Robert C. Martin"
            image="https://image-url.com/clean-code.jpg"
            description="A guide to writing readable and maintainable code..."
          />
           <BookCard
            title="Clean Code"
            author="Robert C. Martin"
            image="https://image-url.com/clean-code.jpg"
            description="A guide to writing readable and maintainable code..."
          />
        </div>
      </div>
    </>
  );
}
export default Home;