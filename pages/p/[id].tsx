import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { CommentList } from "../../components/CommentList";
import { useRouter } from "next/router";
import { getPost } from "../../helperFunction/postDBHelper";
import { Post, PostDefault } from "../../model/Post";
import { PostDisplay } from "../../page-components/PostDisplay";
import { timeAgo } from "../../utils/utiltyHelper";
import { getUserBasicInfo } from "../../helperFunction/userDBHelper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { Trans } from "react-i18next";

const PostPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [post, setPost] = useState<Post>(PostDefault);

  const [postUser, setPostUser] = useState<{
    userName: string;
    avatarUrl: string;
  }>({
    userName: "",
    avatarUrl: "",
  });

  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      getPost(id as string).then((result) => {
        if (result.success) {
          // get post creator information
          getUserBasicInfo(result.data.createUserID).then((result) => {
            if (result.success) {
              setPostUser({
                userName: result.data.userName,
                avatarUrl: result.data.avatarUrl,
              });
            }
          });

          setPost(result.data);
          setIsLoaded(true);
        }
      });
    }
  }, [id]);

  return (
    <div className="md:grid grid-cols-12 gap-4 p-4 max-w-7xl mx-auto">
      <div className="col-span-12">
        <button
          className="my-auto text-left my-2 mx-2 text-gray-600 font-medium text-xl"
          onClick={() => {
            router.push("/");
          }}
        >
          <FontAwesomeIcon width="16" icon={faChevronLeft} />
          <span className="mx-2 font-bold">
            <Trans>PostPage.back</Trans>
          </span>
        </button>
      </div>

      <div className="col-span-8">
        {/* Post title */}
        <h1 className="font-bold text-2xl my-4">{post.title}</h1>

        {/* avatar and name*/}
        <div
          className="grid my-4"
          style={{ gridTemplateColumns: "40px auto 30px" }}
        >
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
              {"-" + timeAgo(post.createDate.seconds)}
            </span>
          </div>
        </div>

        {/* Post content */}
        <PostDisplay post={post} />
      </div>

      {id && (
        <div className="col-span-4">
          <CommentList postID={id as string} noOfComment={post.numOfComment} />
        </div>
      )}
    </div>
  );
};

export default PostPage;
