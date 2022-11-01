import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { CommentList } from "../../components/CommentList";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { getPost } from "../../helperFunction/postDBHelper";
import { Post } from "../../model/Post";

const PostPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const auth = useSelector((state: any) => {
    return state.LoginManager.auth;
  });

  const [post, setPost] = useState<Post>();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      getPost(id as string).then((result) => {
        if (result.success) {
          setPost(result.data);
          setIsLoaded(true);
        }
      });
    }
  }, [id]);

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-8">post</div>

      {id && (
        <div className="col-span-4">
          <CommentList postID={id as string} />
        </div>
      )}
    </div>
  );
};

export default PostPage;
