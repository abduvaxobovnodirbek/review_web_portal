import { useEffect, useState } from "react";
import { message, Skeleton } from "antd";
import { Avatar, Button, CardHeader } from "@mui/material";
import TextEditor from "../../features/createReview/TextEditor/TextEditor";
import { useAppSelector } from "../../hooks/useAppSelector";
import ImageCarousel from "../carousel/ImageCarousel";

const ReviewDetail = ({ formik }: any) => {
  const { previewImagesList } = useAppSelector((state) => state.reviewSteps);
  const [showImageList, setShowImageList] = useState<boolean>(false);
  const [imageList, setImageList] = useState<string[]>([]);

  useEffect(() => {
    previewImagesList.map(async (file) => {
      const reader = new FileReader();
      const selectedFile = file;
      if (selectedFile) {
        reader.readAsDataURL(selectedFile);
      }
      reader.onload = (readerEvent: any) => {
        if (selectedFile.type.includes("image")) {
          if (!imageList.includes(readerEvent.target.result)) {
            setImageList([...imageList, readerEvent.target.result]);
          }
        }
      };
    });
  }, [imageList]);

  useEffect(() => {
    setTimeout(() => {
      setShowImageList(true);
    }, 2000);
  }, []);

  return (
    <div className="max-w-[750px] mx-auto">
      <h3
        className="font-serif tracking-wider ml-3 p-3 text-white"
        style={{ background: "#03776f" }}
      >
        Demo visualization
      </h3>

      <CardHeader
        avatar={
          <Avatar sx={{ background: "#00000064" }} aria-label="recipe">
            R
          </Avatar>
        }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />

      {showImageList && previewImagesList.length ? (
        <ImageCarousel images={imageList} />
      ) : previewImagesList.length && !showImageList ? (
        <Skeleton.Image active={true} className="!w-full !h-[300px]" />
      ) : (
        ""
      )}

      <TextEditor displayMode="Preview" />

      <Button
        type="submit"
        disabled={formik.isSubmitting || !formik.isValid}
        onClick={() => message.success("Processing complete!")}
      >
        Done
      </Button>
    </div>
  );
};

export default ReviewDetail;
