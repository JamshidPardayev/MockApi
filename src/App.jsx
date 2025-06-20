import { Link, Route, Routes } from "react-router-dom";
import Blog from "./pages/Blog";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
const App = () => {

  
  return (
    <div>
      <Header/>
      <Routes>
        Route
        <Route path="/blog" element={<Blog />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
