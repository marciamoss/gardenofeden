import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLogOutMutation, authDataInfo } from "../../store";
import "./MenuDropDown.css";
import { Menu, Transition } from "@headlessui/react";
import { CgProfile } from "react-icons/cg";

const MenuDropDown = () => {
  const dispatch = useDispatch();
  const [logOut] = useLogOutMutation();
  const { authUserId } = useSelector((state) => state.authData);
  const [signedIn] = useState(
    JSON.parse(window.localStorage.getItem("gardenofeden"))?.authUserId
      ? true
      : false
  );

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
                      onClick={() => {
                        dispatch(
                          authDataInfo({
                            showProfile: true,
                            showMenu: false,
                          })
                        );
                      }}
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
                      onClick={() => {
                        dispatch(
                          authDataInfo({
                            showMenu: false,
                          })
                        );
                        logOut({ uid: authUserId });
                      }}
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
                    onClick={() =>
                      dispatch(
                        authDataInfo({
                          showSignin: true,
                        })
                      )
                    }
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
                  onClick={() => {
                    dispatch(
                      authDataInfo({
                        showAbout: true,
                      })
                    );
                  }}
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
                  onClick={() =>
                    dispatch(
                      authDataInfo({
                        showWorks: true,
                      })
                    )
                  }
                >
                  How it works
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </>
  );
};

export default MenuDropDown;
