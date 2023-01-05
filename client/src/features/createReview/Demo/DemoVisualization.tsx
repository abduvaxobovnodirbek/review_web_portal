import { useEffect, useState } from "react";
import { Skeleton } from "antd";
import { Avatar, Button, CardHeader, Stack } from "@mui/material";
import { format } from "date-fns";

import ImageCarousel from "../../../components/carousel/ImageCarousel";
import TextEditor from "../../../components/Editor/TextEditor";
import Grade from "../../../components/grade/Grade";
import Tag from "../../../components/tag/Tag";
import { useAppSelector } from "../../../hooks/useAppSelector";
import Cloudinary from "../../../components/CloudImage/Cloudinary";

const DemoVisualization = ({ formik }: any) => {
  const [showImageList, setShowImageList] = useState<boolean>(false);
  const { imageList, review_name, reviewed_art, tags, authorGrade } =
    formik.values;
  const { currentUser } = useAppSelector((state) => state.users);
  console.log(currentUser);
  useEffect(() => {
    setTimeout(() => {
      setShowImageList(true);
    }, 200);
  }, []);

  return (
    <div>
      <header
        className="font-serif tracking-wider ml-3 p-3 text-white"
        style={{ background: "#03776f" }}
      >
        Demo visualization
      </header>

      <CardHeader
        avatar={
          <Avatar sx={{ background: "#00000064" }} aria-label="recipe">
            {currentUser?.image ? <Cloudinary img={currentUser?.image} /> : ""}
          </Avatar>
        }
        title={currentUser?.name}
        subheader={format(new Date(Date.now()), "MMM do. yyyy")}
      />

      <h2 className="font-serif tracking-wider ml-3 p-3 mb-2 flex flex-col  text-lg font-bold text-center">
        <span>{review_name}</span>
        {reviewed_art ? (
          <span className="text-gray-400">({reviewed_art})</span>
        ) : (
          ""
        )}
      </h2>

      {showImageList && imageList.length ? (
        <ImageCarousel images={imageList} cloudImages={false} />
      ) : imageList.length && !showImageList ? (
        <Skeleton.Image active={true} className="!w-full !h-[300px]" />
      ) : (
        ""
      )}

      <TextEditor displayMode="PREVIEW" formik={formik} createReview={true} />

      <div className="ml-4">
        <Grade
          formik={formik}
          createReview={true}
          defaultValue={authorGrade}
          disabled={true}
          authorGrade={true}
          count={10}
        />
      </div>

      <Stack direction="row" spacing={1} className="ml-4">
        {tags.map((tag: string, i: number) => (
          <Tag key={i} label={tag} />
        ))}
      </Stack>

      <div className="w-[95%] flex justify-end my-3">
        <Button
          sx={{ border: "1px solid gray" }}
          className="!rounded-2xl !bg-black !text-white !py-2 !px-4 !text-sm"
          type="submit"
          disabled={!formik.isValid}
        >
          Publish review
        </Button>
      </div>
    </div>
  );
};

export default DemoVisualization;
