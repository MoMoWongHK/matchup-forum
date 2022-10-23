import React from "react";
import { ForumCateItem, ForumCateItemProps } from "./ForumCateItem";

import { faLightbulb, faList } from "@fortawesome/free-solid-svg-icons";

export const ForumCate: React.FC = () => {
  const forumCateItemsList: ForumCateItemProps[] = [
    {
      icon: faList,
      text: "All",
      href: "/all",
    },
    {
      icon: faLightbulb,
      text: "Startup",
      href: "/startup",
    },
  ];

  return (
    <div>
      <ul className="menu bg-base-100 w-full p-2 rounded-box">
        {forumCateItemsList.map((e) => {
          return (
            <ForumCateItem
              key={e.href}
              icon={e.icon}
              text={e.text}
              href={e.href}
            />
          );
        })}
      </ul>
    </div>
  );
};
