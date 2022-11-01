import React, { useState, useEffect } from "react";
import { NextPage } from "next";
import { Post } from "../../model/Post";
import ListPost from "../../page-components/ListPost";
import { Trans } from "next-i18next";
import { Category, defaultCategory } from "../../model/Category";
import { useRouter } from "next/router";
import { getCategory } from "../../helperFunction/categoryDBHelper";
import { getPosts } from "../../helperFunction/postDBHelper";
import { CommentList } from "../../components/CommentList";

const Category: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [category, setCategory] = useState<Category>(defaultCategory);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const getCategoryData = (id: string) => {
    getCategory(id).then((result) => {
      if (result.success) {
        setCategory(result.data);
      } else {
        // if cate not found redirect to homepage
        router.push("/");
      }
    });
  };

  const getPostsData = (id: string) => {
    getPosts(id, 20).then((result) => {
      if (result.success) {
        setPosts(result.data);
        setIsLoaded(true);
      } else {
        setPosts([]);
        setIsLoaded(true);
      }
    });
  };

  useEffect(() => {
    if (id) {
      getCategoryData(id as string);
      getPostsData(id as string);
    }
  }, [id]);

  return (
    <div className="my-4">
      <section className="relative px-4 xl:px-8 ">
        <h1 className="text-3xl font-bold mb-4">{category.titleHK}</h1>
        <button className="absolute right-0 top-0 btn btn-sm md:btn-md w-20 md:w-40 btn-primary">
          <Trans>CategoryPage.follow</Trans>
        </button>
        <div className="text-lg text-gray-500">{category.descriptionHK}</div>
      </section>

      <div className="my-8 max-w-md mx-auto">
        <div className="tabs tabs-boxed p-2">
          <button className="tab ">
            <Trans>CategoryPage.hot</Trans>
          </button>
          <button className="tab tab-active">
            <Trans>CategoryPage.newest</Trans>
          </button>
        </div>
      </div>
      <div className="">
        <ListPost posts={posts} />
      </div>
    </div>
  );
};

export default Category;
