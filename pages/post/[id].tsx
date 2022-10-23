import React from "react";
import { NextPage } from "next";
import { CommentList } from "../../components/CommentList";

const PostPage: NextPage = () => {
  return (
    <div>
      123
      <CommentList postID={"123"} />
    </div>
  );
};

export default PostPage;
