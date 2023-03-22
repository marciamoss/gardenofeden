import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Profile.css";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";
import { CgProfile } from "react-icons/cg";
import TreeUpload from "../TreeUpload/TreeUpload";
import ProfileUpdateForm from "./ProfileUpdateForm";
import { userDataInfo } from "../../store";
import {
  useCheckLoginStatus,
  useImageUpload,
  useSaveProfile,
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
  const [saveUserProfile, saveUserResult] = useSaveProfile();
  const [openImageUploader, saveUserImageResult, saveUserTreeResult] =
    useImageUpload();

  useCheckLoginStatus();

  return (
    <div
      id="profile"
      className="profile-body w-screen h-screen mx-auto mt-7 text-center"
    >
      <Card className="profile-pic">
        <CardHeader floated={false} className="profile-pic-header m-2">
          <div
            className={`${
              isLoading ? "animate-pulse bg-stone-900" : ""
            } profile-pic-box border-2 border-white`}
          >
            {profile_image_link ? (
              <img
                src={profile_image_link}
                alt="profile"
                className={`place-content-center w-full h-full ${
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
          <div className="profile-pic-button">
            <div className="absolute bottom-10 right-0 left-0">
              <button
                className="bg-violet-50 w-fit text-sm p-1 text-slate-500 rounded-full text-sm font-semibold text-violet-700 hover:bg-violet-100"
                disabled={
                  saveUserImageResult.status === "pending" || isFetching
                }
                onClick={() =>
                  openImageUploader({ authUserId, imageType: "user" })
                }
              >
                Upload
              </button>
            </div>
            <div className="absolute bottom-1 right-0 left-0">
              <button
                className={`bg-violet-50 w-fit text-sm p-1 text-slate-500 rounded-full
              text-sm font-semibold text-violet-700 hover:bg-violet-100`}
                disabled={saveUserResult.status === "pending" || isFetching}
                onClick={() =>
                  saveUserProfile({
                    edenUser: {
                      userId: authUserId,
                      profile_image_link: "",
                    },
                  })
                }
              >
                Delete
              </button>
            </div>
          </div>
        </CardHeader>
        <CardBody className="profile-pic-body font-bold text-sm overflow-auto w-full ">
          <div className="max-[640px]:text-xs">
            {name ? name : "Name: Not yet added, update profile"}
          </div>
          <div className="max-[640px]:text-xs">
            {location ? location : "Location: Not yet added, update profile"}
          </div>
        </CardBody>
        <CardFooter className="profile-pic-footer text-center text-black font-bold mt-1 h-fit">
          <div className="absolute bottom-1 right-0 left-0">
            <button
              onClick={() =>
                dispatch(
                  userDataInfo({
                    showProfileUpdateForm: true,
                  })
                )
              }
              className={`bg-violet-50 text-sm p-1 text-slate-500 rounded-full
              text-sm font-semibold text-violet-700 hover:bg-violet-100`}
            >
              Update Profile
            </button>
          </div>
        </CardFooter>
      </Card>

      <div className="tree-container border-2 border-gray-200">
        <TreeUpload
          authUserId={authUserId}
          openImageUploader={openImageUploader}
        />
      </div>

      <div className="about max-[640px]:text-xs p-2">
        {bio
          ? `Bit about me: ${bio}`
          : "Bit about me: Not yet added, update profile"}
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
