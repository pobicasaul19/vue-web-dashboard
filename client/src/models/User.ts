export interface AuthUser {
  userInfo: User | null;
  token: string | null;
}
export interface User {
  _id: number;
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
  type: string;
  status: string
}

export interface UserPayload {
  _id: number;
  firstName: string;
  lastName: string;
  type: string;
  status: string
}
