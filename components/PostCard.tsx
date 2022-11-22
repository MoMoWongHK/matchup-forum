import React, { useEffect, useState } from "react";
import { Post, POST_TYPE } from "../model/Post";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { getUserBasicInfo } from "../helperFunction/userDBHelper";
import {
  isAuth,
  timeAgo,
  timeStampToDisplayTimeString,
} from "../utils/utiltyHelper";
import { useSelector } from "react-redux";
import { isLikedPost, setPostLike } from "../helperFunction/postDBHelper";
import { useRouter } from "next/router";

interface PostCardProps {
  data: Post;
}

export const PostCard: React.FC<PostCardProps> = ({ data }) => {
  const router = useRouter();
  const auth = useSelector((state: any) => {
    return state.LoginManager.auth;
  });

  const [postUser, setPostUser] = useState<{
    userName: string;
    avatarUrl: string;
  }>({
    userName: "",
    avatarUrl: "",
  });
  const [liked, setLiked] = useState<boolean>(false);

  useEffect(() => {
    getUserBasicInfo(data.createUserID).then((result) => {
      if (result.success) {
        setPostUser({
          userName: result.data.userName,
          avatarUrl: result.data.avatarUrl,
        });
      }
    });
  }, []);

  useEffect(() => {
    if (isAuth(auth)) {
      isLikedPost(data.id, auth.uid).then((result) => {
        if (result.success) {
          setLiked(result.liked);
        }
      });
    }
  }, [auth]);

  const onClickLike = () => {
    if (isAuth(auth)) {
      setPostLike(liked, data.id, auth.uid).then((result) => {
        // fake update
        if (result.success) {
          setLiked(!liked);
        }
      });
    } else {
      router.push("/login");
    }
  };

  return (
    <>
      <div
        className=" w-full grid py-2 px-4 mx-auto gap-2  "
        style={{ gridTemplateRows: "45px auto 45px" }}
      >
        {/* avatar and name*/}
        <div className="grid" style={{ gridTemplateColumns: "40px auto 30px" }}>
          <div>
            <div className="avatar">
              <div className="w-8 rounded-full">
                <img src={postUser.avatarUrl} alt={postUser.userName} />
              </div>
            </div>
          </div>
          <div className="text-gray-500">
            {postUser.userName}
            <span className="px-2 text-sm">
              {/*// eslint-disable-next-line @typescript-eslint/ban-ts-comment //*/}
              {/*@ts-ignore*/}
              {"-" + timeAgo(data.createDate.seconds)}
            </span>
          </div>
        </div>
        {/* post title*/}
        <h2 className="font-bold text-lg max-h-20">
          <div
            className="cursor-pointer hover:underline "
            onClick={() => router.push("/p/" + data.id)}
          >
            {data.title}
          </div>
        </h2>
        {/* post content*/}
        <div className="max-h-48">
          {data.type === POST_TYPE.TEXT && <div>{data.text}</div>}
        </div>
        {/* comment and share count */}
        <div className="flex gap-4">
          <button
            className="btn btn-ghost py-1 px-2 rounded-full"
            onClick={() => onClickLike()}
          >
            <FontAwesomeIcon
              icon={faThumbsUp}
              className={classNames("text-lg mr-2", {
                "text-blue-500": liked,
              })}
            />
            <span>{data.numOfLike}</span>
          </button>

          <button className="btn btn-ghost py-1 px-2 rounded-full">
            <FontAwesomeIcon
              icon={faComment}
              className={classNames("text-lg mr-2")}
            />
            <span>{data.numOfComment}</span>
          </button>
        </div>
      </div>
      <hr className="mx-auto my-4 w-11/12 bg-gray-200" />
    </>
  );
};
