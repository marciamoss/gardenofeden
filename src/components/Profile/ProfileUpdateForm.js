import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useSelector, useDispatch } from "react-redux";
import { useSaveProfile } from "../../hooks";
import { userDataInfo } from "../../store";

const ProfileUpdateForm = ({ name, location, bio }) => {
  const dispatch = useDispatch();
  const [updatedName, setUpdatedName] = useState(name || "");
  const [updatedLocation, setUpdatedLocation] = useState(location || "");
  const [updatedBio, setUpdatedBio] = useState(bio || "");
  const [saveUserProfile] = useSaveProfile();
  const { authUserId, showProfileUpdateForm } = useSelector((state) => {
    return {
      authUserId: state.authData.authUserId,
      showProfileUpdateForm: state.userData.showProfileUpdateForm,
    };
  });

  return (
    <>
      <Transition appear show={showProfileUpdateForm} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() =>
            dispatch(
              userDataInfo({
                showProfileUpdateForm: false,
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
                <Dialog.Panel className="bg-sky-900 w-full max-w-3xl transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-serif font-medium leading-6 text-center"
                  >
                    Profile
                  </Dialog.Title>
                  <form
                    onSubmit={(event) => {
                      event.preventDefault();
                      dispatch(
                        userDataInfo({
                          showProfileUpdateForm: false,
                        })
                      );
                    }}
                  >
                    <div className="mt-2 font-serif">
                      <input
                        type="text"
                        className="h-14 w-full text-black pl-14 pr-20 rounded-lg z-0 focus:shadow focus:outline-none"
                        placeholder="Name"
                        value={updatedName}
                        onChange={(event) => {
                          setUpdatedName(event.target.value);
                        }}
                      />
                    </div>
                    <div className="mt-2 font-serif">
                      <input
                        type="text"
                        className="h-14 w-full text-black pl-14 pr-20 rounded-lg z-0 focus:shadow focus:outline-none"
                        placeholder="Location"
                        value={updatedLocation}
                        onChange={(event) => {
                          setUpdatedLocation(event.target.value);
                        }}
                      />
                    </div>
                    <div className="mt-2 font-serif">
                      <textarea
                        type="text"
                        className="h-40 w-full text-black pl-14 pr-20 rounded-lg z-0 focus:shadow focus:outline-none"
                        placeholder="About Me (limit 250 characters)"
                        value={updatedBio}
                        maxLength="250"
                        onChange={(event) => {
                          setUpdatedBio(event.target.value);
                        }}
                      />
                    </div>

                    <div className="mt-4">
                      <button
                        type="button"
                        disabled={
                          !updatedName && !updatedLocation && !updatedBio
                        }
                        className={`${
                          !updatedName && !updatedLocation && !updatedBio
                            ? "bg-slate-400"
                            : ""
                        } inline-flex float-left justify-center rounded-md border bg-green-300 border-2 border-black px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2`}
                        onClick={() => {
                          saveUserProfile({
                            edenUser: {
                              userId: authUserId,
                              name: updatedName,
                              location: updatedLocation,
                              bio: updatedBio,
                            },
                          });
                        }}
                      >
                        Submit
                      </button>
                      <button
                        type="button"
                        className="inline-flex float-right justify-center rounded-md border bg-green-300 border-2 border-black px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={() =>
                          dispatch(
                            userDataInfo({
                              showProfileUpdateForm: false,
                            })
                          )
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

export default ProfileUpdateForm;
