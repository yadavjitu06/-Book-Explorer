import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import ThemeContext from "./context/ThemeContext";
import MainRoutes from "./routes/Mainroutes";


function App() {
  const [theme, setTheme] = useState('dark');
  
  useEffect(() => {
    const userTheme = localStorage.getItem('app-theme');
    if(userTheme != null) {
      setTheme(userTheme);
    }
  }, []);

  
  
  return (
    <>
      <ThemeContext.Provider value={{theme, setTheme}}>
        <div id='app-wrapper' data-theme={theme}>
          <Navbar />
          <MainRoutes />
        </div> 
      </ThemeContext.Provider>
    </>
  );
}

export default App;