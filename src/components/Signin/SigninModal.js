import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { useLogInMutation, authDataInfo } from "../../store";
import { MdClose } from "react-icons/md";

const SigninModal = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [signedUp] = useState(
    JSON.parse(window.localStorage.getItem("gardenofeden"))?.authUserId
  );
  const [userEmail] = useState(
    JSON.parse(window.localStorage.getItem("gardenofeden"))?.userEmail
  );
  const [logIn] = useLogInMutation();
  const { showSignin } = useSelector((state) => state.authData);

  return (
    <>
      <Transition appear show={showSignin} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => {
            dispatch(
              authDataInfo({
                showMenu: false,
                showSignin: false,
              })
            );
          }}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto text-white">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className={`${
                    signedUp ? "bg-red-900" : "bg-sky-900"
                  } w-full max-w-md transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all`}
                >
                  {signedUp ? (
                    <button
                      type="button"
                      className="absolute right-0 top-0 p-2 outline-none"
                      onClick={() => {
                        dispatch(
                          authDataInfo({
                            showMenu: false,
                            showSignin: false,
                          })
                        );
                      }}
                    >
                      <MdClose size={25} />
                    </button>
                  ) : (
                    ""
                  )}
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-serif font-medium leading-6 text-center"
                  >
                    {signedUp
                      ? `You are signed in as ${userEmail}, logout from this account if you want to login into a different account`
                      : "Sign Up/In"}
                  </Dialog.Title>
                  {!signedUp ? (
                    <form
                      onSubmit={(event) => {
                        event.preventDefault();
                        if (email) {
                          dispatch(
                            authDataInfo({
                              showMenu: false,
                              showSignin: false,
                            })
                          );
                          logIn({ email });
                        }
                      }}
                    >
                      <div className="mt-2 font-serif">
                        <input
                          type="text"
                          className="h-14 w-full text-black pl-14 pr-20 rounded-lg z-0 focus:shadow focus:outline-none"
                          placeholder="Email"
                          value={email}
                          onChange={(event) => {
                            setEmail(event.target.value.trim());
                          }}
                        />
                      </div>

                      <div className="mt-4">
                        <button
                          type="button"
                          disabled={!email}
                          className={`${
                            !email ? "bg-slate-400" : ""
                          } inline-flex float-left justify-center rounded-md border bg-green-300 border-2 border-black px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2`}
                          onClick={() => {
                            dispatch(
                              authDataInfo({
                                showMenu: false,
                                showSignin: false,
                              })
                            );
                            logIn({ email });
                          }}
                        >
                          Submit
                        </button>
                        <button
                          type="button"
                          className="inline-flex float-right justify-center rounded-md border bg-green-300 border-2 border-black px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          onClick={() => {
                            dispatch(
                              authDataInfo({
                                showMenu: false,
                                showSignin: false,
                              })
                            );
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    ""
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default SigninModal;
