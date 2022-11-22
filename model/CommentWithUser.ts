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
  createUserID: string;
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

export const CommentDefault: Comment = {
  id: "",
  content: "",
  createDate: new Date(),
  createUserID: "",
  numOfLike: 0,
  numOfComment: 0,
  type: COMMENT_TYPE.COMMENT,
  replyID: "",
};

export const CommentWithUserDefault: CommentWithUser = {
  id: "",
  content: "",
  createDate: new Date(),
  createUserID: "",
  numOfLike: 0,
  numOfComment: 0,
  type: COMMENT_TYPE.COMMENT,
  replyID: "",
  user: {
    avatarUrl: "",
    userName: "",
  },
};
