import React from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getUserLang } from "../utils/utiltyHelper";
import classNames from "classnames";
import { useTranslation } from "next-i18next";

interface NavButtonProps {
  visible: boolean;
  icon: IconDefinition;
  iconAfter?: IconDefinition;
  i18Text: string;
  path: string;
  onClickFn?: () => void;
  indicator?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
}

export const NavButton: React.FC<NavButtonProps> = ({
  visible,
  icon,
  iconAfter,
  i18Text,
  path,
  onClickFn,
  indicator,
}) => {
  const isAfter = window.location.pathname === "/" + getUserLang() + "/" + path;
  const { t } = useTranslation("common");
  return (
    <div
      className={classNames(" flex-1", {
        hidden: !visible,
      })}
    >
      <Link
        href={path ? path : "/"}
        onClick={(e) => {
          if (onClickFn) {
            onClickFn();
          }
        }}
      >
        <button className="w-full  md:px-2 lg:px-4 h-20 text-center btn btn-circle btn-ghost bg-none active:bg-gray-200 grid grid-row-2">
          {indicator && (
            <span className="indicator-item badge badge-secondary">
              {indicator === 10 ? "9+" : indicator}
            </span>
          )}
          <div
            className={classNames(
              "mx-auto rounded-full w-full md:w-16 px-4 py-2 text-gray-800",
              {
                "bg-red-200": isAfter,
              }
            )}
          >
            <FontAwesomeIcon
              icon={iconAfter ? (isAfter ? iconAfter : icon) : icon}
              className={classNames("text-lg", {
                "font-bold": iconAfter && isAfter,
              })}
            />
          </div>
          <div className="font-normal">{i18Text}</div>
        </button>
      </Link>
    </div>
  );
};
