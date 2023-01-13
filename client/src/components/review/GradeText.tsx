import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
  return (
    <>
      <h3 className="text-gray-600 text-sm font-serif relative top-5 dark:text-gray-300">
        {currentUser ? (
          <p className={`flex ${width < 500 ? "flex-col" : ""}`}>
            <span>
              {t("p43")} <b className="ml-2 italic">{review?.reviewed_art}</b>{" "}
            </span>

            <span className={`flex items-center ${width > 500 ? "ml-2" : ""}`}>
              (
              <span className="mr-1">
                {t("p35")}: {review?.averageRate ? review?.averageRate : 0}
              </span>{" "}
              <AiFillStar />)
            </span>
          </p>
        ) : (
          <p className={`flex ${width < 500 ? "flex-col" : ""}`}>
            <span>
              {t("p42")} <b className="ml-2 italic">{review?.reviewed_art}</b>{" "}
            </span>

            <span className={`flex items-center ${width > 500 ? "ml-2" : ""}`}>
              (
              <span className="mr-1">
                {t("p35")}: {review?.averageRate ? review?.averageRate : 0}
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
