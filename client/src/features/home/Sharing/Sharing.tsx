import TelegramIcon from "@mui/icons-material/Telegram";
import { Button } from "antd";
import logo from "../../../assets/logo/logo_black.png";

const Sharing = () => {
  return (
    <div className="mt-12 flex flex-col items-center">
      <div className="flex justify-center items-center">
        <img src={logo} alt="logo" className="w-[30%] cursor-pointer " />
        <span className="mx-2 font-serif text-2xl">+</span>
        <TelegramIcon sx={{ color: "#03776f" }} fontSize="large" />
      </div>
      <h3
        className="ml-2 font-serif text-lg font-bold italic text-center"
        style={{ color: "#03776f" }}
      >
        Invite friends
      </h3>
      <Button className="mt-3 mb-3 ant-btn">Share with Telegram</Button>
    </div>
  );
};

export default Sharing;
