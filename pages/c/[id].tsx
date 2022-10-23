import React, { useState, useEffect } from "react";
import { NextPage } from "next";
import { examplePost, Post } from "../../model/Post";
import ListPost from "../../page-components/ListPost";

const Category: NextPage = () => {
  const [cateName, setCateName] = useState<string>("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    setPosts(examplePost);
    setIsLoaded(true);
  }, []);

  return (
    <div>
      <h1>Cate Name</h1>

      <div>
        <div className="tabs tabs-boxed">
          <a className="tab ">Tab 1</a>
          <a className="tab tab-active">Tab 2</a>
          <a className="tab">Tab 3</a>
        </div>
      </div>
      <ListPost posts={posts} />
    </div>
  );
};

export default Category;
