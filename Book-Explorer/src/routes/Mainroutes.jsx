import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import BookDetails from "../pages/BookDetails";
import Error from "../pages/Error";

function MainRoutes({ searchRef }) {
  return (
    <Routes>
      {/* routes contain multiple route */}
      <Route path="/" element={<Home searchRef={searchRef} />} />
      <Route path="/book/:id" element={<BookDetails />} />
      
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default MainRoutes;