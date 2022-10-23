import { DateObj } from "./SystemType";

export interface Wish {
  title: string;
  content: string;
  type: WISH_TYPE;
  status: WISH_STATUS;
  createDate: Date | DateObj;
  createUserID: string;
  lastUpdate: Date | DateObj;
}

export enum WISH_TYPE {
  EMOTION,
  INVESTMENT,
  NETWORK,
  EMPLOYMENT,
  ADVISE,
  BUSINESS,
}

export enum WISH_STATUS {
  PENDING,
  SOLVING,
  SOLVED,
}
