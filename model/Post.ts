import { DateObj } from "./SystemType";

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

interface POST_TEXT_DATA {
  type: POST_TYPE.TEXT;
  text: string;
}

interface POST_VOTE_DATA {
  type: POST_TYPE.VOTE;
  voteTitle: string;
  numOfVote: number;
  voteOptions: { label: string; count: number }[];
}

export const examplePost: Post[] = [
  {
    id: "1234",
    cateID: "all",
    createDate: new Date(),
    createUserID: "",
    numOfLike: 10,
    numOfShare: 5,
    numOfComment: 10,
    title: "Hello world",
    type: POST_TYPE.TEXT,
    text: "This is my first post haha",
  },
];