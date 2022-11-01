import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faUser } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
import { CommentWithUser } from "../model/CommentWithUser";
import { timeAgo } from "../utils/utiltyHelper";

interface CommentItemProps {
  c: CommentWithUser;
}

export const CommentItem: React.FC<CommentItemProps> = ({ c }) => {
  console.log(c);
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
        <div className="font-bold text-gray-600 my-auto px-2">
          {c.user.userName}
        </div>

        {/*    content*/}
        <div className="max-h-48">{c.content}</div>
        {/*    date and reply button*/}
        <div className="flex">
          <div className="">{timeAgo(c.createDate.seconds)}</div>
          <button className="mx-2 my-auto btn btn-xs btn-ghost">reply</button>
        </div>
      </div>
    </div>
  );
};
