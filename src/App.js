import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Main from "./components/Main/Main";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path={"/"} element={<Main />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
