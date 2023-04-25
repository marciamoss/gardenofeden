import React, { Fragment, useState, useEffect, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  useLogInMutation,
  authDataInfo,
  useCheckAuthStatusMutation,
} from "../../store";
import { MdClose } from "react-icons/md";

const SigninModal = () => {
  const dispatch = useDispatch();
  const emailRef = useRef(null);
  const [checkAuthStatus, checkAuthStatusResult] = useCheckAuthStatusMutation();
  const [email, setEmail] = useState("");
  const [logIn] = useLogInMutation();
  const { showSignin, authUserId } = useSelector((state) => state.authData);
  useEffect(() => {
    if (emailRef.current) {
      emailRef.current.focus();
    }
  }, []);
  useEffect(() => {
    if (checkAuthStatusResult.isSuccess) {
      dispatch(
        authDataInfo({
          showMenu: false,
          showSignin: false,
        })
      );
      if (!authUserId && email) {
        logIn({ email });
      }
    }
  }, [checkAuthStatusResult, authUserId, dispatch, email, logIn]);
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
                <Dialog.Panel className="bg-sky-900 w-full max-w-md transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all">
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
                  <Dialog.Title
                    as="h3"
                    className="max-[640px]:text-sm max-[280px]:text-xs text-lg font-serif font-medium leading-6 text-center"
                  >
                    Sign Up/In
                  </Dialog.Title>
                  <form
                    onSubmit={(event) => {
                      event.preventDefault();
                      checkAuthStatus({ authUserId });
                    }}
                  >
                    <div className="mt-2 font-serif">
                      <input
                        ref={emailRef}
                        type="text"
                        className="h-14 max-[280px]:text-xs max-[280px]:h-10 w-full text-black pl-2 pr-2 rounded-lg z-0 focus:shadow focus:outline-none"
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
                        } max-[280px]:text-xs inline-flex float-left justify-center rounded-md border bg-green-300 border-2 border-black max-[280px]:px-2 max-[280px]:py-1 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2`}
                        onClick={() => checkAuthStatus({ authUserId })}
                      >
                        Submit
                      </button>
                      <button
                        type="button"
                        className="max-[280px]:text-xs inline-flex float-right justify-center rounded-md border bg-green-300 border-2 border-black max-[280px]:px-2 max-[280px]:py-1 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
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
