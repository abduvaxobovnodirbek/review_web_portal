import React from "react";
import { AiFillStar } from "react-icons/ai";
import useWindowSize from "../../hooks/useWindowSize";
import { ReviewDetail, User } from "../../types/api";

const GradeText = ({
  currentUser,
  review,
}: {
  currentUser: User | null;
  review: ReviewDetail | undefined;
}) => {
  const { width } = useWindowSize();
  return (
    <>
      <h3 className="text-gray-600 text-sm font-serif relative top-5">
        {currentUser ? (
          <p className={`flex ${width < 500 ? "flex-col" : ""}`}>
            <span>
              Feel free to rate for{" "}
              <b className="ml-2 italic">{review?.reviewed_art}</b>{" "}
            </span>

            <span className={`flex items-center ${width > 500 ? "ml-2" : ""}`}>
              (
              <span className="mr-1">
                average rate: {review?.averageRate ? review?.averageRate : 0}
              </span>{" "}
              <AiFillStar />)
            </span>
          </p>
        ) : (
          <p className={`flex ${width < 500 ? "flex-col" : ""}`}>
            <span>
              Please login and rate for{" "}
              <b className="ml-2 italic">{review?.reviewed_art}</b>{" "}
            </span>

            <span className={`flex items-center ${width > 500 ? "ml-2" : ""}`}>
              (
              <span className="mr-1">
                average rate: {review?.averageRate ? review?.averageRate : 0}
              </span>{" "}
              <AiFillStar />)
            </span>
          </p>
        )}
      </h3>
    </>
  );
};

export default GradeText;
