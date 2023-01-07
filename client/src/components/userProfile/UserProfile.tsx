import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Avatar } from "@mui/material";
import Follow from "../../features/followToUser/Follow";
import { User } from "../../types/api";
import Cloudinary from "../CloudImage/Cloudinary";

const UserProfile = ({
  user,
  showFollowBtn,
  refetch,
}: {
  refetch: any;
  user: User | undefined;
  showFollowBtn: boolean;
}) => {
  return (
    <div className="flex items-center flex-col">
      {user?.image ? (
        <div className="!overflow-hidden !rounded-[100%] !h-[150px] !w-[150px]">
          <Cloudinary img={user?.image} />
        </div>
      ) : (
        <Avatar sx={{ background: "#03776f", width: 150, height: 150 }}>
          <AccountCircleIcon className="text-white !text-7xl" />
        </Avatar>
      )}
      <span className="text-center mt-6 font-serif font-bold text-gray-600">
        {user?.name}
      </span>
      <span className="text-center mt-2 font-serif  text-gray-600">
        {user?.followers?.length} followers
      </span>
      <span className="px-3 text-center mt-6 font-serif text-gray-600">
        {user?.userInfo}
      </span>
      {showFollowBtn ? <Follow user={user} refetch = {refetch} /> : ""}
    </div>
  );
};

export default UserProfile;
