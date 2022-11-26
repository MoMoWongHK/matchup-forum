import React, { useEffect, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { isAuth } from "../utils/utiltyHelper";
import { useRouter } from "next/router";
import classNames from "classnames";
import { addComment, getMyComment } from "../helperFunction/commentDBHelper";
import {
  CommentWithUser,
  CommentWithUserDefault,
} from "../model/CommentWithUser";
import { CommentItem } from "../components/CommentCard";

export const NewCommentContainer: React.FC = () => {
  const router = useRouter();

  const { id } = router.query;

  const auth = useSelector((state: any) => {
    return state.LoginManager.auth;
  });

  const [myOldComment, setMyOldComment] = useState<CommentWithUser>(
    CommentWithUserDefault
  );
  const [hasOldComment, setHasOldComment] = useState<boolean>(false);

  const [comment, setComment] = useState<string>("");
  const [replyID, setReplyID] = useState<string>("");
  const { t } = useTranslation("");

  const [sending, setSending] = useState<boolean>(false);

  const sendComment = () => {
    setSending(true);
    addComment(id as string, auth.uid, comment, replyID).then((result) => {
      if (result.success) {
        // setMyOldComment(result.data);
        // setHasOldComment(true);
      }
    });
  };

  useEffect(() => {
    if (isAuth(auth)) {
      getMyComment(id as string, auth.uid).then((result) => {
        if (result.success) {
          setMyOldComment(result.data);
          setHasOldComment(true);
        }
      });
    }
  }, [id, auth]);

  if (isAuth(auth) && !hasOldComment) {
    return (
      <div>
        <h3>
          <Trans>NewCommentContainer.your-comment</Trans>
        </h3>

        {/* avatar*/}
        <div>
          <div className="avatar">
            <div className="w-8 rounded-full">
              <img src={auth.avatarUrl} alt={auth.userName} />
            </div>
          </div>
        </div>

        <div className="form-control">
          <textarea
            className="textarea textarea-bordered h-24"
            placeholder={t("NewCommentContainer.type-comment")}
            onChange={(e) => {
              if (e.target.value.length < 250) {
                setComment(e.target.value);
              }
            }}
          ></textarea>
          <label className="label">
            <span className="label-text-alt">{comment.length + " / 250"}</span>
            <button
              disabled={sending}
              className={classNames("btn btn-sm", {
                loading: sending,
              })}
              onClick={() => sendComment()}
            >
              {sending ? (
                <Trans>NewCommentContainer.sending</Trans>
              ) : (
                <Trans>NewCommentContainer.send</Trans>
              )}
            </button>
          </label>
        </div>
      </div>
    );
  } else if (isAuth(auth) && hasOldComment) {
    return <CommentItem c={myOldComment} />;
  } else {
    return (
      <div
        className="p-2 cursor-pointer hover:underline rounded-2xl bg-gray-100 text-gray-700 text-center"
        onClick={() => router.push("/login")}
      >
        <Trans>NewCommentContainer.login-required</Trans>
      </div>
    );
  }
};
