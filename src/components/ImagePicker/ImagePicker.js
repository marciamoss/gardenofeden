import React, { Fragment, useState, useRef, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { MdClose, MdAddToPhotos, MdOutlineArrowBack } from "react-icons/md";
import { userDataInfo } from "../../store";
import { useGetExifData } from "../../hooks";
import "./style.css";
import Skeleton from "../Skeleton";
const Buffer = require("buffer/").Buffer;

const ImagePicker = ({ showImagePicker, authUserId }) => {
  const pickerRef = useRef(null);
  const { imageType } = useSelector((state) => state.userData);
  const [getImageGeoLocation] = useGetExifData();
  const dispatch = useDispatch();
  const [img, setImg] = useState("");
  const [imgLoading, setImgLoading] = useState(false);

  useEffect(() => {
    if (pickerRef.current) {
      pickerRef.current.focus();
    }
  }, []);
  return (
    <>
      <Transition appear show={showImagePicker} as={Fragment}>
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
                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all bg-gray-200 border-8 border-gray-600 border-dashed ">
                  <button
                    type="button"
                    className="absolute right-0 top-0 p-2 outline-none"
                    onClick={() => {
                      dispatch(
                        userDataInfo({
                          showImagePicker: false,
                          image: "",
                          imageType: "",
                          tree: "",
                          imageLoading: false,
                        })
                      );
                    }}
                  >
                    <MdClose color="black" size={30} />
                  </button>
                  {img && (
                    <button
                      type="button"
                      className="absolute left-0 top-0 p-2 outline-none"
                      onClick={() => {
                        setImg("");
                        setImgLoading(false);
                      }}
                    >
                      <MdOutlineArrowBack color="black" size={30} />
                    </button>
                  )}
                  <Dialog.Title
                    as="h3"
                    className="font-bold text-sm font-serif leading-6 text-center text-black"
                  >
                    Click/Drag and drop image below
                  </Dialog.Title>
                  <div className="file-upload">
                    {imgLoading && (
                      <Skeleton
                        times={1}
                        className="h-full w-full object-contain border-white border-2"
                      />
                    )}
                    {img ? (
                      img.imgTypeError ? (
                        <div className="place-content-center flex flex-row h-full w-full text-center bg-orange-900">
                          <div className="self-center">
                            <p>
                              File {img.name} is not an accepted file type. The
                              accepted file types are jpg,png,gif
                            </p>
                            <button
                              type="button"
                              className="p-2 rounded-full bg-teal-600"
                              onClick={() => {
                                setImg("");
                                setImgLoading(false);
                              }}
                            >
                              Try Again
                            </button>
                          </div>
                        </div>
                      ) : (
                        <img
                          className="h-full w-full object-contain border-white border-2"
                          src={`data:image/png;base64, ${img.image}`}
                          alt="Tree"
                        />
                      )
                    ) : (
                      <>
                        <MdAddToPhotos color="grey" className="upload-icon" />
                        <input
                          ref={pickerRef}
                          type="file"
                          name="somename"
                          accept="image/*"
                          capture="camera"
                          onChange={(event) => {
                            const { target } = event;
                            const { files } = target;
                            if (files && files[0]) {
                              if (
                                ["image/jpeg", "image/png", "image/gif"].filter(
                                  (r) => r === files[0]?.type?.toLowerCase()
                                ).length === 0
                              ) {
                                setImg({
                                  name: files[0].name,
                                  imgTypeError: true,
                                });
                                setImgLoading(false);
                                return;
                              }

                              var reader = new FileReader();
                              setImgLoading(true);
                              reader.onload = (event) => {
                                const imgArrayBuffer = event.target.result;
                                const base64String =
                                  Buffer.from(imgArrayBuffer).toString(
                                    "base64"
                                  );
                                let latitude;
                                let longitude;
                                if (imageType === "trees") {
                                  const { lat, lng } =
                                    getImageGeoLocation(imgArrayBuffer);
                                  latitude = lat;
                                  longitude = lng;
                                }
                                setImg({
                                  image: base64String,
                                  authUserId,
                                  imageType,
                                  latitude,
                                  longitude,
                                  name: files[0].name,
                                  imgTypeError: false,
                                });
                                setImgLoading(false);
                              };
                              reader.onerror = (error) => {
                                setImg("");
                                setImgLoading(false);
                              };
                              reader.readAsArrayBuffer(files[0]);
                            }
                          }}
                        />
                      </>
                    )}
                  </div>
                  {img && !img.imgTypeError && (
                    <div className="flex flex-row place-content-center">
                      <button
                        type="button"
                        className="self-center p-2 rounded-full bg-teal-600"
                        onClick={() => {
                          dispatch(
                            userDataInfo({
                              showImagePicker: false,
                              image: {
                                image: img.image,
                                authUserId,
                                imageType,
                                latitude: img.latitude,
                                longitude: img.longitude,
                              },
                            })
                          );
                        }}
                      >
                        Upload
                      </button>
                    </div>
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

export default ImagePicker;
