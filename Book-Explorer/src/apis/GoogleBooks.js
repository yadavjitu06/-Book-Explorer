export function searchBook(query) {
  return `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=20`;
}

export function searchBookById(id) {
  return `https://www.googleapis.com/books/v1/volumes/${id}`;
}