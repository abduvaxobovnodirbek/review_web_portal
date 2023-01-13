import { Button, message } from "antd";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { reviewApi } from "../../services/api/review/review";
import { followUser } from "../../services/api/user/user";
import { toggleModal } from "../../services/ui/modalSlice";
import { User } from "../../types/api";

const Follow = ({
  user,
  refetch,
}: {
  user: User | undefined;
  refetch: any;
}) => {
  const dispatch = useAppDispatch();

  const { currentUser, loading } = useAppSelector((state) => state.users);
  const { t } = useTranslation();
  const handleClick = (): void => {
    if (currentUser?._id) {
      dispatch(
        followUser({ followTo: user?._id || "", user: currentUser?._id || "" })
      )
        .unwrap()
        .then((data) => {
          message.success(t('p102'));
          refetch();
          dispatch(
            reviewApi.util.invalidateTags([
              { type: "FollowingReview", id: "LIST" },
            ])
          );
        })
        .catch((err) => {
          message.error(t('p31'));
        });
    } else {
      dispatch(toggleModal(true));
    }
  };

  return (
    <div onClick={handleClick}>
      <Button
        className={`mt-3 w-[150px] font-bold `}
        loading={loading}
        disabled={currentUser?._id === undefined}
      >
        {user?.followers?.includes(currentUser?._id || "")
          ? t("p49")
          : t("p48")}
      </Button>
    </div>
  );
};

export default Follow;
