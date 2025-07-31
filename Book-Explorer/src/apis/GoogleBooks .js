export function searchBook(query){
    return `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=20`;
}
