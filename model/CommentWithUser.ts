import { DateObj } from "./SystemType";

export type CommentWithUser = Comment & {
  user: {
    avatarUrl: string;
    userName: string;
  };
};

export interface Comment {
  id: string;
  content: string;
  createDate: Date | DateObj;
  numOfLike: number;
  numOfComment: number;
  type: COMMENT_TYPE;
  replyID: string;
}

export enum COMMENT_TYPE {
  COMMENT,
  REPLY,
  HIDDEN,
  ADMIN_REPLY,
}
