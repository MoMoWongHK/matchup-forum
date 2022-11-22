import React from "react";
import { CommentWithUser } from "../model/CommentWithUser";
import { timeAgo } from "../utils/utiltyHelper";
import { Trans } from "react-i18next";

interface CommentItemProps {
  c: CommentWithUser;
}

export const CommentItem: React.FC<CommentItemProps> = ({ c }) => {
  return (
    <div className="grid gap-2" style={{ gridTemplateColumns: "30px auto" }}>
      <div>
        <div className="avatar">
          <div className="w-8 rounded-full">
            <img src={c.user.avatarUrl} alt={c.user.userName} />
          </div>
        </div>
      </div>
      <div
        className="grid max-h-64 w-full"
        style={{ gridTemplateRows: "30px auto 30px" }}
      >
        {/*    username section, with setting button and like count*/}
        <div className="font-bold text-gray-600 my-auto ">
          {c.user.userName}
        </div>

        {/*    content*/}
        <div className="max-h-48 my-2">{c.content}</div>
        {/*    date and reply button*/}
        <div className="flex">
          <div className="text-gray-400 text-sm my-1">
            {/*// eslint-disable-next-line @typescript-eslint/ban-ts-comment //*/}
            {/*@ts-ignore*/}
            {timeAgo(c.createDate.seconds)}
          </div>
          <button className="mx-2 my-auto btn btn-xs text-gray-400 btn-ghost">
            <Trans>CommentCard.reply</Trans>
          </button>
        </div>
      </div>
    </div>
  );
};
