import React, { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useDispatch } from "react-redux";
import { MdClose } from "react-icons/md";
import { CgSpinnerTwoAlt } from "react-icons/cg";
import { userDataInfo } from "../../store";
import { useUpdateTree } from "../../hooks";

const GeoLocate = ({ showGeoLocate }) => {
  const dispatch = useDispatch();
  const geoRef = useRef(null);
  const [
    latitude_exif,
    longitude_exif,
    checkAuthStatus,
    location,
    setLocation,
    authUserId,
    setActionType,
    treeImageLink,
    usersTreeName,
    setUsersTreeName,
    datePlanted,
    setDatePlanted,
    latitude,
    longitude,
  ] = useUpdateTree();
  const [loading, setLoading] = useState(false);
  return (
    <>
      <Transition appear show={showGeoLocate} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => false}>
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
                    className={`absolute right-0 top-0 p-2 outline-none ${
                      loading ? "hidden" : ""
                    }`}
                    onClick={() =>
                      dispatch(
                        userDataInfo({
                          showGeoLocate: false,
                          image: "",
                          imageType: "",
                          tree: "",
                        })
                      )
                    }
                  >
                    <MdClose size={30} />
                  </button>
                  <Dialog.Title
                    as="h3"
                    className={`font-bold text-sm font-serif leading-6 text-center ${
                      loading ? "hidden" : ""
                    }`}
                  >
                    Click on the Map/Type in the adrress below and click
                    "Save/Update" when your tree is in desired location.
                    {latitude_exif && longitude_exif ? (
                      <p className="text-yellow-400">
                        location was extracted from the image, move the pin or
                        save as is, if you so choose
                      </p>
                    ) : (
                      ""
                    )}
                  </Dialog.Title>
                  <form onSubmit={(event) => event.preventDefault()}>
                    {loading ? (
                      <div className="flex flex-col place-content-center w-full h-96 border-2">
                        <div className="self-center font-bold text-xl">
                          Saving...
                        </div>
                        <CgSpinnerTwoAlt
                          className="self-center animate-spin"
                          size={100}
                        />
                      </div>
                    ) : (
                      <div className="grid grid-rows-4 grid-cols-9 gap-1">
                        <input
                          type="text"
                          className="col-span-9 row-span-1 max-[640px]:text-sm h-8 w-full text-black pl-2 pr-0 rounded-lg z-0 focus:shadow focus:outline-none"
                          placeholder="Location"
                          value={location}
                          onChange={(event) => {
                            setActionType("");
                            setLocation(event.target.value);
                          }}
                        />
                        <div className="max-[640px]:text-sm mt-1 col-span-8 h-fit row-span-1 rounded-md text-sm text-yellow-400 text-center">
                          --Date planted & Tree Name are Optional--
                        </div>
                        <button
                          type="button"
                          ref={geoRef}
                          onClick={() => {
                            checkAuthStatus({ authUserId });
                            geoRef.current.blur();
                            setActionType("image_upload");
                          }}
                          className="ml-1 col-span-1 row-span-2 flex flex-row place-content-center rounded-md border-2 w-full h-full text-black relative group"
                        >
                          <img
                            src={treeImageLink}
                            className="self-center h-14 w-14 max-[640px]:h-5 max-[640px]:w-5"
                            alt="Tree"
                          />
                          <div className="rounded-md opacity-0 group-hover:opacity-75 duration-300 absolute inset-y-0 top-0 flex justify-center items-center text-xs bg-green-100 text-black font-semibold">
                            Update Image
                          </div>
                        </button>
                        <input
                          type="text"
                          className="col-span-4 row-span-1 max-[640px]:text-sm ml-2 pl-2 h-8 text-black rounded-md z-0 focus:shadow focus:outline-none"
                          placeholder="Tree Name(15 Char max)"
                          value={usersTreeName}
                          maxLength="15"
                          onChange={(event) => {
                            setActionType("");
                            setUsersTreeName(event.target.value);
                          }}
                        />
                        <input
                          type="date"
                          className={`${
                            datePlanted ? "text-black" : "text-gray-400"
                          } col-span-4 row-span-1 max-[640px]:text-sm h-8 w-full pl-2 pr-0 rounded-lg z-0 focus:shadow focus:outline-none`}
                          placeholder="Date Planted"
                          value={datePlanted}
                          onChange={(event) => {
                            setActionType("");
                            setDatePlanted(event.target.value);
                          }}
                        />
                        <div className="mt-2 col-span-9 row-span-1 rounded-md">
                          <button
                            type="button"
                            disabled={!location}
                            className={`${
                              !location
                                ? "bg-slate-500 text-slate-400"
                                : "bg-violet-50 text-violet-700 hover:bg-violet-100"
                            } ml-2 w-24 text-sm p-1 rounded-full text-sm font-semibold max-[640px]:text-sm`}
                            onClick={() => {
                              checkAuthStatus({ authUserId });
                              setActionType("locate");
                            }}
                          >
                            Find Location
                          </button>
                          <button
                            type="button"
                            disabled={
                              !(latitude && longitude) &&
                              !(latitude_exif && longitude_exif)
                            }
                            onClick={() => {
                              checkAuthStatus({ authUserId });
                              setActionType("save");
                              setLoading(true);
                            }}
                            className={`${
                              !(latitude && longitude) &&
                              !(latitude_exif && longitude_exif)
                                ? "bg-slate-500 text-slate-400"
                                : "bg-violet-50 text-violet-700 hover:bg-violet-100"
                            } ml-2 w-24 text-sm p-1 rounded-full text-sm font-semibold max-[640px]:text-sm`}
                          >
                            Save/Update
                          </button>
                          <button
                            type="button"
                            className="ml-2 bg-violet-50 w-24 text-sm p-1 text-slate-500 rounded-full text-sm font-semibold text-violet-700 hover:bg-violet-100 max-[640px]:text-sm"
                            onClick={() => {
                              checkAuthStatus({ authUserId });
                              setActionType("clear_fields");
                            }}
                          >
                            Clear
                          </button>
                        </div>
                      </div>
                    )}
                  </form>

                  <div
                    id="tree"
                    className={`mt-2 w-3xl h-96 ${loading ? "hidden" : ""}`}
                  ></div>
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
