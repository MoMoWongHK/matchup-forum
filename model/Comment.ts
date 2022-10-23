import { DateObj } from "./SystemType";

export interface Comment {
  id: string;
  avatarUrl: string;
  username: string;
  content: string;
  createDate: Date | DateObj;
  numOfLike: number;
}
