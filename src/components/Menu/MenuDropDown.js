import { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLogOutMutation, authDataInfo } from "../../store";
import AboutModal from "../About/AboutModal";
import HowItWorksModal from "../HowItWorks/HowItWorksModal";
import SigninModal from "../Signin/SigninModal";
import "./MenuDropDown.css";
import { Menu, Transition } from "@headlessui/react";
import { CgProfile } from "react-icons/cg";
import MessageModal from "../Message/MessageModal";

const MenuDropDown = ({ menuClicked }) => {
  const dispatch = useDispatch();
  const [logOut] = useLogOutMutation();
  const [showAbout, setShowAbout] = useState(false);
  const [showWorks, setShowWorks] = useState(false);
  const [showSignin, setShowSignin] = useState(false);
  const { authUserId, showProfile, loggedOutMessage } = useSelector((state) => {
    return {
      authUserId: state.authData.authUserId,
      showProfile: state.authData.showProfile,
      loggedOutMessage: state.authData.loggedOutMessage,
    };
  });
  const [signedIn, setSignedIn] = useState(
    JSON.parse(window.localStorage.getItem("gardenofeden"))?.authUserId
      ? true
      : false
  );

  useEffect(() => {
    setSignedIn(
      JSON.parse(window.localStorage.getItem("gardenofeden"))?.authUserId
        ? true
        : false
    );
    if (!signedIn) {
      dispatch(
        authDataInfo({
          signedIn: false,
          authUserId: null,
          showError: false,
          errorMessage: null,
          showWelcomeMessage: false,
          showProfile: false,
          loggedOutMessage: showProfile ? true : false,
        })
      );
    }
  }, [signedIn, menuClicked, dispatch, showProfile]);
  return (
    <>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1 ">
            {signedIn ? (
              <>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-violet-500 text-white" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm font-bold`}
                      onClick={() =>
                        dispatch(
                          authDataInfo({
                            showProfile: true,
                          })
                        )
                      }
                    >
                      <CgProfile size={20} className="mr-1" />
                      Profile
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-violet-500 text-white" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm font-bold`}
                      onClick={() => logOut({ email: authUserId })}
                    >
                      Logout
                    </button>
                  )}
                </Menu.Item>
              </>
            ) : (
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-violet-500 text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm font-bold`}
                    onClick={() => setShowSignin(true)}
                  >
                    Sign Up/In
                  </button>
                )}
              </Menu.Item>
            )}
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? "bg-violet-500 text-white" : "text-gray-900"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm font-bold`}
                  onClick={() => setShowAbout(true)}
                >
                  About
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? "bg-violet-500 text-white" : "text-gray-900"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm font-bold`}
                  onClick={() => setShowWorks(true)}
                >
                  How it works
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
      {showAbout ? (
        <AboutModal showAbout={showAbout} setShowAbout={setShowAbout} />
      ) : (
        ""
      )}
      {showWorks ? (
        <HowItWorksModal showWorks={showWorks} setShowWorks={setShowWorks} />
      ) : (
        ""
      )}
      {showSignin ? (
        <SigninModal showSignin={showSignin} setShowSignin={setShowSignin} />
      ) : (
        ""
      )}

      {loggedOutMessage ? (
        <MessageModal
          showModal={loggedOutMessage}
          dispatchType={() => {
            setShowSignin(true);
            dispatch(authDataInfo({ loggedOutMessage: false }));
          }}
          message={`You have been logged out from another session on this window, Login again`}
          modalColor={"bg-orange-900"}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default MenuDropDown;
