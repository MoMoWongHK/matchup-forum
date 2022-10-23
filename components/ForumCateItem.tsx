import React from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import Link from "next/link";

export interface ForumCateItemProps {
  icon: IconDefinition;
  text: string;
  href: string;
  onClick?: () => void;
}

export const ForumCateItem: React.FC<ForumCateItemProps> = ({
  icon,
  text,
  href,
  onClick,
}) => {
  return (
    <li className="w-full ">
      <Link href={href}>
        <div>
          <FontAwesomeIcon icon={icon} className={classNames("text-lg")} />
          {text}
        </div>
      </Link>
    </li>
  );
};
