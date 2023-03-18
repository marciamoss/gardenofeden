import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useSelector } from "react-redux";
import { useSaveUserProfileMutation } from "../../store";

const ProfileUpdateForm = ({ showProfileUpdate, setShowProfileUpdate }) => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [saveUserProfile] = useSaveUserProfileMutation();
  const { authUserId } = useSelector((state) => {
    return {
      authUserId: state.authData.authUserId,
    };
  });

  return (
    <>
      <Transition appear show={showProfileUpdate} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setShowProfileUpdate(false)}
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
                      setShowProfileUpdate(false);
                    }}
                  >
                    <div className="mt-2 font-serif">
                      <input
                        type="text"
                        className="h-14 w-full text-black pl-14 pr-20 rounded-lg z-0 focus:shadow focus:outline-none"
                        placeholder="Name"
                        value={name}
                        onChange={(event) => {
                          setName(event.target.value);
                        }}
                      />
                    </div>
                    <div className="mt-2 font-serif">
                      <input
                        type="text"
                        className="h-14 w-full text-black pl-14 pr-20 rounded-lg z-0 focus:shadow focus:outline-none"
                        placeholder="Location"
                        value={location}
                        onChange={(event) => {
                          setLocation(event.target.value);
                        }}
                      />
                    </div>
                    <div className="mt-2 font-serif">
                      <textarea
                        type="text"
                        className="h-40 w-full text-black pl-14 pr-20 rounded-lg z-0 focus:shadow focus:outline-none"
                        placeholder="About Me (limit 250 characters)"
                        value={bio}
                        maxLength="250"
                        onChange={(event) => {
                          setBio(event.target.value);
                        }}
                      />
                    </div>

                    <div className="mt-4">
                      <button
                        type="button"
                        disabled={!name && !location && !bio}
                        className={`${
                          !name && !location && !bio ? "bg-slate-400" : ""
                        } inline-flex float-left justify-center rounded-md border bg-green-300 border-2 border-black px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2`}
                        onClick={() => {
                          setShowProfileUpdate(false);
                          saveUserProfile({
                            edenUser: {
                              userId: authUserId,
                              name,
                              location,
                              bio,
                            },
                          });
                        }}
                      >
                        Submit
                      </button>
                      <button
                        type="button"
                        className="inline-flex float-right justify-center rounded-md border bg-green-300 border-2 border-black px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={() => setShowProfileUpdate(false)}
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
