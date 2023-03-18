import React from "react";
import { useSelector } from "react-redux";
import "./Profile.css";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";
import ImageUploading from "react-images-uploading";
import { CgProfile } from "react-icons/cg";
import TreeUpload from "../TreeUpload/TreeUpload";
import ProfileUpdateForm from "./ProfileUpdateForm";
import { useSaveUserProfileMutation, useFetchUserQuery } from "../../store";

const Profile = () => {
  const [image, setImage] = React.useState([]);
  const [showProfileUpdate, setShowProfileUpdate] = React.useState(false);
  const maxNumber = 1;
  const onChange = (imageList) => {
    setImage(imageList);
    saveUserProfile({
      edenUser: {
        userId: authUserId,
        profile_image_link: imageList[0].data_url,
      },
    });
  };
  const { authUserId } = useSelector((state) => {
    return {
      authUserId: state.authData.authUserId,
    };
  });
  const [saveUserProfile, results] = useSaveUserProfileMutation();
  const { data } = useFetchUserQuery(authUserId);

  return (
    <div
      id="profile"
      className="profile-body w-screen h-screen mx-auto mt-7 text-center"
    >
      <Card className="profile-pic">
        <ImageUploading
          multiple
          value={image}
          onChange={onChange}
          maxNumber={maxNumber}
          dataURLKey="data_url"
          acceptType={["jpg"]}
        >
          {({
            imageList,
            onImageUpload,
            onImageUpdate,
            isDragging,
            dragProps,
          }) => (
            <>
              <CardHeader
                floated={false}
                className="profile-pic-header m-2 rounded"
              >
                <div className="profile-pic-box">
                  {data && data[0]?.profile_image_link ? (
                    <img
                      src={data[0]?.profile_image_link}
                      alt="profile"
                      className={`place-content-center w-full h-full ${
                        results.isLoading ? "animate-pulse" : ""
                      }`}
                    />
                  ) : (
                    <button
                      className={`w-full h-full font-bold max-[640px]:text-xs
                  ${results.isLoading ? "animate-pulse" : ""}`}
                      style={isDragging ? { color: "red" } : null}
                      onClick={onImageUpload}
                      {...dragProps}
                    >
                      Click/Drag image here to upload
                      <CgProfile className="place-content-center w-full h-1/4" />
                    </button>
                  )}
                </div>
                <div className="profile-pic-button">
                  <button
                    className={`${
                      results.isLoading
                        ? "bg-gray-100 text-white"
                        : "bg-gray-200"
                    } border-2 rounded border-black text-xs w-fit h-fit mb-2 max-[820px]:mb-0 lg:mr-2 md:mr-1 max-[640px]:text-xs`}
                    disabled={results.isLoading}
                    style={isDragging ? { color: "red" } : null}
                    onClick={() => onImageUpdate(0)}
                    {...dragProps}
                  >
                    Upload
                  </button>
                  <button
                    className={`${
                      results.isLoading
                        ? "bg-gray-100 text-white"
                        : "bg-gray-200"
                    } border-2 rounded bg-gray-200 border-black text-xs w-fit h-fit mb-2 max-[640px]:text-xs`}
                    disabled={results.isLoading}
                    style={isDragging ? { color: "red" } : null}
                    onClick={() =>
                      saveUserProfile({
                        edenUser: {
                          userId: authUserId,
                          profile_image_link: "",
                        },
                      })
                    }
                    {...dragProps}
                  >
                    Delete
                  </button>
                </div>
              </CardHeader>
              <CardBody className="profile-pic-body font-bold text-sm overflow-auto w-full ">
                <div className="max-[640px]:text-xs">
                  {data && data[0]?.name
                    ? data[0]?.name
                    : "Name: Not yet added, update profile"}
                </div>
                <div className="max-[640px]:text-xs">
                  {data && data[0]?.location
                    ? data[0]?.location
                    : "Location: Not yet added, update profile"}
                </div>
              </CardBody>
            </>
          )}
        </ImageUploading>
        <CardFooter className="profile-pic-footer text-center text-black font-bold mt-1 h-fit">
          <button
            onClick={() => setShowProfileUpdate(true)}
            className="border-2 rounded bg-gray-200 border-black text-sm w-fit h-fit"
          >
            Update Profile
          </button>
        </CardFooter>
      </Card>

      <div className="tree-container border-2 border-gray-200">
        <TreeUpload />
      </div>
      <div className="about">
        {" "}
        <div className="max-[640px]:text-xs p-2">
          {data && data[0]?.bio
            ? `Bit about me: ${data[0]?.bio}`
            : "Bit about me: Not yet added, update profile"}
        </div>
      </div>

      {showProfileUpdate ? (
        <ProfileUpdateForm
          showProfileUpdate={showProfileUpdate}
          setShowProfileUpdate={setShowProfileUpdate}
        />
      ) : (
        ""
      )}
    </div>
  );
};
export default Profile;
