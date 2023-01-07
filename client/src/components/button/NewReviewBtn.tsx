import { useNavigate } from "react-router-dom";
import { BsPencilSquare } from "react-icons/bs";
import { IconButton } from "@mui/material";

const NewReviewBtn = () => {
  const navigate = useNavigate();

  const handleClick = (): void => {
    navigate("/review-create");
  };
  return (
    <>
      <IconButton
        size="small"
        aria-label="Write new review"
        sx={{ color: "black" }}
        onClick={handleClick}
      >
        <BsPencilSquare className="mr-3" />{" "}
        <span className="font-serif text-gray-500 text-sm">Write</span>
      </IconButton>
    </>
  );
};

export default NewReviewBtn;
