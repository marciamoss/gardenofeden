import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { authDataInfo } from "../../store";

const HowItWorksModal = () => {
  const dispatch = useDispatch();
  const { showWorks } = useSelector((state) => state.authData);

  return (
    <>
      <Transition appear show={showWorks} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => {
            dispatch(
              authDataInfo({
                showMenu: false,
                showWorks: false,
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

          <div className="fixed inset-0 overflow-y-auto">
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
                <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-purple-50 max-[280px]:p-4 p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="max-[640px]:text-sm max-[280px]:text-xs text-lg font-serif font-medium leading-6 text-center"
                  >
                    How It Works
                  </Dialog.Title>
                  <div className="mt-2 font-serif">
                    <ul className="max-[640px]:text-sm max-[280px]:text-xs text-lg list-disc">
                      <li>
                        To join the effort at goTreeUrself, first register with
                        your information.
                      </li>
                      <li>
                        Then login, and our system will take you to your profile
                        page.
                      </li>
                      <li>
                        There you can upload a profile picture if you so choose,
                        and then start uploading photos of the trees you've
                        planted.
                      </li>
                      <li>
                        We will obtain the geotag information from your tree
                        image and grab the latitude and longitude of the tree.
                      </li>
                      <li>
                        If no geotag information is available, we will ask you
                        for the tree location information.
                      </li>
                      <li>
                        You can even name your tree and input the type of tree
                        you planted.
                      </li>
                      <li>
                        Your tree then gets pinned on the Google World Map on
                        the home page. It's just that easy!
                      </li>
                      <li>
                        On your profile page, you will be able to see all the
                        trees you have planted.
                      </li>
                    </ul>
                  </div>

                  <div className="mt-4 flex flex-col items-center">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border bg-green-300 border-2 border-black px-4 py-2 max-[280px]:text-xs text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => {
                        dispatch(
                          authDataInfo({
                            showMenu: false,
                            showWorks: false,
                          })
                        );
                      }}
                    >
                      Got it, thanks!
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

export default HowItWorksModal;
