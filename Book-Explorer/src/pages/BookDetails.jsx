import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./BookDetails.css";

function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      
      if (!id) {
        setError("Invalid book ID");
        setLoading(false);
        navigate("/");
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `https://www.googleapis.com/books/v1/volumes/${id}`
        );

        
        if (!response.data?.volumeInfo) {
          throw new Error("Invalid book data structure");
        }

        setBook(response.data);
      } catch (err) {
        console.error("API Error:", err);
        setError(err.response?.data?.error?.message || 
                "Failed to fetch book details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id, navigate]);

  const volume = book?.volumeInfo;
  const saleInfo = book?.saleInfo;
  const accessInfo = book?.accessInfo;

  if (loading) return <div className="loading">Loading book details...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!volume) return <div className="error-message">Book details not available</div>;

  return (
    <div className="book-details-container">
      <div className="book-details-wrapper">
        {/* Book Card Section */}
        <div className="book-card-section">
          <img
            src={volume.imageLinks?.thumbnail || "https://via.placeholder.com/120x180?text=No+Cover"}
            alt={volume.title}
            className="book-cover"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/120x180?text=No+Cover";
            }}
          />
          <div className="book-info">
            <h1 className="book-title">{volume.title}</h1>
            <p className="book-authors">
              <strong>Authors:</strong> {volume.authors?.join(", ") || "Unknown"}
            </p>
            <p className="book-published">
              <strong>Published:</strong> {volume.publishedDate || "N/A"}
            </p>
          </div>
        </div>

        {/* Details Section */}
        <div className="book-details-content">
          <div className="detail-section">
            <h2>Description</h2>
            <p className="book-description">
              {volume.description || "No description available"}
            </p>
          </div>

          <div className="detail-section">
            <h2>Categories</h2>
            <div className="book-categories">
              {volume.categories?.length > 0 ? (
                volume.categories.map((cat) => (
                  <span className="genre" key={cat}>
                    {cat}
                  </span>
                ))
              ) : (
                <span className="genre">Not categorized</span>
              )}
            </div>
          </div>

          <div className="detail-section">
            <h2>Rating</h2>
            <div className="book-rating">
              <span className="rating-value">
                {volume.averageRating ? `${volume.averageRating}/5` : "N/A"}
              </span>
              {volume.ratingsCount && (
                <span className="rating-count">({volume.ratingsCount} ratings)</span>
              )}
            </div>
          </div>

          <div className="detail-section">
            <h2>Price</h2>
            <p className="book-price">
              {saleInfo?.saleability === "FOR_SALE" ? (
                <>
                  {saleInfo.listPrice?.amount && (
                    <span className="original-price">
                      ₹{saleInfo.listPrice.amount}
                    </span>
                  )}
                  <span className="discounted-price">
                    ₹{saleInfo.retailPrice?.amount || "N/A"}
                  </span>
                  {saleInfo.buyLink && (
                    <a 
                      href={saleInfo.buyLink} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="buy-link"
                    >
                      Buy Now
                    </a>
                  )}
                </>
              ) : (
                "Not for sale"
              )}
            </p>
          </div>

          <div className="detail-section">
            <h2>Access Info</h2>
            <p className="book-access">
              <strong>Viewability:</strong> {accessInfo?.viewability || "N/A"}
              <br />
              <strong>PDF Available:</strong> {accessInfo?.pdf?.isAvailable ? "Yes" : "No"}
              <br />
              {accessInfo?.pdf?.acsTokenLink && (
                <a 
                  href={accessInfo.pdf.acsTokenLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="pdf-link"
                >
                  View Sample PDF
                </a>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetails;