import { DateObj } from "./SystemType";

export interface SystemMessage {
  issueDate: Date | DateObj;
  createUserID: string;
  title: string;
  titleCHI: string;
  msg: string;
  msgCHI: string;
  type: "system";
  url: string;
  isRead: boolean;
  isDelete: boolean;
  image: string;
}
