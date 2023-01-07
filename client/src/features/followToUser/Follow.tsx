import { Button, message } from "antd";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { reviewApi } from "../../services/api/review";
import { followUser } from "../../services/api/user";

const Follow = ({ userId, refetch }: { userId: string; refetch: any }) => {
  const dispatch = useAppDispatch();

  const { currentUser, loading } = useAppSelector((state) => state.users);

  const handleClick = (): void => {
    dispatch(followUser({ followTo: userId, user: currentUser?._id || "" }))
      .unwrap()
      .then((data) => {
        message.success("Success!");
        refetch();
        dispatch(
          reviewApi.util.invalidateTags([
            { type: "FollowingReview", id: "LIST" },
          ])
        );
      })
      .catch((err) => {
        console.log(err);
        message.error("Something went wrong try again!");
      });
  };

  return (
    <>
      <Button
        className={`mt-3 w-[150px] font-bold `}
        loading={loading}
        onClick={handleClick}
        disabled={currentUser?._id === undefined}
      >
        Follow
      </Button>
    </>
  );
};

export default Follow;
