import React, { useState } from "react";
import { NextPage } from "next";
import { Post } from "../model/Post";
import { PostCard } from "../components/PostCard";

interface ListPostProps {
  posts: Post[];
}

const ListPost: NextPage<ListPostProps> = ({ posts }) => {
  return (
    <div>
      {posts &&
        posts.map((e) => {
          return <PostCard key={e.id} data={e} />;
        })}
    </div>
  );
};

export default ListPost;
