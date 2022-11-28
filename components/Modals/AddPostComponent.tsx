import React, { useImperativeHandle, useState } from "react";
import {
  POST_TYPE,
  PostCreate,
  PostDefault,
  PostVoteDefault,
} from "../../model/Post";
import { Trans, useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

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

  const [post, setPost] = useState<PostCreate>(PostDefault);
  const [postType, setPostType] = useState<POST_TYPE>(POST_TYPE.TEXT);

  const [textDetail, setTextDetail] = useState<{
    text: string;
  }>({
    text: "",
  });

  const [voteDetail, setVoteDetail] =
    useState<{
      text: string;
      numOfVote: number;
      voteOptions: { label: string; count: number }[];
    }>(PostVoteDefault);

  useImperativeHandle(ref, () => ({
    returnData() {
      return {
        ...post,
        ...(postType === POST_TYPE.TEXT ? textDetail : voteDetail),
        type: postType,
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
              setTextDetail({
                text: e.target.value,
              });
            }}
          ></textarea>
          <label className="label">
            <span className="label-text-alt">
              {textDetail.text.length + " / 300"}
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
            className="w-full h-32 p-4 border border-gray-200 rounded-md textarea textarea-bordered"
            placeholder={t("NewPostModal.post-content")}
            onChange={(e) => {
              setTextDetail({
                text: e.target.value,
              });
            }}
          ></textarea>
          <label className="label">
            <span className="label-text-alt">
              {textDetail.text.length + " / 300"}
            </span>
          </label>
        </div>

        {/* vote container*/}
        <h3 className="mt-8 mb-4 mx-2 font-bold text-lg">
          <Trans>NewPostModal.vote-options</Trans>
        </h3>
        <div className="my-4 mx-2">
          <ul>
            {voteDetail.voteOptions.map((item, index) => {
              return (
                <li
                  className="grid gap-2 my-2"
                  style={{ gridTemplateColumns: "15px auto 50px" }}
                  key={"vItem" + index}
                >
                  <div className="my-auto">{index + 1}</div>
                  <div>
                    <input
                      type="text"
                      placeholder={t("NewPostModal.post-title")}
                      className="input  border-gray-200 w-full "
                      value={item.label}
                      onChange={(e) => {
                        const newOptions = [...voteDetail.voteOptions];
                        newOptions[index].label = e.target.value;
                        setVoteDetail({
                          ...voteDetail,
                          voteOptions: newOptions,
                        });
                      }}
                    />
                  </div>
                  <div>
                    <button
                      className="btn btn-circle"
                      onClick={() => {
                        let newOptions = [...voteDetail.voteOptions];
                        newOptions.splice(index, 1);

                        setVoteDetail({
                          ...voteDetail,
                          voteOptions: newOptions,
                        });
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faTimes}
                        className={classNames("text-lg")}
                      />
                    </button>
                  </div>
                </li>
              );
            })}
            <li></li>
          </ul>

          <button
            className="btn btn-primary w-full my-2"
            onClick={() => {
              setVoteDetail({
                ...voteDetail,
                voteOptions: voteDetail.voteOptions.concat({
                  label: "",
                  count: 0,
                }),
              });
            }}
          >
            <Trans>NewPostModal.new-option</Trans>
          </button>
        </div>
      </div>
    );
  }
};

// @ts-ignore
export default React.forwardRef(AddPostComponent);
