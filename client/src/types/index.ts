import { User } from "./api";
export type windowSizeObject = {
  width: number;
  height: number;
};

export type headerMobileMenu = {
  mobileMoreAnchorEl: HTMLElement | null;
  isMobileMenuOpen: boolean;
  user: User;
  handleMobileMenuClose: any;
  handleProfileMenuOpen: any;
};

export type headerMenu = {
  anchorEl: HTMLElement | null;
  isMenuOpen: boolean;
  user: User;
  handleLogout: () => void;
  handleMenuClose: (str: string) => void;
};

export type routesType = {
  path: string;
  element: () => JSX.Element;
  protected: boolean;
}[];

export type childrenProps = {
  children: JSX.Element;
};

export type TabTypes = {
  tabOptions: { names: string[] };
};

export type ModalState = {
  showModal: boolean;
  showEmailLoginForm: boolean;
  showEmailRegisterForm: boolean;
  showSocialRegisterForm: boolean;
  showSocialLoginForm: boolean;
  showProfileModal: boolean;
};

export type Steps = {
  stepFirst: boolean;
  stepSecond: boolean;
  stepThird: boolean;
};

export type gradeType = {
  formik?: any;
  authorGrade?: boolean;
  userGrade?: boolean;
  count: number;
  defaultValue: number;
  labelText?: string;
  disabled: boolean;
  createReview: boolean;
};

export type textEditorTypes = {
  displayMode: "EDIT" | "PREVIEW";
  formik?: any;
  createReview: boolean;
  review?: string;
};

export interface authButton {
  icon: string;
  text: string;
  handleFunc: (response: any) => void;
}

export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
