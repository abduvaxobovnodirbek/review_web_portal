import { SyntheticEvent } from "react";
import { useTranslation } from "react-i18next";
import HTMLReactParser, { domToReact } from "html-react-parser";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Chip, Tooltip } from "@mui/material";
import useWindowSize from "../../hooks/useWindowSize";
import { ReviewDetail } from "../../types/api";
import { useAppSelector } from "../../hooks/useAppSelector";
import Cloudinary from "../CloudImage/Cloudinary";
import { AiFillStar } from "react-icons/ai";
import CardHead from "./CardHead";


export default function ReviewCard({
  includeHead,
  review,
  includeSaveBtn,
  handleAddToBasket,
}: {
  includeHead: boolean;
  review?: ReviewDetail;
  handleAddToBasket?: (str: string) => void;
  includeSaveBtn: boolean;
}) {
  const { currentUser } = useAppSelector((state) => state.users);
  const { width } = useWindowSize();
  const navigate = useNavigate();
  const {t} = useTranslation()


  const options = {
    replace: (domeNode: any) => {
      if (!domeNode.attribs) {
        return;
      }

      if (domeNode) {
        return (
          <span className="mr-1">{domToReact(domeNode.children, options)}</span>
        );
      }
    },
  };

  return (
    <Card
      sx={{ maxWidth: "100%" }}
      className="mb-2 cursor-pointer !bg-transparent dark:!bg-zinc-800 dark:text-white dark:p-2"
      elevation={0}
      onClick={() => navigate(`/reviews/${review?._id}`)}
    >
      {includeHead ? (
        <CardHead
          currentUser={currentUser}
          review={review}
          handleAddToBasket={handleAddToBasket}
          includeSaveBtn={includeSaveBtn}
        />
      ) : (
        ""
      )}

      <div
        className={`flex items-center ${
          width > 576 ? "justify-between" : "!flex-col"
        }`}
      >
        <div>
          <CardContent className="!px-0">
            <Typography
              variant="body1"
              color="text.primary"
              className="!font-bold !text-lg dark:!text-white"
            >
              {review?.review_name}
            </Typography>
          </CardContent>
          <CardContent className="!px-0">
            <div className="flex flex-wrap font-serif text-sm">
              {HTMLReactParser(
                review?.description.slice(0, 300) || "",
                options
              )}
            </div>
          </CardContent>
        </div>

        {review?.imageList.length ? (
          <div
            className={`${
              width > 576 ? "w-[350px] h-[120px]" : "w-[100%] h-[220px]"
            }`}
          >
            <Cloudinary img={review.imageList[0]} />
          </div>
        ) : (
          ""
        )}
      </div>

      {review && review.category.name ? (
        <div className="flex justify-between items-center border-b pb-1">
          <div>
            <span className="font-serif text-gray-500 text-sm">
              {t('p34')} |
            </span>
            <Tooltip title="Category" placement="top">
              <Chip
                label={review.category.name}
                component={"div"}
                className="!cursor-pointer !px-4 !py-0 ml-2 dark:!bg-zinc-700 dark:!text-gray-300"
                onClick={(e: SyntheticEvent) => {
                  e.stopPropagation();
                  navigate(`/category/${review.category.name}`);
                }}
              />
            </Tooltip>
          </div>
          <p className="flex items-center font-serif text-gray-500">
            <span className="mr-1">
              <span className=" text-sm mr-2">{t('p35')}:</span>
              <span className="dark:!text-gray-300">{review?.averageRate ? review?.averageRate : 0}</span>
            </span>{" "}
            <AiFillStar className="dark:!text-gray-300"/>
          </p>
        </div>
      ) : (
        ""
      )}
    </Card>
  );
}
