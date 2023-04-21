import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useSelector, useDispatch } from "react-redux";
import { MdClose } from "react-icons/md";
import { useImageUpload } from "../../hooks";
import { userDataInfo } from "../../store";

const TreeUpdateForm = () => {
  const dispatch = useDispatch();
  const [openImageUploader] = useImageUpload();
  const { tree, showTreeUpdateForm } = useSelector((state) => state.userData);
  const { authUserId } = useSelector((state) => state.authData);
  return (
    <>
      <Transition appear show={showTreeUpdateForm} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() =>
            dispatch(
              userDataInfo({
                imageType: "",
                tree: "",
                showTreeUpdateForm: false,
              })
            )
          }
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
                <Dialog.Panel className="bg-stone-600 w-full max-w-lg transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all">
                  <button
                    type="button"
                    className="absolute right-0 top-0 p-2 outline-none"
                    onClick={() => {
                      dispatch(
                        userDataInfo({
                          imageType: "",
                          tree: "",
                          showTreeUpdateForm: false,
                        })
                      );
                    }}
                  >
                    <MdClose size={30} />
                  </button>
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-serif leading-6 text-center"
                  >
                    Update{" "}
                    {tree.users_tree_name ? tree.users_tree_name : "your tree"}
                  </Dialog.Title>
                  <div className="flex flex-row place-content-center mt-3">
                    <div className="self-center">
                      <button
                        className="text-fuchsia-100 font-bold rounded-full bg-slate-500 hover:bg-sky-700 w-24"
                        onClick={() => {
                          openImageUploader({
                            authUserId,
                            imageType: "update_Tree",
                          });
                        }}
                      >
                        Update Image?
                      </button>
                    </div>
                    <div className="self-center">
                      <button
                        onClick={() => {
                          dispatch(
                            userDataInfo({
                              showGeoLocate: true,
                            })
                          );
                        }}
                        className="text-fuchsia-100 font-bold rounded-full bg-slate-500 hover:bg-sky-700 w-24 ml-3"
                      >
                        Update Details?
                      </button>
                    </div>
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
export default TreeUpdateForm;
