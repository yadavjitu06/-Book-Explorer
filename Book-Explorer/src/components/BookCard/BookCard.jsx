import './BookCard.css';
import { useNavigate } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const BookCard = ({ id, title, author, image, description }) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.stopPropagation(); // (optional)
    navigate(`/book/${id}`);
  };

  return (
    <div className='book-card' onClick={handleClick} style={{ cursor: 'pointer' }}>
      <div className='book-image'>
       
        <LazyLoadImage 
          src={image}
          alt={title}
          onError={(e) => { e.target.src = 'https://via.placeholder.com/120x180'; }} 
        />
        
        
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