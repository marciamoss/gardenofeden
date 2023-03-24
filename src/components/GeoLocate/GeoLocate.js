import React, { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useSelector, useDispatch } from "react-redux";
import "./GeoLocate.css";
import { MdClose } from "react-icons/md";
import { userDataInfo, useSaveUserTreesMutation } from "../../store";

import useTreeLocate from "../../hooks/use-tree-locate";

const GeoLocate = ({ showGeoLocate }) => {
  const dispatch = useDispatch();
  const { userId, tree_image_link } = useSelector(
    (state) => state.userData.tree
  );
  const [saveUserTrees, saveUserTreeResult] = useSaveUserTreesMutation();
  const [location, setLocation] = useState("");
  const [geocode, clear, latitude, longitude] = useTreeLocate();

  const handleLocation = () => geocode({ address: location });

  useEffect(() => {
    if (saveUserTreeResult.isSuccess) {
      dispatch(userDataInfo({ showGeoLocate: false }));
    }
    if (saveUserTreeResult.error) {
      dispatch(
        userDataInfo({
          imageUploadError: true,
        })
      );
    }
  }, [saveUserTreeResult, dispatch]);
  const savePin = () => {
    saveUserTrees({
      edenUserTrees: {
        userId,
        tree_image_link,
        latitude,
        longitude,
      },
    });
  };
  const handleClear = () => {
    setLocation("");
    clear();
  };

  return (
    <>
      <Transition appear show={showGeoLocate} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => {}}>
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
            <div className=" flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className=" w-full max-w-3xl transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all bg-sky-900">
                  <button
                    type="button"
                    className="absolute right-0 top-0 p-2 outline-none"
                    onClick={() => {
                      dispatch(userDataInfo({ showGeoLocate: false }));
                    }}
                  >
                    <MdClose size={30} />
                  </button>
                  <Dialog.Title
                    as="h3"
                    className="font-bold text-sm font-serif leading-6 text-center"
                  >
                    Click on the Map/Type in the adrress below and click "Save
                    Pin" when your tree is in desire location
                  </Dialog.Title>
                  <form onSubmit={(event) => event.preventDefault()}>
                    <input
                      type="text"
                      className="h-14 w-full text-black pl-14 pr-20 rounded-lg z-0 focus:shadow focus:outline-none"
                      placeholder="Location"
                      value={location}
                      onChange={(event) => {
                        setLocation(event.target.value);
                      }}
                    />
                    <div className="mt-1 mb-1">
                      <button
                        disabled={!location}
                        className={`${
                          !location
                            ? "bg-slate-500 text-slate-400"
                            : "bg-violet-50 text-violet-700 hover:bg-violet-100"
                        } ml-2 w-24 text-sm p-1 rounded-full text-sm font-semibold `}
                        onClick={handleLocation}
                      >
                        Find Location
                      </button>
                      <button
                        disabled={!(latitude && longitude)}
                        onClick={savePin}
                        className={`${
                          !(latitude && longitude)
                            ? "bg-slate-500 text-slate-400"
                            : "bg-violet-50 text-violet-700 hover:bg-violet-100"
                        } ml-2 w-24 text-sm p-1 rounded-full text-sm font-semibold `}
                      >
                        Save Pin
                      </button>
                      <button
                        className="ml-2 bg-violet-50 w-24 text-sm p-1 text-slate-500 rounded-full text-sm font-semibold text-violet-700 hover:bg-violet-100"
                        onClick={handleClear}
                      >
                        Clear
                      </button>
                    </div>
                  </form>
                  <div id="tree" className="mt-2 w-3xl h-96"></div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default GeoLocate;
