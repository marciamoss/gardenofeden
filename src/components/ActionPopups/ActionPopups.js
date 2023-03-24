import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authDataInfo, userDataInfo } from "../../store";
import SigninEmailConfirmModal from "../Signin/SigninEmailConfirmModal";
import MessageModal from "../Message/MessageModal";
import SigninModal from "../Signin/SigninModal";
import AboutModal from "../About/AboutModal";
import HowItWorksModal from "../HowItWorks/HowItWorksModal";
import GeoLocate from "../GeoLocate/GeoLocate";

const ActionPopups = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
  } = useSelector((state) => state.authData);
  const {
    imageUploadError,
    profileUpdateError,
    profileUpdateErrorMessage,
    showGeoLocate,
    showGeoLocateError,
  } = useSelector((state) => state.userData);
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
            message={"Welcome to Garden Of Eden. Please make yourself at home."}
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
            message={`Image upload failed at this time`}
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
            message={`Profile update failed, Reason: ${profileUpdateErrorMessage}`}
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
    </>
  );
};
export default ActionPopups;
