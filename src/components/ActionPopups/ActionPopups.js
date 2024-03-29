import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  authDataInfo,
  userDataInfo,
  useLogOutMutation,
  useDeletePreviousVersionMutation,
} from "../../store";
import { useImageDelete, useSaveProfile } from "../../hooks";
import SigninEmailConfirmModal from "../Signin/SigninEmailConfirmModal";
import MessageModal from "../Message/MessageModal";
import SigninModal from "../Signin/SigninModal";
import AboutModal from "../About/AboutModal";
import HowItWorksModal from "../HowItWorks/HowItWorksModal";
import GeoLocate from "../GeoLocate/GeoLocate";
import ImagePicker from "../ImagePicker/ImagePicker";

const ActionPopups = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logOut] = useLogOutMutation();
  const [deleteUserTree] = useImageDelete();
  const [deletePreviousVersion] = useDeletePreviousVersionMutation();
  const [saveUserProfile] = useSaveProfile();
  const {
    showError,
    errorMessage,
    emailConfirm,
    emailSent,
    showWelcomeMessage,
    loggedOutMessage,
    showSignin,
    showAbout,
    showWorks,
    authUserId,
    showLogoutConfirm,
    autoLoggedInMessage,
  } = useSelector((state) => state.authData);
  const {
    imageUploadError,
    profileUpdateError,
    showGeoLocate,
    showGeoLocateError,
    showTreeDeleteConfirm,
    tree,
    showPicDeleteConfirm,
    showConnectForm,
    showImagePicker,
  } = useSelector((state) => state.userData);
  const { profile_image_link } = useSelector((state) => state.userData.user);

  return (
    <>
      <>
        {showWelcomeMessage ? (
          <MessageModal
            showModal={showWelcomeMessage}
            dispatchType={() => {
              dispatch(authDataInfo({ showWelcomeMessage: false }));
              navigate("");
            }}
            message={`Click on a tree and learn all about it and
            Welcome to Garden Of Eden.
            Please make yourself at home.`}
            modalColor={"bg-green-900"}
          />
        ) : (
          ""
        )}
      </>
      <>
        {showError ? (
          <MessageModal
            showModal={showError}
            dispatchType={() => {
              dispatch(authDataInfo({ showError: false }));
              navigate("");
            }}
            message={`${errorMessage}, Try again`}
            modalColor={"bg-orange-900"}
          />
        ) : (
          ""
        )}
      </>
      <>
        {emailSent ? (
          <MessageModal
            showModal={emailSent}
            dispatchType={() => {
              dispatch(authDataInfo({ emailSent: false, showMenu: false }));
            }}
            message={`Login link has been mailed to ${window.localStorage.getItem(
              "EdenEmailForSignIn"
            )}, Please click the link in the email to be signed in.`}
            modalColor={"bg-green-900"}
          />
        ) : (
          ""
        )}
      </>
      <>
        {emailConfirm ? (
          <SigninEmailConfirmModal emailConfirm={emailConfirm} />
        ) : (
          ""
        )}
      </>
      <>
        {loggedOutMessage ? (
          <MessageModal
            showModal={loggedOutMessage}
            dispatchType={() => {
              dispatch(
                authDataInfo({
                  showProfile: false,
                  loggedOutMessage: false,
                  showMenu: false,
                  showSignin: true,
                })
              );
            }}
            message={`You have been logged out from another session on this window, Login again`}
            modalColor={"bg-orange-900"}
          />
        ) : (
          ""
        )}
      </>
      <>{showAbout ? <AboutModal /> : ""}</>
      <>{showWorks ? <HowItWorksModal /> : ""}</>
      <>{showSignin ? <SigninModal /> : ""}</>
      <>
        {imageUploadError ? (
          <MessageModal
            showModal={imageUploadError}
            dispatchType={() => {
              dispatch(userDataInfo({ imageUploadError: false }));
            }}
            message={`Apologies, Unable to save at this time`}
            modalColor={"bg-orange-900"}
          />
        ) : (
          ""
        )}
      </>
      <>
        {profileUpdateError ? (
          <MessageModal
            showModal={profileUpdateError}
            dispatchType={() => {
              dispatch(userDataInfo({ profileUpdateError: false }));
            }}
            message={`Profile update failed`}
            modalColor={"bg-orange-900"}
          />
        ) : (
          ""
        )}
      </>
      <>{showGeoLocate ? <GeoLocate showGeoLocate={showGeoLocate} /> : ""}</>
      <>
        {showGeoLocateError ? (
          <MessageModal
            showModal={showGeoLocateError}
            dispatchType={() => {
              dispatch(userDataInfo({ showGeoLocateError: false }));
            }}
            message={`Location Not found, Please check the address or directly click on the map to locate`}
            modalColor={"bg-orange-900"}
          />
        ) : (
          ""
        )}
      </>
      <>
        {showImagePicker ? (
          <ImagePicker
            showImagePicker={showImagePicker}
            authUserId={authUserId}
          />
        ) : (
          ""
        )}
      </>
      <>
        {showTreeDeleteConfirm ? (
          <MessageModal
            showModal={showTreeDeleteConfirm}
            dispatchType={() => {
              dispatch(
                userDataInfo({
                  showTreeDeleteConfirm: false,
                  image: "",
                  imageType: "",
                })
              );
            }}
            message={`Are you sure you want to delete this image`}
            modalColor={"bg-black"}
            actionOnConfirm={() => {
              deletePreviousVersion({
                key: tree.tree_image_link.split("/")[
                  tree.tree_image_link.split("/").length - 1
                ],
              });
              dispatch(userDataInfo({ deletedTree: tree }));
              deleteUserTree({ tree });
            }}
          />
        ) : (
          ""
        )}
      </>
      <>
        {showPicDeleteConfirm ? (
          <MessageModal
            showModal={showPicDeleteConfirm}
            dispatchType={() => {
              dispatch(
                userDataInfo({
                  showPicDeleteConfirm: false,
                  image: "",
                  imageType: "",
                })
              );
            }}
            message={`Are you sure you want to delete this image`}
            modalColor={"bg-black"}
            actionOnConfirm={() => {
              deletePreviousVersion({
                key: profile_image_link.split("/")[
                  profile_image_link.split("/").length - 1
                ],
              });
              saveUserProfile({
                edenUser: {
                  userId: authUserId,
                  profile_image_link: "",
                },
              });
            }}
          />
        ) : (
          ""
        )}
      </>
      <>
        {showLogoutConfirm ? (
          <MessageModal
            showModal={showLogoutConfirm}
            dispatchType={() => {
              dispatch(
                authDataInfo({
                  showLogoutConfirm: false,
                })
              );
            }}
            message={`Are you sure you want to logout?`}
            modalColor={"bg-black"}
            actionOnConfirm={() => logOut({ uid: authUserId })}
          />
        ) : (
          ""
        )}
      </>
      <>
        {autoLoggedInMessage ? (
          <MessageModal
            showModal={autoLoggedInMessage}
            dispatchType={() => {
              dispatch(authDataInfo({ autoLoggedInMessage: false }));
            }}
            message={`You are signed in using ${
              JSON.parse(localStorage.getItem("gardenofeden"))?.userEmail
            } from previous session, sign out if this is not you.`}
            modalColor={"bg-green-900"}
          />
        ) : (
          ""
        )}
      </>
      <>
        {showConnectForm ? (
          <MessageModal
            showModal={showConnectForm}
            dispatchType={() => {
              dispatch(
                userDataInfo({
                  showConnectForm: false,
                })
              );
            }}
            message={`Connect feature will be made available in future version`}
            modalColor={"bg-green-900"}
          />
        ) : (
          ""
        )}
      </>
    </>
  );
};
export default ActionPopups;
