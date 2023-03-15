import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { DEFAULTCOMPONENTS, SIGNEDINCOMPONENTS } from "./constants/routes";

const App = () => {
  const { signedIn } = useSelector((state) => {
    return {
      signedIn: state.authData.signedIn,
    };
  });
  return (
    <Router>
      <Routes>
        {DEFAULTCOMPONENTS.map((rt) => (
          <Route key={rt.r} path={rt.r} element={rt.p} />
        ))}
        {signedIn
          ? SIGNEDINCOMPONENTS.map((rt) => (
              <Route key={rt.r} path={rt.r} element={rt.p} />
            ))
          : ""}
      </Routes>
    </Router>
  );
};

export default App;
