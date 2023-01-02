import { Image } from "cloudinary-react";
import useWindowSize from "../../hooks/useWindowSize";
const CloudinaryImage = ({ img }) => {
  const { width } = useWindowSize();
  return (
    <Image
      cloudName={process.env.REACT_APP_CLOUDINARY_NAME}
      publicId={"dev_setups/" + img}
      width={width > 576 ? "200" : "100%"}
      height="150"
    />
  );
};

export default CloudinaryImage;
