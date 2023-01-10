import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
} from "@material-ui/core";
import Cloudinary from "../CloudImage/Cloudinary";
import { useNavigate } from "react-router-dom";
import format from "date-fns/format";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: "white",
  },
  fonts: {
    fontWeight: "bold",
  },
  inline: {
    display: "inline",
  },
}));

const Comment = ({ comments }: { comments: any[] }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  return (
    <List className={classes.root + " dark:bg-zinc-700"}>
      {comments.map((comment, i: number) => {
        return (
          <React.Fragment key={i}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                {comment?.user?.image ? (
                  <div
                    className="w-[35px] h-[35px] rounded-full overflow-hidden"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/user-all-reviews/${comment?.user._id}`);
                    }}
                  >
                    <Cloudinary img={comment?.user?.image} />
                  </div>
                ) : (
                  <>
                    <Avatar aria-label="avatar img">
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/user-all-reviews/${comment?.user._id}`);
                        }}
                      >
                        {comment?.user?.name?.at(0)}
                      </span>
                    </Avatar>
                  </>
                )}
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography className={classes.fonts + " dark:text-white"}>
                    {comment?.user?.name}
                    <span className="text-sm text-gray-500 ml-2 dark:text-white">
                      {format(
                        new Date(comment?.createdAt || Date.now()),
                        "hh:mm a (MMM do. yyyy)"
                      )}
                    </span>
                  </Typography>
                }
                secondary={
                  <span className="dark:text-white">{` - ${comment?.text}`}</span>
                }
              />
            </ListItem>
            <Divider />
          </React.Fragment>
        );
      })}
    </List>
  );
};

export default Comment;
