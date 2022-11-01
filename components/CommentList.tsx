import React, { useEffect, useState } from "react";
import { COMMENT_TYPE, CommentWithUser } from "../model/CommentWithUser";
import { CommentItem } from "./CommentCard";
import { posts } from "@reduxjs/toolkit/src/query/tests/mocks/server";
import { getComments } from "../helperFunction/commentDBHelper";

interface CommentListProps {
  postID: string;
}

const draftComment: CommentWithUser[] = [
  {
    id: "123",
    content: "hello world",
    createDate: new Date(),
    numOfLike: 43,
    numOfComment: 0,
    type: COMMENT_TYPE.COMMENT,
    replyID: "",
    user: {
      avatarUrl: "https://look4kol.com/logo.png",
      userName: "momowonghk",
    },
  },
];

export const CommentList: React.FC<CommentListProps> = ({ postID }) => {
  const [comments, setComments] = useState<CommentWithUser[]>(draftComment);
  const [isLoaded, setIsLoaded] = useState<boolean>(true);

  useEffect(() => {
    if (postID) {
      getComments(postID, 20).then((result) => {
        if (result.success) {
          setComments(result.data);
        }
      });
    }
  }, [postID]);

  return (
    <div className="w-full my-8">
      <h2></h2>
      <div className="text-gray-500 my-2">5 comments in total</div>
      <hr />

      {isLoaded &&
        comments.map((e) => {
          return <CommentItem key={e.id} c={e} />;
        })}
    </div>
  );
};
