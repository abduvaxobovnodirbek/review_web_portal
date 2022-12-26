import { useEffect, useState } from "react";
import { message, Skeleton } from "antd";
import { Avatar, Button, CardHeader, Stack } from "@mui/material";
import TextEditor from "../../features/createReview/TextEditor/TextEditor";
import ImageCarousel from "../carousel/ImageCarousel";
import AuthorGrade from "../../features/createReview/AuthorGrade/AuthorGrade";
import Tag from "../tag/Tag";

const ReviewDetail = ({ formik }: any) => {
  const [showImageList, setShowImageList] = useState<boolean>(false);
  const { imageList, review_name, reviewed_art, tags } = formik.values;

  useEffect(() => {
    setTimeout(() => {
      setShowImageList(true);
    }, 1000);
  }, []);

  return (
    <div className="max-w-[750px] mx-auto">
      <header
        className="font-serif tracking-wider ml-3 p-3 text-white"
        style={{ background: "#03776f" }}
      >
        Demo visualization
      </header>

      <CardHeader
        avatar={
          <Avatar sx={{ background: "#00000064" }} aria-label="recipe">
            R
          </Avatar>
        }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />

      <h2 className="font-serif tracking-wider ml-3 p-3 mb-2 flex flex-col  text-lg font-bold text-center">
        <span>{review_name}</span>
        <span className="text-gray-400">({reviewed_art})</span>
      </h2>

      {showImageList && imageList.length ? (
        <ImageCarousel images={imageList} />
      ) : imageList.length && !showImageList ? (
        <Skeleton.Image active={true} className="!w-full !h-[300px]" />
      ) : (
        ""
      )}

      <TextEditor displayMode="Preview" formik={formik} />

      <div className="ml-4">
        <AuthorGrade formik={formik} viewer={true} />
      </div>

      <Stack direction="row" spacing={1} className="ml-4">
        {tags.map((tag: string, i: number) => (
          <Tag key={i} label={tag} />
        ))}
      </Stack>

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
