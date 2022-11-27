import { DateObj } from "./SystemType";

export type PostCreate = {
  id: string;
  cateID: string;
  createDate: Date | DateObj;
  createUserID: string;
  numOfLike: number;
  numOfShare: number;
  numOfComment: number;
  title: string;
};

export type Post = {
  id: string;
  cateID: string;
  createDate: Date | DateObj;
  createUserID: string;
  numOfLike: number;
  numOfShare: number;
  numOfComment: number;
  title: string;
} & (POST_TEXT_DATA | POST_VOTE_DATA);

export enum POST_TYPE {
  TEXT = "TEXT",
  VOTE = "VOTE",
}

export enum POST_LIKE_DIRECTION {
  LIKE = "LIKE",
  DISLIKE = "DISLIKE",
}

export interface POST_TEXT_DATA {
  type: POST_TYPE.TEXT;
  text: string;
}

export interface POST_VOTE_DATA {
  type: POST_TYPE.VOTE;
  text: string;
  numOfVote: number;
  voteOptions: { label: string; count: number }[];
}

export const examplePost: Post[] = [
  {
    id: "1234",
    cateID: "all",
    createDate: new Date(),
    createUserID: "FxidWlYpT1MXSMPtt8eE",
    numOfLike: 10,
    numOfShare: 5,
    numOfComment: 10,
    title: "Hello world",
    type: POST_TYPE.TEXT,
    text: "This is my first post haha",
  },
  {
    id: "1234",
    cateID: "all",
    createDate: new Date(),
    createUserID: "FxidWlYpT1MXSMPtt8eE",
    numOfLike: 10,
    numOfShare: 5,
    numOfComment: 10,
    title: "Hello world",
    type: POST_TYPE.TEXT,
    text: "This is my first post haha",
  },
  {
    id: "1234",
    cateID: "all",
    createDate: new Date(),
    createUserID: "FxidWlYpT1MXSMPtt8eE",
    numOfLike: 10,
    numOfShare: 5,
    numOfComment: 10,
    title: "Hello world",
    type: POST_TYPE.TEXT,
    text: "This is my first post haha",
  },
];

export const PostDefault: PostCreate = {
  id: "",
  cateID: "",
  createDate: new Date(),
  createUserID: "",
  numOfLike: 0,
  numOfShare: 0,
  numOfComment: 0,
  title: "",
};

export const PostVoteDefault: {
  text: string;
  numOfVote: number;
  voteOptions: { label: string; count: number }[];
} = {
  text: "",
  numOfVote: 0,
  voteOptions: [],
};
