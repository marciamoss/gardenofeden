import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { MdClose } from "react-icons/md";

const MessageModal = ({
  showModal,
  dispatchType,
  message,
  modalColor,
  actionOnConfirm,
}) => {
  return (
    <>
      <Transition appear show={showModal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={dispatchType}>
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
                  className={`${modalColor} w-full max-w-md transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all`}
                >
                  <button
                    type="button"
                    className="absolute right-0 top-0 p-2 outline-none"
                    onClick={dispatchType}
                  >
                    <MdClose size={30} />
                  </button>
                  <Dialog.Title
                    as="h3"
                    className="max-[640px]:text-sm max-[280px]:text-xs break-words overflow-scroll mt-7 text-lg font-serif font-bold leading-6 text-center"
                  >
                    {message}
                  </Dialog.Title>
                  {message === "Are you sure you want to delete this image" ? (
                    <div className="flex flex-row place-content-center mt-3">
                      <button
                        onClick={actionOnConfirm}
                        className="max-[640px]:text-sm max-[280px]:text-xs break-words text-fuchsia-100 rounded-full bg-stone-700 hover:bg-stone-900 w-16 ml-3"
                      >
                        Yes
                      </button>
                      <button
                        onClick={dispatchType}
                        className="max-[640px]:text-sm max-[280px]:text-xs break-words text-fuchsia-100 rounded-full bg-yellow-800 hover:bg-yellow-900 w-16 ml-3"
                      >
                        No
                      </button>
                    </div>
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

export default MessageModal;
