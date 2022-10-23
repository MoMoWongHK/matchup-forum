import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faUser } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
import { Comment } from "../model/Comment";

interface CommentItemProps {
  c: Comment;
}

export const CommentItem: React.FC<CommentItemProps> = ({ c }) => {
  return (
    <div className="grid gap-2" style={{ gridTemplateColumns: "30px auto" }}>
      <div>
        <FontAwesomeIcon
          icon={faUser}
          className={classNames("text-lg text-gray-400")}
        />
      </div>
      <div
        className="grid max-h-64 w-full"
        style={{ gridTemplateRows: "30px auto 30px" }}
      >
        {/*    username section, with setting button and like count*/}
        <div className="flex justify-between">
          <div className="flex-start">{c.username}</div>
          <div className="order-last">hello</div>
        </div>

        {/*    content*/}
        <div className="max-h-48">{c.content}</div>
        {/*    date and reply button*/}
        <div className="flex">
          <div className="felx-2">1 days ago</div>
          <button className="btn btn-ghost">reply</button>
        </div>
      </div>
    </div>
  );
};
