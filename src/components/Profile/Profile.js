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

const Profile = () => {
  const [image, setImage] = React.useState([]);
  const maxNumber = 1;
  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImage(imageList);
  };
  return (
    <div
      id="profile"
      className="profile-body w-screen h-screen mx-auto mt-7 text-center"
    >
      <Card className="profile-pic">
        <CardHeader floated={false} className="h-80 m-2 bg-gray-300 rounded">
          {!image[0]?.data_url ? (
            <CgProfile className="place-content-center w-full h-full" />
          ) : (
            <img
              src={image[0].data_url}
              alt="profile"
              className="place-content-center w-full h-full"
            />
          )}
        </CardHeader>
        <CardBody className="font-bold text-sm overflow-auto w-full">
          <div>Name: Marcia Moss</div>
          <div>Location: Raleigh, NC</div>
          <div>
            About Me: Lorem Ipsum is simply dummy text of the printing and
            typesetting industry. Lorem Ipsum has been the industry's standard
            dummy text ever since the 1500s, when an unknown printer took a
            galley of type and scrambled it to make a type specimen book. It has
            survived not only five centuries, but also the leap into electronic
            typesetting, remaining essentially unchanged. It was popularised in
            the 1960s with the release of Letraset sheets containing Lorem Ipsum
            passages, and more recently with desktop publishing software like
            Aldus PageMaker including versions of Lorem Ipsum.
          </div>
        </CardBody>
        <CardFooter className="text-center text-black font-bold mt-1 h-fit">
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
              onImageRemoveAll,
              onImageUpdate,
              onImageRemove,
              isDragging,
              dragProps,
            }) => (
              <button
                className="border-2 rounded bg-gray-500 border-black text-sm w-fit h-fit lg:mr-2"
                style={isDragging ? { color: "red" } : null}
                onClick={onImageUpload}
                {...dragProps}
              >
                Upload Pic
              </button>
            )}
          </ImageUploading>
          <button className="border-2 rounded bg-gray-500 border-black text-sm w-fit h-fit">
            Update Profile
          </button>
        </CardFooter>
      </Card>

      <div className="tree-container">
        <TreeUpload />
      </div>
    </div>
  );
};
export default Profile;
