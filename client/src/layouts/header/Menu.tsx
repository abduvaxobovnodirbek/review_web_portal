import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MailIcon from "@mui/icons-material/Mail";
import { headerMenu, headerMobileMenu } from "../../types/index";
import LangSelector from "../../components/langSelector/LangSelector";
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
      onClose={()=>handleMenuClose('/')}
    >
      <MenuItem
        onClick={() => {
          handleMenuClose('/user-profile');
        }}
      >
        Profile
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleLogout();
          handleMenuClose("/");
        }}
      >
        Log out
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
      {/* <MenuItem className="!flex !justify-center">
        <IconButton size="large" aria-label="show mails" >
          <Badge badgeContent={4} color="success">
            <MailIcon sx={{ color: "#03776f" }} />
          </Badge>
        </IconButton>
      </MenuItem> */}

      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
        >
          <Avatar
            sx={{ background: "#03776f", width: 35, height: 35 }}
            src={user?.image}
            alt="avatar img"
          />
        </IconButton>
      </MenuItem>

      <MenuItem>
        <LangSelector />
      </MenuItem>
    </Menu>
  );
};
