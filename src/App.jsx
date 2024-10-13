import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./components/MainPage/MainPage";
import NotFound from "./components/NotFound/NotFound";
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer.jsx";
import Cart from "./components/Cart/Cart.jsx";

function App() {
  return (
    <>
        <Header />
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
        <Footer />
    </>
  );
}

export default App;
