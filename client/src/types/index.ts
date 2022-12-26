import { UploadFile } from "antd";

export type windowSizeObject = {
  width: number;
  height: number;
};

//used in header
export type headerMobileMenu = {
  mobileMoreAnchorEl: HTMLElement | null;
  isMobileMenuOpen: boolean;
  handleMobileMenuClose: any;
  handleProfileMenuOpen: any;
};
//used in header
export type headerMenu = {
  anchorEl: HTMLElement | null;
  isMenuOpen: boolean;
  handleMenuClose: () => void;
};

//used in  routes
export type routesType = {
  path: string;
  element: () => JSX.Element;
}[];

//used in tab menu
export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export type childrenProps = {
  children: JSX.Element;
};

export interface authButton {
  icon: string;
  text: string;
  handleFunc: (response: any) => void;
}

export type ModalState = {
  showModal: boolean;
  showEmailLoginForm: boolean;
  showEmailRegisterForm: boolean;
  showSocialRegisterForm: boolean;
  showSocialLoginForm: boolean;
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
};
