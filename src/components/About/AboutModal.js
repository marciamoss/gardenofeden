import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { authDataInfo } from "../../store";

const AboutModal = () => {
  const dispatch = useDispatch();
  const { showAbout } = useSelector((state) => state.authData);
  return (
    <>
      <Transition appear show={showAbout} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => {
            dispatch(
              authDataInfo({
                showMenu: false,
                showAbout: false,
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-purple-50 p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="max-[640px]:text-sm max-[280px]:text-xs text-lg font-serif font-medium leading-6 text-center"
                  >
                    About Us
                  </Dialog.Title>
                  <div className="mt-2 font-serif">
                    <p className="max-[640px]:text-sm max-[280px]:text-xs text-lg">
                      Deforestation is a major environmental problem globally.
                      It is the removal of trees from land to create space for
                      farms, ranches, or urban projects. In addition, fires like
                      the wildfires that have ravaged California, contributes to
                      deforestation. According to livescience.com an estimated
                      18 million acres of forest, roughly the size of the
                      country Panama are lost each year. These statistics come
                      from the United Nations' Food and Agriculture Organization
                      (FAO).
                    </p>
                  </div>

                  <div className="mt-4 flex flex-col items-center">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border bg-green-300 border-2 border-black px-4 py-2 max-[280px]:text-xs text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => {
                        dispatch(
                          authDataInfo({
                            showMenu: false,
                            showAbout: false,
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

export default AboutModal;
