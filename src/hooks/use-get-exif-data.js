import exif from "exif-js";

const useGetExifData = () => {
  const gpsCoords = ({ degrees, minutes, seconds, direction }) => {
    var dd = parseInt(degrees) + minutes / 60 + seconds / 3600;
    if (direction === "S" || direction === "W") {
      dd = dd * -1;
    }
    return dd;
  };

  const getImageGeoLocation = (img) => {
    let exifData = exif.readFromBinaryFile(img);
    let lat = null;
    let lng = null;
    if (exifData?.GPSLatitude && exifData?.GPSLongitude) {
      let latitudeRef = exifData.GPSLatitudeRef;
      let longitudeRef = exifData.GPSLongitudeRef;
      let latitudeArray = JSON.parse(JSON.stringify(exifData.GPSLatitude));
      let longitudeArray = JSON.parse(JSON.stringify(exifData.GPSLongitude));

      lat = gpsCoords({
        degrees: latitudeArray[0],
        minutes: latitudeArray[1],
        seconds: latitudeArray[2],
        direction: latitudeRef,
      });

      lng = gpsCoords({
        degrees: longitudeArray[0],
        minutes: longitudeArray[1],
        seconds: longitudeArray[2],
        direction: longitudeRef,
      });
    }
    return { lat, lng };
  };
  return [getImageGeoLocation];
};

export default useGetExifData;
