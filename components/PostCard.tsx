import React, { useEffect, useState } from "react";
import { Post, POST_TYPE } from "../model/Post";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faThumbsUp } from "@fortawesome/free-solid-svg-icons";

interface PostCardProps {
  data: Post;
}

export const PostCard: React.FC<PostCardProps> = ({ data }) => {
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {}, []);

  return (
    <div
      className="w-full grid py-2 mx-auto"
      style={{ gridTemplateRows: "45px auto 45px" }}
    >
      {/* avatar and name*/}
      <div className="grid" style={{ gridTemplateColumns: "40px auto 30px" }}>
        <div>
          <div className="avatar">
            <div className="w-24 rounded-full">
              <img src="https://placeimg.com/192/192/people" />
            </div>
          </div>
        </div>
        <div>{userName}</div>
      </div>
      {/* post content*/}
      <div className="max-h-48">
        {data.type === POST_TYPE.TEXT && <div>{data.text}</div>}
      </div>
      {/* comment and share count */}
      <div className="flex flex-">
        <div>
          <FontAwesomeIcon
            icon={faThumbsUp}
            className={classNames("text-lg mr-2")}
          />
          <span className="mx-2">{data.numOfLike}</span>
        </div>

        <div>
          <FontAwesomeIcon
            icon={faComment}
            className={classNames("text-lg mr-2")}
          />
          <span className="mx-2">{data.numOfComment}</span>
        </div>
      </div>
    </div>
  );
};
