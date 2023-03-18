import React from "react";
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

const Profile = () => {
  const [image, setImage] = React.useState([]);
  const [showProfileUpdate, setShowProfileUpdate] = React.useState(false);
  const maxNumber = 1;
  const onChange = (imageList, addUpdateIndex) => {
    console.log(imageList, addUpdateIndex);
    setImage(imageList);
  };
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
            onImageRemove,
            isDragging,
            dragProps,
          }) => (
            <>
              <CardHeader floated={false} className="h-80 m-2 rounded">
                {!image[0]?.data_url ? (
                  <button
                    className="w-full h-full font-bold max-[640px]:text-xs"
                    style={isDragging ? { color: "red" } : null}
                    onClick={onImageUpload}
                    {...dragProps}
                  >
                    Click to upload and click save button underneath
                    <CgProfile className="place-content-center w-full h-2/3" />
                  </button>
                ) : (
                  <img
                    src={image[0].data_url}
                    alt="profile"
                    className="place-content-center w-full h-full"
                  />
                )}
              </CardHeader>
              <CardBody className="font-bold text-sm overflow-auto w-full">
                <button
                  className=" border-2 rounded bg-gray-200 border-black text-xs w-fit h-fit mb-2 sm:mr-2 lg:mr-2 md:mr-2 max-[640px]:text-xs"
                  style={isDragging ? { color: "red" } : null}
                  onClick={() => console.log("save profile pic")}
                  {...dragProps}
                >
                  Save
                </button>
                <button
                  className="border-2 rounded bg-gray-200 border-black text-xs w-fit h-fit mb-2 lg:mr-2 md:mr-2 max-[640px]:text-xs"
                  style={isDragging ? { color: "red" } : null}
                  onClick={() => onImageUpdate(0)}
                  {...dragProps}
                >
                  Update
                </button>
                <button
                  className="border-2 rounded bg-gray-200 border-black text-xs w-fit h-fit mb-2 max-[640px]:text-xs"
                  style={isDragging ? { color: "red" } : null}
                  onClick={() => onImageRemove(0)}
                  {...dragProps}
                >
                  Delete
                </button>
                <div className="max-[640px]:text-xs">Name: Marcia Moss</div>
                <div className="max-[640px]:text-xs">Location: Raleigh, NC</div>
                {/* <div className="max-[640px]:text-xs">
                  Me: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Ut sed nunc iaculis, tristique est sit amet, aliquam nisl.
                  Maecenas posuere ligula at arcu dapibus luctus. Sed sagittis,
                  elit at auctor imperdiet, diam leo finibus erat, ac fringilla
                  metus nam.
                </div> */}
              </CardBody>
            </>
          )}
        </ImageUploading>
        <CardFooter className="text-center text-black font-bold mt-1 h-fit">
          <button
            onClick={() => setShowProfileUpdate(true)}
            className="border-2 rounded bg-gray-200 border-black text-sm w-fit h-fit"
          >
            Update Profile
          </button>
        </CardFooter>
      </Card>

      <div className="tree-container">
        <TreeUpload />
      </div>
      <div className="about">
        {" "}
        <div className="max-[640px]:text-xs p-2">
          About Marcia: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Ut sed nunc iaculis, tristique est sit amet, aliquam nisl. Maecenas
          posuere ligula at arcu dapibus luctus. Sed sagittis, elit at auctor
          imperdiet, diam leo finibus erat, ac fringilla metus nam.
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
