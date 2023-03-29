import React, { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useSelector, useDispatch } from "react-redux";
import { MdClose } from "react-icons/md";
import {
  authDataInfo,
  userDataInfo,
  useSaveUserTreesMutation,
} from "../../store";

import useTreeLocate from "../../hooks/use-tree-locate";

const GeoLocate = ({ showGeoLocate }) => {
  const dispatch = useDispatch();
  const {
    userId,
    tree_image_link,
    latitude_exif,
    longitude_exif,
    _id,
    date_planted,
    users_tree_name,
    geoAddress,
  } = useSelector((state) => state.userData.tree);

  const [saveUserTrees, saveUserTreeResult] = useSaveUserTreesMutation();
  const [location, setLocation] = useState(geoAddress || "");
  const [datePlanted, setDatePlanted] = useState(date_planted || "");
  const [usersTreeName, setUsersTreeName] = useState(users_tree_name || "");
  const [geocode, clear, latitude, longitude, approximateGeoAddress] =
    useTreeLocate();
  const handleLocation = () => geocode({ address: location });

  useEffect(() => {
    if (saveUserTreeResult.isSuccess) {
      dispatch(
        userDataInfo({
          showGeoLocate: false,
          showTreeUpdateForm: false,
          image: "",
          imageType: "",
          tree: "",
        })
      );
      dispatch(
        authDataInfo({
          showProfile: false,
        })
      );
    }
    if (saveUserTreeResult.error) {
      dispatch(
        userDataInfo({
          imageUploadError: true,
        })
      );
    }
  }, [saveUserTreeResult, dispatch]);

  useEffect(() => {
    if (approximateGeoAddress) {
      setLocation(approximateGeoAddress);
    }
  }, [approximateGeoAddress]);

  const savePin = () => {
    saveUserTrees({
      edenUserTrees: {
        _id,
        userId,
        tree_image_link,
        latitude: latitude,
        longitude: longitude,
        geoAddress: approximateGeoAddress,
        users_tree_name: usersTreeName,
        date_planted: datePlanted,
      },
    });
  };
  const handleClear = () => {
    setLocation("");
    setDatePlanted("");
    setUsersTreeName("");
    clear();
  };

  return (
    <>
      <Transition appear show={showGeoLocate} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => {
            dispatch(
              userDataInfo({
                showGeoLocate: false,
                showTreeUpdateForm: false,
                image: "",
                imageType: "",
                tree: "",
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
                      dispatch(
                        userDataInfo({
                          showGeoLocate: false,
                          showTreeUpdateForm: false,
                          image: "",
                          imageType: "",
                          tree: "",
                        })
                      );
                    }}
                  >
                    <MdClose size={30} />
                  </button>
                  <Dialog.Title
                    as="h3"
                    className="font-bold text-sm font-serif leading-6 text-center"
                  >
                    Click on the Map/Type in the adrress below and click "Save
                    Pin" when your tree is in desire location.
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
                    <input
                      type="text"
                      className="h-8 w-full text-black pl-2 pr-0 rounded-lg z-0 focus:shadow focus:outline-none"
                      placeholder="Location"
                      value={location}
                      onChange={(event) => {
                        setLocation(event.target.value);
                      }}
                    />
                    <div className="mt-1 text-yellow-400">
                      --Date & Name are Optional fields--
                    </div>
                    <input
                      type="date"
                      className={`${
                        datePlanted ? "text-black" : "text-gray-400"
                      } mt-1 h-8 w-1/3 pl-2 pr-0 rounded-lg z-0 focus:shadow focus:outline-none`}
                      placeholder="Date Planted"
                      value={datePlanted}
                      onChange={(event) => setDatePlanted(event.target.value)}
                    />
                    <input
                      type="text"
                      className="mt-1 ml-2 h-8 w-1/2 right-0 text-black pl-2 pr-0 rounded-lg z-0 focus:shadow focus:outline-none"
                      placeholder="Tree Name(15 Char max)"
                      value={usersTreeName}
                      maxLength="15"
                      onChange={(event) => setUsersTreeName(event.target.value)}
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
                        disabled={
                          !(latitude && longitude) &&
                          !(latitude_exif && longitude_exif)
                        }
                        onClick={savePin}
                        className={`${
                          !(latitude && longitude) &&
                          !(latitude_exif && longitude_exif)
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
