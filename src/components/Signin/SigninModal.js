import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

const SigninModal = ({ showSignin, setShowSignin }) => {
  return (
    <>
      <Transition appear show={showSignin} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setShowSignin(false)}
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-sky-900 p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-serif font-medium leading-6 text-center"
                  >
                    Sign Up/In
                  </Dialog.Title>
                  <div className="mt-2 font-serif">
                    <input
                      type="text"
                      className="h-14 w-full pl-14 pr-20 rounded-lg z-0 focus:shadow focus:outline-none"
                      placeholder="Email"
                      value=""
                      onChange={(event) => {
                        console.log("email", event.target.value);
                      }}
                    />
                    <input
                      type="text"
                      className="mt-2 h-14 w-full pl-14 pr-20 rounded-lg z-0 focus:shadow focus:outline-none"
                      placeholder="Password"
                      value=""
                      onChange={(event) => {
                        console.log("password", event.target.value);
                      }}
                    />
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex float-left justify-center rounded-md border bg-green-300 border-2 border-black px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => {
                        console.log("signin clicked");
                        setShowSignin(false);
                      }}
                    >
                      Submit
                    </button>
                    <button
                      type="button"
                      className="inline-flex float-right justify-center rounded-md border bg-green-300 border-2 border-black px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => setShowSignin(false)}
                    >
                      Cancel
                    </button>
                  </div>
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
