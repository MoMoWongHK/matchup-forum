import React, { useState, useEffect } from "react";
import { NextPage } from "next";
import { examplePost, Post } from "../../model/Post";
import ListPost from "../../page-components/ListPost";
import { Trans } from "next-i18next";
import { Category, defaultCategory } from "../../model/Category";

const Category: NextPage = () => {
  const [category, setCategory] = useState<Category>(defaultCategory);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const getCategoryData = () => {
    setCategory(defaultCategory);
  };

  const getPostsData = () => {
    setPosts(examplePost);
    setIsLoaded(true);
  };

  useEffect(() => {
    getCategoryData();
    getPostsData();
  }, []);

  return (
    <div className="my-4">
      <section className="relative px-2 xl:px-4 ">
        <h1 className="text-3xl font-bold mb-4">{category.titleHK}</h1>
        <button className="absolute right-0 top-0 btn btn-sm md:btn-md w-20 md:w-40 btn-primary">
          <Trans>CategoryPage.follow</Trans>
        </button>
        <div className="text-sm text-gray-500">{category.descriptionHK}</div>
      </section>

      <div className="my-8 mx-auto">
        <div className="tabs tabs-boxed p-2">
          <a className="tab ">
            <Trans>CategoryPage.hot</Trans>
          </a>
          <a className="tab tab-active">
            <Trans>CategoryPage.newest</Trans>
          </a>
        </div>
      </div>
      <ListPost posts={posts} />
    </div>
  );
};

export default Category;
