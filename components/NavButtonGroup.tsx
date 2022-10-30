import React, { useEffect, useState } from "react";
import { NavButton } from "./NavButton";
import {
  faComment as faCommentAfter,
  faFolder as faFolderAfter,
  faIdBadge as faIdBadgeAfter,
  faBell as faBellAfter,
  faFile as faFileAfter,
  faUser as faUserAfter,
  faCrown,
  faHouse,
  faSearch,
  faLock,
  faLockOpen,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import {
  faComment,
  faIdBadge,
  faFile,
} from "@fortawesome/free-regular-svg-icons";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { ROLE } from "../Enum/APP_TYPE";
import { useTranslation } from "next-i18next";
import { getRole, isAuth } from "../utils/utiltyHelper";

export enum NavButtonGroupDir {
  ROW,
  COL,
}

interface NavButtonGroupProps {
  dir: NavButtonGroupDir;
}

export const NavButtonGroup: React.FC<NavButtonGroupProps> = ({ dir }) => {
  const { t } = useTranslation("common");
  const auth = useSelector((state: any) => {
    return state.LoginManager.auth;
  });

  const [role, setRole] = useState<ROLE>(ROLE.DEFAULT);

  useEffect(() => {
    const getRoleFn = async () => {
      const role = await getRole();
      setRole(role);
    };

    getRoleFn();
  }, [auth]);

  const uid = isAuth(auth) ? auth.uid : "";

  if (isAuth(auth)) {
    return (
      <div className="bg-[#fdf8f8] h-full">
        <div
          style={{
            paddingBottom: "env(safe-area-inset-bottom)",
          }}
          className={classNames("flex flex-auto gap-0 lg:gap-2  w-full", {
            "flex-row px-2": dir === NavButtonGroupDir.ROW,
            "flex-col py-4": dir === NavButtonGroupDir.COL,
          })}
        >
          <NavButton
            visible={true}
            icon={faHouse}
            i18Text={t("BottomAppBar.homepage")}
            path={""}
          />

          <NavButton
            visible={true}
            icon={faComment}
            iconAfter={faCommentAfter}
            i18Text={t("BottomAppBar.chat")}
            path={"c"}
          />

          <NavButton
            visible={true}
            icon={faFile}
            iconAfter={faFileAfter}
            i18Text={t("BottomAppBar.job")}
            path={"j"}
          />

          <NavButton
            visible={isAuth(auth) && role === ROLE.USER}
            icon={faIdBadge}
            iconAfter={faIdBadgeAfter}
            i18Text={t("BottomAppBar.profile")}
            path={"p/" + uid}
          />

          <NavButton
            visible={true}
            icon={faGear}
            i18Text={t("BottomAppBar.setting")}
            path={"setting"}
          />
        </div>
      </div>
    );
  }
  return (
    <div className="bg-[#fdf8f8] h-full">
      <div
        style={{
          paddingBottom: "env(safe-area-inset-bottom)",
        }}
        className={classNames(
          "flex flex-auto gap-0 lg:gap-2 bg-[#fdf8f8] w-full",
          {
            "flex-row px-2": dir === NavButtonGroupDir.ROW,
            "flex-col py-4": dir === NavButtonGroupDir.COL,
          }
        )}
      >
        <NavButton
          visible={true}
          icon={faHouse}
          i18Text={t("BottomAppBar.homepage")}
          path={""}
        />

        <NavButton
          visible={true}
          icon={faLock}
          iconAfter={faLockOpen}
          i18Text={t("BottomAppBar.login")}
          path={"login"}
        />
        <div className="flex-1" />
        <div className="flex-1" />
        <NavButton
          visible={true}
          icon={faGear}
          i18Text={t("BottomAppBar.setting")}
          path={"setting"}
        />
      </div>
    </div>
  );
};
