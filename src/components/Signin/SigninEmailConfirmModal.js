import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useDispatch } from "react-redux";
import { authDataInfo, useSignInCompleteMutation } from "../../store";

const SigninConfirmModal = ({ emailConfirm }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [signInComplete] = useSignInCompleteMutation();

  return (
    <>
      <Transition appear show={emailConfirm} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => dispatch(authDataInfo({ emailConfirm: false }))}
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-orange-900 p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-serif font-medium leading-6 text-center"
                  >
                    Please confirm the email you initially signed up with
                  </Dialog.Title>
                  <form
                    onSubmit={(event) => {
                      event.preventDefault();
                      if (email) {
                        dispatch(
                          authDataInfo({
                            emailConfirm: false,
                            showError: false,
                            errorMessage: null,
                          })
                        );
                        signInComplete({ email });
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
                              emailConfirm: false,
                              showError: false,
                              errorMessage: null,
                            })
                          );
                          signInComplete({ email });
                        }}
                      >
                        Submit
                      </button>
                      <button
                        type="button"
                        className="inline-flex float-right justify-center rounded-md border bg-green-300 border-2 border-black px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={() =>
                          dispatch(authDataInfo({ emailConfirm: false }))
                        }
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

export default SigninConfirmModal;
