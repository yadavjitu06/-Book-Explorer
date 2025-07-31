
import './BookCard.css';

const BookCard = ({ title, author, image, description }) => {
 

 return (
    <div className='book-card'>
      <div className='book-image'>
        <img src={image} alt={title} />
      </div>
      <div className='book-title'>
        <span>{title}</span>
      </div>
      <div className='book-author'>
        <span>by {author}</span>
      </div>
      <div className='book-desc'>
        <span>{description ? description.slice(0, 120) + "..." : "No description available."}</span>
      </div>
    </div>
  );
};

export default BookCard;










