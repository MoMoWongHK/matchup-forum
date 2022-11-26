import React, { useImperativeHandle, useState } from "react";
import { Post, POST_TYPE, PostDefault } from "../../model/Post";
import { Trans, useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

interface AddPostComponentProps {
  returnFn: () => void;
  metaData: object;
}

const AddPostComponent = (props: AddPostComponentProps, ref: any) => {
  const { t } = useTranslation("");
  const router = useRouter();
  const { id } = router.query;

  const auth = useSelector((state: any) => {
    return state.LoginManager.auth;
  });

  const [post, setPost] = useState<Post>(PostDefault);
  const [postType, setPostType] = useState<POST_TYPE>(post.type);

  useImperativeHandle(ref, () => ({
    returnData() {
      return {
        ...post,
        cateID: id as string,
        createUserID: auth.uid,
      };
    },
  }));

  if (postType === POST_TYPE.TEXT) {
    return (
      <div>
        <div className="btn-group w-64 mx-auto grid grid-cols-2">
          <button
            className="btn btn-active"
            onClick={() => setPostType(POST_TYPE.TEXT)}
          >
            <Trans>NewPostModal.text</Trans>
          </button>

          <button className="btn" onClick={() => setPostType(POST_TYPE.VOTE)}>
            <Trans>NewPostModal.vote</Trans>
          </button>
        </div>

        <h2 className="mt-8 mb-4 mx-2 font-bold text-2xl">
          <input
            type="text"
            placeholder={t("NewPostModal.post-title")}
            className="input border border-gray-200 w-full "
            onChange={(e) =>
              setPost({
                ...post,
                title: e.target.value,
              })
            }
          />
        </h2>

        <div className="mx-2">
          <textarea
            className="w-full h-64 p-4 border border-gray-200 rounded-md textarea textarea-bordered"
            placeholder={t("NewPostModal.post-content")}
            onChange={(e) => {
              // to avoid typescript error
              if (post.type === POST_TYPE.TEXT && e.target.value.length < 300) {
                setPost({
                  ...post,
                  text: e.target.value,
                });
              }
            }}
          ></textarea>
          <label className="label">
            <span className="label-text-alt">
              {post.type === POST_TYPE.TEXT && post?.text.length + " / 300"}
            </span>
          </label>
        </div>
      </div>
    );
  } else if (postType === POST_TYPE.VOTE) {
    return (
      <div>
        <div className="btn-group w-64 mx-auto grid grid-cols-2">
          <button
            className="btn btn-active"
            onClick={() => setPostType(POST_TYPE.TEXT)}
          >
            <Trans>NewPostModal.text</Trans>
          </button>

          <button className="btn" onClick={() => setPostType(POST_TYPE.VOTE)}>
            <Trans>NewPostModal.vote</Trans>
          </button>
        </div>
      </div>
    );
  }
};

export default React.forwardRef(AddPostComponent);
