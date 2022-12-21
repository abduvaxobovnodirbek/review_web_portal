import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import ShareIcon from "@mui/icons-material/Share";
import Tooltip from "@mui/material/Tooltip";
import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpRounded";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import Chip from "@mui/material/Chip";

const ReviewActions = () => {
  return (
    <CardActions disableSpacing>
      <Tooltip title="Like" placement="top" sx={{ color: "#03776f" }}>
        <IconButton aria-label="like button">
          <ThumbUpRoundedIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title="Share" placement="top" sx={{ color: "black" }}>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title="Save" placement="top" sx={{ color: "#03776f" }}>
        <IconButton aria-label="save btn">
          <BookmarkAddIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title="Tag" placement="top">
        <Chip
          label="Javascript"
          component={"div"}
          className="!cursor-pointer"
        />
      </Tooltip>
    </CardActions>
  );
};

export default ReviewActions;
