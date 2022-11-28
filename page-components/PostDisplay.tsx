import { Post, POST_TYPE } from "../model/Post";
import ReactQuillDisplayCss from "../utils/ReactQuillDisplay.module.css";
import React from "react";
import parse from "html-react-parser";

interface PropsType {
  post: Post;
}

export const PostDisplay: React.FC<PropsType> = ({ post }) => {
  if (post.type === POST_TYPE.TEXT) {
    return (
      <div
        className={[
          "p-4 border h-96 border-gray-300 rounded-lg",
          ReactQuillDisplayCss.ReactQuillDisplay,
        ].join(" ")}
      >
        {parse(post.text)}
      </div>
    );
  } else if (post.type === POST_TYPE.VOTE) {
    return (
      <div>
        <p>{parse(post.text)}</p>

        <ul className="flex flex-col gap-2">
          {post.voteOptions.map((option, index) => {
            return (
              <li
                key={"option" + index}
                className="flex-1 btn btn-ghost bg-gray-100 border border-gray-200"
              >
                {option.label}
              </li>
            );
          })}
        </ul>

        <div className="my-2">
          {post.voteOptions.reduce((a, b) => a + b.count, 0)}
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};
