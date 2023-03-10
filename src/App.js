import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path={"/"} element={<>Map</>} />
      </Routes>
    </Router>
  );
};

export default App;
