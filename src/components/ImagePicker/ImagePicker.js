import React, { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { MdClose, MdAddToPhotos, MdOutlineArrowBack } from "react-icons/md";
import { userDataInfo } from "../../store";
import { useGetExifData, useImagePicker } from "../../hooks";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import "./style.css";
import Skeleton from "../Skeleton";
import Panel from "./Panel";

const ImagePicker = ({ showImagePicker, authUserId }) => {
  const dispatch = useDispatch();
  const pickerRef = useRef(null);
  const cropperRef = useRef(null);
  const { imageType } = useSelector((state) => state.userData);
  const [getImageGeoLocation] = useGetExifData();

  const [
    leftPanel,
    rightPanel,
    setDisablePreview,
    setDisableReset,
    imgLoading,
    setImgLoading,
    img,
    setImg,
    readImage,
  ] = useImagePicker({
    cropperRef,
    authUserId,
    imageType,
    pickerRef,
    getImageGeoLocation,
  });

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
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
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
                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all bg-gray-200 border-8 border-gray-600 border-dashed">
                  <button
                    type="button"
                    className="absolute right-0 top-0 p-2 outline-none hover:bg-gray-400"
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
                      className="absolute left-0 top-0 p-2 outline-none hover:bg-gray-400"
                      onClick={() => {
                        setImg("");
                        setImgLoading(false);
                        setDisablePreview(true);
                        setDisableReset(true);
                      }}
                    >
                      <MdOutlineArrowBack color="black" size={30} />
                    </button>
                  )}
                  <Dialog.Title
                    as="h3"
                    className="font-bold text-sm font-serif leading-6 text-center text-black"
                  >
                    {img?.image
                      ? "Use buttons on the left to edit image, buttons on the right to Reset/Preview/Save "
                      : "Click/Drag and drop image below"}
                  </Dialog.Title>
                  <div className="flex flex-row place-content-center">
                    {img && !img.imgTypeError && (
                      <Panel panelSide={leftPanel} />
                    )}
                    <div
                      className={`file-upload ${!img && "hover:bg-blue-100"}`}
                    >
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
                                File {img.name} is not an accepted file type.
                                The accepted file types are jpg,png,gif
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
                          <Cropper
                            src={
                              img?.croppedImage
                                ? `data:image/png;base64, ${img.croppedImage}`
                                : `data:image/png;base64, ${img.image}`
                            }
                            className="h-full w-full object-contain border-white border-2"
                            initialAspectRatio={16 / 9}
                            guides={false}
                            ref={cropperRef}
                            highlight={false}
                            dragMode={"none"}
                            movable={false}
                            ready={(event) => setImgLoading(false)}
                            autoCrop={false}
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
                            onChange={(event) => readImage(event)}
                          />
                        </>
                      )}
                    </div>
                    {img && !img.imgTypeError && (
                      <Panel panelSide={rightPanel} />
                    )}
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

export default ImagePicker;
