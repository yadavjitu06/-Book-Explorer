import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import MainRoutes from "./routes/Mainroutes";
import { useRef } from "react";

function App() {
  const searchRef = useRef();

  
  const handleSearchClick = () => {
    if (searchRef.current) {
      searchRef.current.focusInput(); 
      console.log("Search bar pe focus gaya! 🎉");
    } else {
      console.log("Arre bhai, searchRef nahi mila! 😞");
    }
  };

  return (
    <>
      <Navbar onSearchClick={handleSearchClick} />
      <MainRoutes searchRef={searchRef} /> 
    </>
  );
}

export default App;