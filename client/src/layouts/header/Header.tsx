import { useState, MouseEvent, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { message } from "antd";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { useTranslation } from "react-i18next";
import Cookies from "universal-cookie";
import Avatar from "@mui/material/Avatar";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MoreIcon from "@mui/icons-material/MoreVert";
import useWindowSize from "../../hooks/useWindowSize";
import logo from "../../assets/logo/logo_black.png";
import LangSelector from "../../components/langSelector/LangSelector";
import { renderMenu, renderMobileMenu, menuId, mobileMenuId } from "./Menu";
import SignIn from "../../features/auth/button/SignIn";
import NewReviewBtn from "../../components/button/NewReviewBtn";
import { User } from "../../types/api";
import { useAppSelector } from "../../hooks/useAppSelector";
import {
  getCurrentUser,
  removeCurrentUser,
} from "../../services/api/user/user";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { isAuthenticated } from "../../utils/AuthUserDefiner";
import { useLogoutMutation } from "../../services/api/user/auth";
import Spinner from "../../components/spinner/Spinner";
import Cloudinary from "../../components/CloudImage/Cloudinary";
import useEffectOnce from "../../hooks/useEffectOnce";
import SearchCustom from "../../components/searchInput/SearchCustom";
import { toggleDarkMode } from "../../services/ui/modalSlice";

export default function Header() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const { currentUser } = useAppSelector((state) => state.users);
  const { darkMode } = useAppSelector((state) => state.authModal);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { width } = useWindowSize();
  const navigate = useNavigate();
  const [logoutFunc, { isSuccess, isLoading, isError }] = useLogoutMutation();
  const cookie = new Cookies();
  const location = useLocation();

  useEffect(() => {
    dispatch(getCurrentUser())
      .unwrap()
      .then((data) => {
        cookie.set("userId", data._id);
        if (data.role === "super_admin") {
          cookie.set("role", data.role);
        }
      });
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess) {
      message.success(t("p109"));
    } else if (isError) {
      message.error(t('p31'));
    }
  }, [isSuccess, isError]);

  useEffectOnce(() => {
    if (!cookie.get("user_basket")) {
      cookie.set("user_basket", []);
    }
  });

  const handleProfileMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = (route: string) => {
    setAnchorEl(null);
    handleMobileMenuClose();
    navigate(route);
  };

  const handleMobileMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleDarkMode = () => {
    dispatch(toggleDarkMode(!darkMode));
  };

  const handleLogout = async () => {
    await logoutFunc(currentUser as User);
    dispatch(removeCurrentUser());
    cookie.remove("userId");
    if (currentUser?.role === "super_admin") {
      cookie.remove("role");
    }
    navigate("/");
  };

  return (
    <>
      {isLoading ? <Spinner isLoading={isLoading} /> : ""}
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          elevation={1}
          className="!bg-white !text-black  dark:!bg-zinc-800 dark:!text-white "
        >
          <Toolbar>
            <img
              src={logo}
              alt="logo"
              onClick={() => navigate("/")}
              className="w-[150px] cursor-pointer"
            />
            <SearchCustom />
            <Box sx={{ flexGrow: 1 }} />

            <Box sx={{ display: { sm: "none", xs: "none", md: "flex" } }}>
              <LangSelector />

              <DarkModeSwitch
                checked={darkMode}
                className="mt-2 mx-2"
                onChange={() => dispatch(toggleDarkMode(!darkMode))}
              />

              {isAuthenticated() && currentUser ? <NewReviewBtn /> : ""}
              {isAuthenticated() && currentUser ? "" : <SignIn />}
              {isAuthenticated() && currentUser ? (
                <IconButton
                  size="small"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                >
                  {currentUser?.image ? (
                    <div className="overflow-hidden w-[35px] h-[35px] rounded-full">
                      <Cloudinary img={currentUser?.image} />
                    </div>
                  ) : (
                    <Avatar
                      sx={{ background: "#03776f", width: 35, height: 35 }}
                    >
                      <span>{currentUser.name.slice(0, 1)}</span>
                    </Avatar>
                  )}
                </IconButton>
              ) : (
                ""
              )}
            </Box>

            {width < 900 ? (
              <>
                {" "}
                {isAuthenticated() && currentUser ? <NewReviewBtn /> : ""}
                {isAuthenticated() && currentUser ? "" : <SignIn />}
              </>
            ) : (
              ""
            )}

            {isAuthenticated() && currentUser ? (
              <Box sx={{ display: { sm: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  className="dark:text-white"
                >
                  <MoreIcon />
                </IconButton>
              </Box>
            ) : (
              ""
            )}
          </Toolbar>
        </AppBar>

        {isAuthenticated() && currentUser
          ? renderMobileMenu({
              mobileMoreAnchorEl,
              isMobileMenuOpen,
              handleMobileMenuClose,
              handleProfileMenuOpen,
              user: currentUser as User,
              darkMode,
              handleDarkMode,
            })
          : ""}

        {isAuthenticated() && currentUser
          ? renderMenu({
              anchorEl,
              isMenuOpen,
              handleMenuClose,
              user: currentUser as User,
              handleLogout,
              location,
              t,
            })
          : ""}
      </Box>
    </>
  );
}
