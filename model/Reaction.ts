import { DateObj } from "./SystemType";
import { POST_LIKE_DIRECTION } from "./Post";

export interface Reaction {
  createDate: Date | DateObj;
  createUserID: string;
  direction: POST_LIKE_DIRECTION;
}
