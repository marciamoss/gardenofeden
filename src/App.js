import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Main from "./components/Main/Main";

const App = () => {
  const { showProfile } = useSelector((state) => state.authData);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path={"/"} element={<Main />} />
      </Routes>
      {!showProfile ? <Footer /> : ""}
    </Router>
  );
};

export default App;
