import { useState, MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import SearchIcon from "@mui/icons-material/Search";
import MailIcon from "@mui/icons-material/Mail";
import MoreIcon from "@mui/icons-material/MoreVert";
import useWindowSize from "../../hooks/useWindowSize";
import logo from "../../assets/logo_black.png";
import LangSelector from "../../components/langSelector/LangSelector";
import { Search, SearchIconWrapper, StyledInputBase } from "./HeaderStyle";
import { renderMenu, renderMobileMenu, menuId, mobileMenuId } from "./Menu";

export default function Header() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { width } = useWindowSize();
  const navigate = useNavigate();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" elevation={1} className="!bg-white !text-black">
        <Toolbar>
          <img
            src={logo}
            alt="logo"
            onClick={() => navigate("/")}
            className="w-[150px] cursor-pointer"
          />
          <Search
            sx={
              width < 600
                ? {
                    height: "30px",
                    maxWidth: "50px",
                    marginLeft: "10px",
                    cursor: "pointer",
                  }
                : {}
            }
            onClick={() => (width > 600 ? "" : navigate("/search"))}
          >
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            {width > 600 ? (
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            ) : (
              ""
            )}
          </Search>
          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: { sm: "none", xs: "none", md: "flex" } }}>
            <LangSelector />
            <IconButton size="large" aria-label="show 4 new mails">
              <Badge badgeContent={4} color="error">
                <MailIcon sx={{ color: "black" }} />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
            >
              <Avatar>N</Avatar>
            </IconButton>
          </Box>

          {width < 900 ? <LangSelector /> : ""}

          <Box sx={{ display: { sm: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {renderMobileMenu({
        mobileMoreAnchorEl,
        isMobileMenuOpen,
        handleMobileMenuClose,
        handleProfileMenuOpen,
      })}

      {renderMenu({ anchorEl, isMenuOpen, handleMenuClose })}
    </Box>
  );
}
