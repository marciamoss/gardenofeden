import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Profile.css";
import { Card, CardHeader, CardBody } from "@material-tailwind/react";
import { CgProfile } from "react-icons/cg";
import { RiGalleryUploadFill, RiDeleteBin2Fill } from "react-icons/ri";
import TreeUpload from "../TreeUpload/TreeUpload";
import ProfileUpdateForm from "./ProfileUpdateForm";
import { userDataInfo } from "../../store";
import {
  useCheckLoginStatus,
  useImageUpload,
  useGetProfile,
} from "../../hooks";

const Profile = () => {
  const dispatch = useDispatch();
  const { authUserId, showProfileUpdateForm } = useSelector((state) => {
    return {
      authUserId: state.authData.authUserId,
      showProfileUpdateForm: state.userData.showProfileUpdateForm,
    };
  });
  const [name, location, bio, profile_image_link, isFetching, isLoading] =
    useGetProfile({
      authUserId,
    });
  const [openImageUploader, saveUserImageResult] = useImageUpload();

  useCheckLoginStatus();

  return (
    <div
      id="profile"
      className="profile-body mx-auto text-center flex flex-row max-[640px]:text-sm max-[280px]:text-xs"
    >
      <Card className="rounded-3xl mt-10 h-5/6 w-1/5 ml-5 float-left bg-purple-50">
        <CardHeader floated={false} className="h-2/4 m-2">
          <div
            className={`${
              isLoading ? "animate-pulse bg-stone-900" : ""
            } h-3/4 border-2 border-white`}
          >
            {profile_image_link ? (
              <img
                src={profile_image_link}
                alt="profile"
                className={`place-content-center ${
                  saveUserImageResult.status === "pending" || isFetching
                    ? "animate-pulse"
                    : ""
                }`}
              />
            ) : (
              <CgProfile
                className={`${
                  isLoading ? "hidden" : ""
                } place-content-center w-full h-full h-1/4`}
              />
            )}
          </div>
          <div className="bg-purple-50 h-1/4 flex flex-row place-content-center">
            <div className="self-center">
              <button
                className="bg-green-50 w-fit text-sm p-1 rounded-full text-sm font-semibold text-green-900 hover:bg-green-100"
                disabled={
                  saveUserImageResult.status === "pending" || isFetching
                }
                onClick={() =>
                  openImageUploader({ authUserId, imageType: "user" })
                }
              >
                <div className="relative group">
                  <RiGalleryUploadFill size={30} />
                  <div className="rounded-2xl bg-black w-16 opacity-0 group-hover:opacity-100 duration-300 absolute flex justify-center items-end text-sm text-white font-semibold">
                    Update
                  </div>
                </div>
              </button>
            </div>
            <div className="self-center">
              <button
                className={`${
                  !profile_image_link ? "text-slate-400" : "text-red-700"
                } bg-red-50 w-fit ml-2 text-sm p-1 rounded-full
              text-sm font-semibold hover:bg-red-100`}
                disabled={!profile_image_link}
                onClick={() =>
                  dispatch(
                    userDataInfo({
                      showPicDeleteConfirm: true,
                    })
                  )
                }
              >
                <div className="relative group">
                  <RiDeleteBin2Fill size={30} />
                  {profile_image_link ? (
                    <div className="rounded-2xl bg-black w-16 opacity-0 group-hover:opacity-100 duration-300 absolute flex justify-center items-end text-sm text-white font-semibold">
                      Delete
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </button>
            </div>
          </div>
        </CardHeader>

        <CardBody className="h-2/5 font-bold text-sm overflow-auto w-full text-center">
          <div className="self-center mb-2">
            <button
              onClick={() =>
                dispatch(
                  userDataInfo({
                    showProfileUpdateForm: true,
                  })
                )
              }
              className={`bg-blue-50 text-sm p-1 rounded-full
              text-sm font-semibold text-blue-700 hover:bg-blue-100`}
            >
              Update Profile
            </button>
          </div>
          <div className="max-[640px]:text-xs ">
            {name ? name : "Name: Not yet added, update profile"}
          </div>
          <div className="max-[640px]:text-xs">
            {location ? location : "Location: Not yet added, update profile"}
          </div>
          <div className="max-[640px]:text-xs">
            {bio
              ? `Bit about me: ${bio}`
              : "Bit about me: Not yet added, update profile"}
          </div>
        </CardBody>
      </Card>

      <div
        style={{ backgroundColor: "rgba(8, 10, 1, 0.2)" }}
        className="mt-10 mr-7 ml-7 rounded-3xl float-right h-5/6 w-4/5 overflow-scroll border-2 border-gray-200"
      >
        <TreeUpload
          authUserId={authUserId}
          openImageUploader={openImageUploader}
        />
      </div>

      {showProfileUpdateForm ? (
        <ProfileUpdateForm name={name} location={location} bio={bio} />
      ) : (
        ""
      )}
    </div>
  );
};
export default Profile;
