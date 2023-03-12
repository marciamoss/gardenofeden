import React, { useState } from "react";
import { Link } from "react-router-dom";
import AboutModal from "../AboutModal";
import HowItWorksModal from "../HowItWorksModal";
import SigninModal from "../Signin/SigninModal";

const Header = () => {
  const [showAbout, setShowAbout] = useState(false);
  const [showWorks, setShowWorks] = useState(false);
  const [showSignin, setShowSignin] = useState(false);

  return (
    <nav className="py-6 px-10 w-full bg-black">
      <div className="flex justify-between items-center container mx-auto bg-black">
        <div>
          <Link to="/">
            <img
              className="h-7 w-7 float-left max-[640px]:h-5 max-[640px]:w-5"
              src={require(`../../images/tree-earth.png`)}
              alt="Tree menu-icon"
            />
            <h1 className="max-[640px]:text-sm text-lg text-zinc-50 font-bold float-left ml-1">
              Garden Of Eden
            </h1>
          </Link>
        </div>
        <div className="max-[640px]:text-sm text-lg text-zinc-50 font-bold">
          <button onClick={() => setShowAbout(true)}>WHY</button>
          {showAbout ? (
            <AboutModal showAbout={showAbout} setShowAbout={setShowAbout} />
          ) : (
            ""
          )}

          <button className="ml-10" onClick={() => setShowWorks(true)}>
            HOW
          </button>
          {showWorks ? (
            <HowItWorksModal
              showWorks={showWorks}
              setShowWorks={setShowWorks}
            />
          ) : (
            ""
          )}
          <button className="ml-10" onClick={() => setShowSignin(true)}>
            OK
          </button>
          {showSignin ? (
            <SigninModal
              showSignin={showSignin}
              setShowSignin={setShowSignin}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
