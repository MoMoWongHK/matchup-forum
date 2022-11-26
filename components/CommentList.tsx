import React, { useEffect, useState } from "react";
import { COMMENT_TYPE, CommentWithUser } from "../model/CommentWithUser";
import { CommentItem } from "./CommentCard";
import { getComments } from "../helperFunction/commentDBHelper";
import { Trans } from "react-i18next";
import { NewCommentContainer } from "../page-components/NewCommentContainer";
import { useSelector } from "react-redux";
import { isAuth } from "../utils/utiltyHelper";

interface CommentListProps {
  postID: string;
  noOfComment: number;
}

const draftComment: CommentWithUser[] = [
  {
    id: "123",
    content: "hello world",
    createDate: new Date(),
    createUserID: "123",
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

export const CommentList: React.FC<CommentListProps> = ({
  postID,
  noOfComment,
}) => {
  const auth = useSelector((state: any) => {
    return state.LoginManager.auth;
  });

  const [comments, setComments] = useState<CommentWithUser[]>([]);
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
      <h2 className="text-xl font-bold">
        <Trans>CommentList.title</Trans>
      </h2>
      <div className="text-gray-500 my-2">
        {noOfComment}
        <Trans>CommentList.comment-total</Trans>
      </div>
      <hr className="my-4" />

      <div className="mr-2 my-4">
        <NewCommentContainer />
      </div>

      <hr />

      {isLoaded &&
        comments.length > 0 &&
        comments.map((e) => {
          if ((isAuth(auth) && e.createUserID !== auth.uid) || !isAuth(auth)) {
            return <CommentItem key={e.id} c={e} />;
          }
        })}

      {isLoaded && comments.length === 0 && (
        <div className="text-center text-sm rounded-lg my-4 p-2 bg-gray-100 text-gray-700 border border-gray-200">
          <Trans>CommentList.no-comment-was-found</Trans>
        </div>
      )}
    </div>
  );
};
