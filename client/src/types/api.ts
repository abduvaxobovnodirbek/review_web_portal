export interface Review {
  id: string;
  name: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  image: string;
  status: boolean;
  role: string;
  googleId: string | null;
  facebookId: string | null;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
