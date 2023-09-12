import { useState, useEffect } from "react";
import {
  MdCloudUpload,
  MdOutlineCancel,
  MdPreview,
  MdCrop,
} from "react-icons/md";
import { useDispatch } from "react-redux";
import { userDataInfo } from "../store";
import { AiOutlineRotateRight } from "react-icons/ai";
import { GiHorizontalFlip, GiVerticalFlip } from "react-icons/gi";
const Buffer = require("buffer/").Buffer;

const useImagePicker = ({
  cropperRef,
  authUserId,
  imageType,
  pickerRef,
  getImageGeoLocation,
}) => {
  const dispatch = useDispatch();
  const [layoutChange, setLayoutChange] = useState(false);
  const [disableReset, setDisableReset] = useState(true);
  const [disablePreview, setDisablePreview] = useState(true);
  const [imgLoading, setImgLoading] = useState(false);
  const [img, setImg] = useState("");
  const leftPanel = [
    {
      cb: () => {
        cropperRef?.current?.cropper.crop();
        setLayoutChange(true);
        setDisableReset(false);
        setDisablePreview(false);
      },
      icon: <MdCrop color="white" size={30} />,
      tooltip: "Crop",
      disableBtn: imgLoading,
    },
    {
      cb: () => {
        cropperRef?.current?.cropper.rotate(90);
        setLayoutChange(true);
        setDisableReset(false);
      },
      icon: <AiOutlineRotateRight color="white" size={30} />,
      tooltip: "Rotate",
      disableBtn: imgLoading,
    },
    {
      cb: () => {
        cropperRef?.current?.cropper?.scaleX(
          cropperRef?.current?.cropper?.getData()?.scaleX * -1
        );
        setLayoutChange(true);
        setDisableReset(false);
      },
      icon: <GiHorizontalFlip color="white" size={30} />,
      tooltip: "Flip H",
      disableBtn: imgLoading,
    },
    {
      cb: () => {
        cropperRef?.current?.cropper?.scaleY(
          cropperRef?.current?.cropper?.getData()?.scaleY * -1
        );
        setLayoutChange(true);
        setDisableReset(false);
      },
      icon: <GiVerticalFlip color="white" size={30} />,
      tooltip: "Flip V",
      disableBtn: imgLoading,
    },
  ];
  const rightPanel = [
    {
      cb: () => {
        setImgLoading(true);
        setTimeout(() => {
          onCrop();
        }, 1);
        setDisablePreview(true);
        setLayoutChange(false);
      },
      icon: <MdPreview color="white" size={30} />,
      tooltip: "Preview",
      disableBtn: imgLoading || disablePreview,
    },
    {
      cb: () => {
        setImgLoading(true);
        setTimeout(() => {
          upload();
        }, 1);
      },
      icon: <MdCloudUpload color="white" size={30} />,
      tooltip: "Save",
      disableBtn: imgLoading,
    },
    {
      cb: () => reset(),
      icon: <MdOutlineCancel color="white" size={30} />,
      tooltip: "Reset",
      disableBtn: disableReset || imgLoading,
    },
  ];
  const onCrop = () => {
    const cropper = cropperRef.current.cropper;
    setImg({
      ...img,
      croppedImage: cropper.getCroppedCanvas().toDataURL().split(",")[1],
    });
  };
  const upload = () => {
    setImgLoading(true);
    const cropper = cropperRef.current.cropper;
    let cropBoxData = cropper.getCropBoxData();
    if (Object.keys(cropBoxData).length || layoutChange) {
      let image = cropper.getCroppedCanvas().toDataURL().split(",")[1];
      dispatch(
        userDataInfo({
          showImagePicker: false,
          image: {
            image,
            authUserId,
            imageType,
            latitude: img.latitude,
            longitude: img.longitude,
          },
        })
      );
    } else {
      dispatch(
        userDataInfo({
          showImagePicker: false,
          image: {
            image: img?.croppedImage ? img.croppedImage : img.image,
            authUserId,
            imageType,
            latitude: img.latitude,
            longitude: img.longitude,
          },
        })
      );
    }
    setImgLoading(true);
  };
  const reset = () => {
    setImgLoading(true);
    setImg({
      ...img,
      image: img.originalImage,
      croppedImage: "",
    });
    cropperRef?.current?.cropper?.setData({
      x: 0,
      y: 0,
      scaleX: 1,
      scaleY: 1,
      rotate: 0,
    });
    cropperRef?.current?.cropper?.clear();
    setDisablePreview(true);
    setDisableReset(true);
    setImgLoading(false);
  };

  const readImage = (event) => {
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
        return;
      }

      var reader = new FileReader();
      setImgLoading(true);
      reader.onload = (event) => {
        const imgArrayBuffer = event.target.result;
        const base64String = Buffer.from(imgArrayBuffer).toString("base64");
        let latitude;
        let longitude;
        if (imageType === "trees") {
          const { lat, lng } = getImageGeoLocation(imgArrayBuffer);
          latitude = lat;
          longitude = lng;
        }
        setImg({
          image: base64String,
          originalImage: base64String,
          authUserId,
          imageType,
          latitude,
          longitude,
          name: files[0].name,
          imgTypeError: false,
        });
      };
      reader.onerror = (error) => {
        setImg("");
        setImgLoading(false);
      };
      reader.readAsArrayBuffer(files[0]);
    }
  };

  useEffect(() => {
    if (pickerRef.current) {
      pickerRef.current.focus();
    }
  }, [pickerRef]);

  return [
    leftPanel,
    rightPanel,
    setDisablePreview,
    setDisableReset,
    imgLoading,
    setImgLoading,
    img,
    setImg,
    readImage,
  ];
};

export default useImagePicker;
