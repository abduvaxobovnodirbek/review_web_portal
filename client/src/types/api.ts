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
  following?: string[];
  followers?: string[];
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
  likeCount:number;
  rating: any[];
  averageRate?: number;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  key?: number;
}

export interface Pagination {
  next?: { page: number };
  prev?: { page: number };
}

export interface ReviewAndUser {
  success: boolean;
  data?: ReviewAndUserData;
}

export interface ReviewAndUserData {
  reviews: ReviewDetail[];
  user: User;
}

export type FormValues = {
  review_name: string;
  reviewed_art: string;
  category: string;
  tags: any[];
  description: string;
  authorGrade: number;
  imageList: any[] | undefined;
  review_id?: string;
};
