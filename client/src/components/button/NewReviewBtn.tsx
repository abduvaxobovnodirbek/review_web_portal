import { useNavigate } from "react-router-dom";
import { BsPencilSquare } from "react-icons/bs";
import { IconButton } from "@mui/material";
import { useTranslation } from "react-i18next";

const NewReviewBtn = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleClick = (): void => {
    navigate("/review-create");
  };
  return (
    <>
      <IconButton
        size="small"
        aria-label="Write new review"
        sx={{ color: "black" }}
        className="dark:text-white"
        onClick={handleClick}
      >
        <BsPencilSquare className="mr-3" />{" "}
        <span className="font-serif text-gray-500 text-sm dark:text-white">{t("p1")}</span>
      </IconButton>
    </>
  );
};

export default NewReviewBtn;
