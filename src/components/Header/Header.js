import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AboutModal from "../About/AboutModal";
import HowItWorksModal from "../HowItWorks/HowItWorksModal";
import SigninModal from "../Signin/SigninModal";
import SigninEmailConfirmModal from "../Signin/SigninEmailConfirmModal";
import MessageModal from "../Message/MessageModal";
import { CgProfile } from "react-icons/cg";
import { authDataInfo } from "../../store";

import { useEmailLinkCompleteQuery } from "../../store";

const Header = () => {
  const dispatch = useDispatch();
  const [showAbout, setShowAbout] = useState(false);
  const [showWorks, setShowWorks] = useState(false);
  const [showSignin, setShowSignin] = useState(false);

  const {
    signedIn,
    showError,
    errorMessage,
    emailConfirm,
    emailSent,
    showWelcomeMessage,
  } = useSelector((state) => {
    return {
      signedIn: state.authData.signedIn,
      showError: state.authData.showError,
      errorMessage: state.authData.errorMessage,
      emailConfirm: state.authData.emailConfirm,
      emailSent: state.authData.emailSent,
      showWelcomeMessage: state.authData.showWelcomeMessage,
    };
  });

  useEmailLinkCompleteQuery({ signedIn });

  return (
    <nav className={`${signedIn ? "py-6 px-10" : ""} w-full bg-black`}>
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
        {signedIn ? (
          <>
            {showWelcomeMessage ? (
              <MessageModal
                showModal={showWelcomeMessage}
                dispatchType={() =>
                  dispatch(authDataInfo({ showWelcomeMessage: false }))
                }
                message={
                  "Welcome to Garden Of Eden. Please make yourself at home."
                }
                modalColor={"bg-green-900"}
              />
            ) : (
              ""
            )}
            <Link to="/profile">
              <CgProfile
                size={25}
                className="bg-white float-left mt-1 max-[640px]:mt-0"
              />
              <h1 className="max-[640px]:text-sm text-lg text-zinc-50 font-bold float-left ml-1">
                Profile
              </h1>
            </Link>
          </>
        ) : (
          <>
            <>
              {showError ? (
                <MessageModal
                  showModal={showError}
                  dispatchType={() =>
                    dispatch(authDataInfo({ showError: false }))
                  }
                  message={`${errorMessage}, Try again`}
                  modalColor={"bg-orange-900"}
                />
              ) : (
                ""
              )}
            </>
            <>
              {emailSent ? (
                <MessageModal
                  showModal={emailSent}
                  dispatchType={() =>
                    dispatch(authDataInfo({ emailSent: false }))
                  }
                  message={`Login link has been mailed to ${window.localStorage.getItem(
                    "EdenEmailForSignIn"
                  )}, Please click the link in the email to be signed in.`}
                  modalColor={"bg-green-900"}
                />
              ) : (
                ""
              )}
            </>
            <div className="max-[640px]:text-sm text-lg text-zinc-50 font-bold p-3">
              <button onClick={() => setShowAbout(true)}>WHY</button>
              {showAbout ? (
                <AboutModal showAbout={showAbout} setShowAbout={setShowAbout} />
              ) : (
                ""
              )}

              <button
                className="max-[640px]:text-sm text-lg text-zinc-50 font-bold p-3"
                onClick={() => setShowWorks(true)}
              >
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
              <button
                className="max-[640px]:text-sm text-lg text-zinc-50 font-bold p-3"
                onClick={() => setShowSignin(true)}
              >
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
              {emailConfirm ? (
                <SigninEmailConfirmModal emailConfirm={emailConfirm} />
              ) : (
                ""
              )}
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;
