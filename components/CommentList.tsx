import React, { useState } from "react";
import { Comment } from "../model/Comment";
import { CommentItem } from "./Comment";

interface CommentListProps {
  postID: string;
}

const draftComment: Comment[] = [
  {
    id: "123",
    avatarUrl: "https://look4kol.com/logo.png",
    username: "momowonghk",
    content: "hello world",
    createDate: new Date(),
    numOfLike: 43,
  },
];

export const CommentList: React.FC<CommentListProps> = ({ postID }) => {
  const [comments, setComments] = useState<Comment[]>(draftComment);
  const [isLoaded, setIsLoaded] = useState<boolean>(true);

  return (
    <div className="w-full my-8">
      <h2>5 comments in total</h2>
      <hr />

      {isLoaded &&
        comments.map((e) => {
          return <CommentItem key={e.id} c={e} />;
        })}
    </div>
  );
};
