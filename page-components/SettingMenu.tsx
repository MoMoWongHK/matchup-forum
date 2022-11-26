import React from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { getUserLang } from "../utils/utiltyHelper";
import { useRouter } from "next/router";

export interface SettingMenuItem {
  icon: IconDefinition;
  title: string;
  path: string;
  des?: string;
  onClick?: () => void;
}

interface SettingMenuProps {
  items: SettingMenuItem[];
}

const SettingMenu: React.FC<SettingMenuProps> = ({ items }) => {
  const router = useRouter();
  return (
    <ul className="menu bg-base-100 w-full p-2 rounded-box">
      {Array.isArray(items) &&
        items.map((e, index) => {
          return (
            <li key={"sItem" + index} className="w-full text-left">
              <div
                onClick={() => {
                  if (e.onClick) {
                    e.onClick();
                  }
                  router.push("/" + e.path);
                }}
                className="border-none justify-start gap-4"
              >
                <div className="rounded-lg p-2 bg-white">
                  <FontAwesomeIcon
                    icon={e.icon}
                    className="text-xl text-gray-800"
                  />
                </div>
                <div className="text-left normal-case text-md">
                  {e.title}
                  {e.des && (
                    <span className="block font-normal text-xs">{e.des}</span>
                  )}
                </div>
              </div>
            </li>
          );
        })}
    </ul>
  );
};
export default SettingMenu;
