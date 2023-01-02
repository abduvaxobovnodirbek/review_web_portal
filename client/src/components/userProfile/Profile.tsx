import { Avatar } from "@mui/material";
import { Button } from "antd";
import { User } from "../../types/api";

const Profile = ({ user }: { user: User | undefined }) => {
  return (
    <div className="flex items-center flex-col">
      <Avatar
        sx={{ background: "#03776f", width: 150, height: 150 }}
        src={user?.image}
        alt="avatar img"
      />
      <span className="text-center mt-6 font-serif font-bold text-gray-600">
        {user?.name}
      </span>
      <span className="text-center mt-2 font-serif  text-gray-600">
        114 followers
      </span>
      <span className="px-3 text-center mt-6 font-serif text-gray-600">
        Chief Decision Scientist, Google. ❤️ Stats, ML/AI, data, puns, art,
        theatre, decision science. All views are my own. twitter.com/quaesita
      </span>
      <Button className="mt-3 w-[150px] font-bold">Follow</Button>
    </div>
  );
};

export default Profile;
