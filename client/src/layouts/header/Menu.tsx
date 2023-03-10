import { DarkModeSwitch } from "react-toggle-dark-mode";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { headerMenu, headerMobileMenu } from "../../types/index";
import LangSelector from "../../components/langSelector/LangSelector";
import { FaUser } from "react-icons/fa";
import { BiBookmarks, BiLogOut } from "react-icons/bi";
import { GrUserAdmin } from "react-icons/gr";
import { MdOutlineRateReview } from "react-icons/md";
import Cloudinary from "../../components/CloudImage/Cloudinary";

export const menuId = "primary-search-account-menu";

export const renderMenu = ({
  anchorEl,
  isMenuOpen,
  handleMenuClose,
  handleLogout,
  location,
  user,
  t
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
      onClose={() => handleMenuClose(location.pathname)}
    >
      <MenuItem
        onClick={() => {
          handleMenuClose("/profile");
        }}
        className="!flex !items-center dark:!bg-zinc-700"
      >
        <FaUser className="mr-2" />{" "}
        <span className="text-gray-600 text-sm font-serif">{t("p2")}</span>
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleMenuClose("/self-reviews");
        }}
        className="!flex !items-center"
      >
        <MdOutlineRateReview className="mr-2" />{" "}
        <span className="text-gray-600 text-sm font-serif">{t("p3")}</span>
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleMenuClose("/saved-reviews");
        }}
        className="!flex !items-center"
      >
        <BiBookmarks className="mr-2" />{" "}
        <span className="text-gray-600 text-sm font-serif">{t("p4")}</span>
      </MenuItem>
      {user.role === "super_admin" ? (
        <MenuItem
          onClick={() => {
            handleMenuClose("/admin/panel");
          }}
          className="!flex !items-center"
        >
          <GrUserAdmin className="mr-2" />{" "}
          <span className="text-gray-600 text-sm font-serif">{t("p6")}</span>
        </MenuItem>
      ) : (
        ""
      )}
      <MenuItem
        onClick={() => {
          handleLogout();
          handleMenuClose("/");
        }}
        className="!flex !items-center"
      >
        <BiLogOut className="mr-2" />{" "}
        <span className="text-gray-600 text-sm font-serif">{t("p5")}</span>
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
  darkMode,
  handleDarkMode,
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
      className="dark:!bg-zinc-700"
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
        <DarkModeSwitch
          checked={darkMode}
          className="mt-2 mx-2"
          onChange={handleDarkMode}
        />
      </MenuItem>

      <MenuItem>
        <LangSelector />
      </MenuItem>
    </Menu>
  );
};
