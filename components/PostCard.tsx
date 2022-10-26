import React, { useEffect, useState } from "react";
import { Post, POST_TYPE } from "../model/Post";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { getUserName } from "../helperFunction/userDBHelper";
import { isAuth, timeStampToDisplayTimeString } from "../utils/utiltyHelper";
import { useSelector } from "react-redux";
import { isLikedPost } from "../helperFunction/postDBHelper";

interface PostCardProps {
  data: Post;
}

export const PostCard: React.FC<PostCardProps> = ({ data }) => {
  const auth = useSelector((state: any) => {
    return state.firebase.auth;
  });

  const [userName, setUserName] = useState<string>("");
  const [liked, setLiked] = useState<boolean>(false);

  useEffect(() => {
    getUserName(data.createUserID).then((result) => {
      if (result.success) {
        setUserName(result.data);
      }
    });
  }, [auth]);

  useEffect(() => {
    if (isAuth(auth)) {
      isLikedPost(data.id, auth.uid).then((result) => {
        if (result.success) {
          setLiked(result.liked);
        }
      });
    }
  }, [auth]);

  return (
    <>
      <div
        className="w-full grid py-2 px-4 mx-auto gap-2  "
        style={{ gridTemplateRows: "45px auto 45px" }}
      >
        {/* avatar and name*/}
        <div className="grid" style={{ gridTemplateColumns: "40px auto 30px" }}>
          <div>
            <div className="avatar">
              <div className="w-8 rounded-full">
                <img src="https://placeimg.com/192/192/people" />
              </div>
            </div>
          </div>
          <div className="text-gray-500">
            {userName}
            <span>{timeStampToDisplayTimeString(data.createUserID)}</span>
          </div>
        </div>
        {/* post title*/}
        <h2 className="font-bold text-lg max-h-20">
          <div>{data.title}</div>
        </h2>
        {/* post content*/}
        <div className="max-h-48">
          {data.type === POST_TYPE.TEXT && <div>{data.text}</div>}
        </div>
        {/* comment and share count */}
        <div className="flex gap-4">
          <div>
            <FontAwesomeIcon
              icon={faThumbsUp}
              className={classNames("text-lg mr-2")}
            />
            <span>{data.numOfLike}</span>
          </div>

          <div>
            <FontAwesomeIcon
              icon={faComment}
              className={classNames("text-lg mr-2")}
            />
            <span>{data.numOfComment}</span>
          </div>
        </div>
      </div>
      <hr className="mx-auto my-4 w-11/12 bg-gray-200" />
    </>
  );
};
