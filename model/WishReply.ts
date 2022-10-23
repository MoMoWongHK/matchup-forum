import { DateObj } from "./SystemType";

export interface WishReply {
  content: string;
  createDate: Date | DateObj;
  createUserID: string;
}
