export interface Review {
  id: string;
  name: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  image?: string;
  status: boolean;
  role: string;
  googleId: string | null;
  facebookId: string | null;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  password?: string;
  userInfo?: string;
}

export interface Category {
  _id: string;
  name: string;
  __v?: number;
}

export interface ReviewsType {
  success: boolean;
  count: number;
  pagination: Pagination;
  data: ReviewDetail[];
  nextPage: boolean;
}

export interface ReviewDetail {
  _id: string;
  review_name: string;
  description: string;
  reviewed_art: string;
  category: Category;
  user: User;
  tags: string[];
  authorGrade: number;
  imageList: string[];
  likes: any[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface Pagination {}

export interface ReviewAndUser {
  success: boolean;
  data?: ReviewAndUserData;
}

export interface ReviewAndUserData {
  reviews: ReviewDetail[];
  user: User;
}
