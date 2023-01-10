import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { CssBaseline, Grid } from "@material-ui/core";
import Switch from "@mui/material/Switch";
import Comment from "../../components/comments/Comment";
import NewCommentForm from "./NewCommentForm";
import { User } from "../../types/api";
import { socket } from "../../App";
import useEffectOnce from "../../hooks/useEffectOnce";

const useStyles = makeStyles({
  spacing: {
    marginTop: "50px",
  },
  header: {
    fontWeight: 600,
    color: "gray",
    fontSize: "20px",
    fontFamily: "sans-serif",
  },
  button: {
    color: "orange",
  },
});

const Comments = ({
  reviewId,
  currentUser,
}: {
  reviewId: string | undefined;
  currentUser: User | null;
}) => {
  const [comments, setComments] = useState<any[]>([]);
  const [isFetching, setFetching] = useState<boolean>(true);
  const [showComments, setShowComments] = useState<boolean>(false);

  const classes = useStyles();

  const handleOpenComments = () => {
    setShowComments((prev: boolean) => !prev);
  };

  useEffect(() => {
    const receiveComments = async () => {
      await socket.emit("getAllComments", { reviewId: reviewId || "" });
      await socket.on(
        "getAllComments_result",
        (data: { _id: string; comments: any[] } | null) => {
          setFetching(false);
          if (data) {
            setComments(data.comments || []);
          }
        }
      );
    };
    receiveComments();
  }, [reviewId]);

  useEffectOnce(() => {
    socket.on(
      "updateComments",
      (data: { _id: string; comments: any[] } | null) => {
        if (data) {
          setComments(data.comments || []);
        }
      }
    );
  });

  return (
    <CssBaseline>
      <Container>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          className={classes.spacing}
        >
          <Grid item>
            <Typography
              className={classes.header + " dark:text-gray-300"}
              variant="h4"
            >
              Comments
            </Typography>
          </Grid>
          <Grid item>
            <Switch
              aria-label="Switch comment"
              onClick={handleOpenComments}
              checked={showComments}
            />
          </Grid>
        </Grid>

        {isFetching ? (
          <div> Loading...</div>
        ) : showComments ? (
          <>
            <NewCommentForm reviewId={reviewId} currentUser={currentUser} />
            <div className="max-h-[500px] overflow-scroll">
              <Comment comments={comments} />
            </div>
          </>
        ) : (
          ""
        )}
      </Container>
    </CssBaseline>
  );
};

export default Comments;
