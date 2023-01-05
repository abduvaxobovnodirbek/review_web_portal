import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { headerMenu, headerMobileMenu } from "../../types/index";
import LangSelector from "../../components/langSelector/LangSelector";
import { FaUser } from "react-icons/fa";
import { BiBookmarks, BiLogOut } from "react-icons/bi";
import { MdOutlineRateReview } from "react-icons/md";
import Cloudinary from "../../components/cloudImage/Cloudinary";

export const menuId = "primary-search-account-menu";

export const renderMenu = ({
  anchorEl,
  isMenuOpen,
  handleMenuClose,
  handleLogout,
}: headerMenu) => {
  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={() => handleMenuClose("/")}
    >
      <MenuItem
        onClick={() => {
          handleMenuClose("/user-profile");
        }}
        className="!flex !items-center"
      >
        <FaUser className="mr-2" />{" "}
        <span className="text-gray-600 text-sm font-serif">Profile</span>
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleMenuClose("/personal-reviews");
        }}
        className="!flex !items-center"
      >
        <MdOutlineRateReview className="mr-2" />{" "}
        <span className="text-gray-600 text-sm font-serif">Review List</span>
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleMenuClose("/saved-reviews");
        }}
        className="!flex !items-center"
      >
        <BiBookmarks className="mr-2" />{" "}
        <span className="text-gray-600 text-sm font-serif">Saved</span>
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleLogout();
          handleMenuClose("/");
        }}
        className="!flex !items-center"
      >
        <BiLogOut className="mr-2" />{" "}
        <span className="text-gray-600 text-sm font-serif">Log out</span>
      </MenuItem>
    </Menu>
  );
};

export const mobileMenuId = "primary-search-account-menu-mobile";

export const renderMobileMenu = ({
  mobileMoreAnchorEl,
  isMobileMenuOpen,
  handleMobileMenuClose,
  handleProfileMenuOpen,
  user,
}: headerMobileMenu) => {
  return (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
        >
          {user?.image ? (
            <div className="overflow-hidden w-[35px] h-[35px] rounded-full">
              <Cloudinary img={user?.image} />
            </div>
          ) : (
            <Avatar sx={{ background: "#03776f", width: 35, height: 35 }}>
              <span>{user.name.slice(0, 1)}</span>
            </Avatar>
          )}
        </IconButton>
      </MenuItem>

      <MenuItem>
        <LangSelector />
      </MenuItem>
    </Menu>
  );
};
