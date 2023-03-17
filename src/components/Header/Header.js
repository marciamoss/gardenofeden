import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SigninEmailConfirmModal from "../Signin/SigninEmailConfirmModal";
import MessageModal from "../Message/MessageModal";
import MenuDropDown from "../Menu/MenuDropDown";
import { authDataInfo } from "../../store";
import { useEmailLinkCompleteQuery } from "../../store";
import { ImMenu } from "react-icons/im";
import { GoChevronDown } from "react-icons/go";
import { Menu } from "@headlessui/react";
const logo = require(`../../images/tree-earth.png`);

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [menuClicked, setMenuClicked] = useState(false);

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
      authUserId: state.authData.authUserId,
    };
  });
  useEmailLinkCompleteQuery({ signedIn });

  return (
    <nav className="py-3 px-10 w-full bg-black">
      <div className="flex justify-between items-center container mx-auto bg-black">
        <div className="float-left">
          <button
            onClick={() => dispatch(authDataInfo({ showProfile: false }))}
          >
            <img
              className="h-7 w-7 float-left max-[640px]:h-5 max-[640px]:w-5"
              src={logo}
              alt="Tree menu-icon"
            />
            <h1 className="max-[640px]:text-sm text-lg text-zinc-50 font-bold float-left ml-1">
              Garden Of Eden
            </h1>
          </button>
        </div>

        <div className="text-right">
          <Menu
            as="div"
            className="relative inline-block text-left float-right z-30"
          >
            <div>
              <Menu.Button
                onClick={() => {
                  setMenuClicked(!menuClicked);
                }}
                className="inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
              >
                <ImMenu size={30} />
                <GoChevronDown />
              </Menu.Button>
            </div>
            <MenuDropDown
              className="text-right z-40"
              menuClicked={menuClicked}
            />
          </Menu>
        </div>

        {signedIn ? (
          <>
            {showWelcomeMessage ? (
              <MessageModal
                showModal={showWelcomeMessage}
                dispatchType={() => {
                  dispatch(authDataInfo({ showWelcomeMessage: false }));
                  navigate("");
                }}
                message={
                  "Welcome to Garden Of Eden. Please make yourself at home."
                }
                modalColor={"bg-green-900"}
              />
            ) : (
              ""
            )}
          </>
        ) : (
          <>
            <>
              {showError ? (
                <MessageModal
                  showModal={showError}
                  dispatchType={() => {
                    dispatch(authDataInfo({ showError: false }));
                    navigate("");
                  }}
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
            {emailConfirm ? (
              <SigninEmailConfirmModal emailConfirm={emailConfirm} />
            ) : (
              ""
            )}
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;
