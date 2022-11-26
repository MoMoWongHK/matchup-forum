import React, { useState, useEffect } from "react";
import { NextPage } from "next";
import { Post } from "../../model/Post";
import ListPost from "../../page-components/ListPost";
import { Trans } from "react-i18next";
import { Category, defaultCategory } from "../../model/Category";
import { useRouter } from "next/router";
import { getCategory } from "../../helperFunction/categoryDBHelper";
import { getPosts } from "../../helperFunction/postDBHelper";
import classNames from "classnames";
import { getUser } from "../../helperFunction/userDBHelper";
import { isAuth } from "../../utils/utiltyHelper";
import { useDispatch, useSelector } from "react-redux";
import {
  SubscribedDirection,
  updateUserSubscribed,
} from "../../helperFunction/userDBHelper";
import { SUPPORTED_REDUX_FUNCTIONS } from "../../redux/SUPPORTED_REDUX_FUNCTION";
import { ROLE } from "../../Enum/APP_TYPE";
import { SUPPORTED_MODAL_TYPE } from "../../utils/ModalType";

enum OrderBy {
  HOT,
  NEWEST,
}

const Category: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const auth = useSelector((state: any) => {
    return state.LoginManager.auth;
  });

  const { id } = router.query;

  const [category, setCategory] = useState<Category>(defaultCategory);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const [followed, setFollowed] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [condition, setCondition] = useState<{
    orderBy: OrderBy;
  }>({
    orderBy: OrderBy.HOT,
  });

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

  useEffect(() => {
    if (isAuth(auth)) {
      getUser(auth.uid).then((result) => {
        if (result.success) {
          const isFol = result.data.subscribed.includes(id as string);
          setFollowed(isFol);
        }
      });
    }
  }, [auth]);

  const onChangeSubscription = () => {
    setIsLoading(true);

    const direction = followed
      ? SubscribedDirection.REMOVE
      : SubscribedDirection.ADD;

    updateUserSubscribed(auth.uid, id as string, direction).then((result) => {
      if (result.success) {
        setFollowed(!followed);
        setIsLoading(false);
      }
    });
  };

  const openCreatePostModal = (state: any) => {
    dispatch({
      type: SUPPORTED_REDUX_FUNCTIONS.TOGGLE_MODAL,
      typeOfModal: SUPPORTED_MODAL_TYPE.ADD_POST_MODAL,
      returnFn: state.returnFn,
      metaData: state.metaData,
    });
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <section className="relative px-4 xl:px-8 ">
        <h1 className="text-3xl font-bold mb-4">{category.titleHK}</h1>
        <button
          disabled={isLoading}
          className={classNames(
            "absolute right-0 top-0 btn btn-sm md:btn-md w-20 md:w-40 btn-primary",
            { "btn-outline": followed }
          )}
          onClick={() => {
            onChangeSubscription();
          }}
        >
          {followed ? (
            <Trans>CategoryPage.followed</Trans>
          ) : (
            <Trans>CategoryPage.follow</Trans>
          )}
        </button>
        <div className="text-lg text-gray-500">{category.descriptionHK}</div>
      </section>

      <div className="my-8 max-w-md mx-auto">
        <div className="tabs tabs-boxed p-2">
          <button
            className={classNames("tab h-12 w-1/2", {
              "tab-active": condition.orderBy === OrderBy.HOT,
            })}
            onClick={() =>
              setCondition({
                ...condition,
                orderBy: OrderBy.HOT,
              })
            }
          >
            <Trans>CategoryPage.hot</Trans>
          </button>
          <button
            className={classNames("tab h-12 w-1/2", {
              "tab-active": condition.orderBy === OrderBy.NEWEST,
            })}
            onClick={() =>
              setCondition({
                ...condition,
                orderBy: OrderBy.NEWEST,
              })
            }
          >
            <Trans>CategoryPage.newest</Trans>
          </button>
        </div>
      </div>

      <div className="float-right">
        <button
          className="btn"
          onClick={() => {
            openCreatePostModal({
              returnFn: () => {
                console.log("done");
              },
              metaData: {},
            });
          }}
        >
          <Trans>CategoryPage.create-post</Trans>
        </button>
      </div>

      <div className="">
        <ListPost posts={posts} />
      </div>
    </div>
  );
};

export default Category;
