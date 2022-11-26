import React, { useEffect, useState } from "react";

import { Trans, useTranslation } from "react-i18next";

import {
  isAuth,
  logout,
  // requestNotificationAccess,
  returnIdTokenResult,
} from "../utils/utiltyHelper";
import { useSelector } from "react-redux";
import { isWeb, getRole, getUserLang } from "../utils/utiltyHelper";

import {
  faBell,
  faLanguage,
  faPeopleGroup,
} from "@fortawesome/free-solid-svg-icons";

import { getUser } from "../helperFunction/userDBHelper";
// // eslint-disable-next-line @typescript-eslint/ban-ts-comment
// // @ts-ignore
// import classes from "../Component/HeadingMessageManager/HeadingMessageManager.module.css";
// // eslint-disable-next-line @typescript-eslint/ban-ts-comment
// // @ts-ignore
// import step1 from "../Assets/HeadingMessageManager/message-popup-instruction-1.png";
// // eslint-disable-next-line @typescript-eslint/ban-ts-comment
// // @ts-ignore
// import step2 from "../Assets/HeadingMessageManager/message-popup-instruction-2.png";

import { ROLE } from "../Enum/APP_TYPE";
import SettingMenu, { SettingMenuItem } from "../page-components/SettingMenu";
import { t } from "i18next";
import { faNewspaper } from "@fortawesome/free-regular-svg-icons";
import { useRouter } from "next/router";

const Setting: React.FC = (props) => {
  const { i18n } = useTranslation();
  const router = useRouter();

  const auth = useSelector((state: any) => {
    return state.firebase.auth;
  });

  const screenWidth = useSelector((state: any) => {
    return state.SystemManager.screenWidth;
  });

  const [role, setRole] = useState<ROLE | "">("");
  const [myProfile, setMyProfile] = useState({});
  const [isLoadedProfile, setIsLoadedProfile] = useState(false);

  const [testInfo, setTestInfo] = useState({
    isSending: false,
    isSent: false,
    sendDateTime: new Date(),
  });
  const [helpMessage, setHelpMessage] = useState(false);
  const [isRequested, setIsRequested] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

  const [isGettingToken, setIsGettingToken] = useState(false);

  useEffect(() => {
    if (isAuth(auth) && !isLoadedProfile) {
      getUser(auth.uid).then((result) => {
        if (result.success) {
          setMyProfile(result.data);
          setIsLoadedProfile(true);
        } else {
          router.push("/" + getUserLang() + "/");
        }
      });
      const getRoleFn = async () => {
        const role = await getRole();
        setRole(role);
      };

      getRoleFn();
    }
  }, [auth]);

  // const sendTestMessage = async () => {
  //   setHelpMessage(false);
  //   setIsLocked(true);
  //   setTestInfo({
  //     ...testInfo,
  //     isSending: true,
  //   });
  //
  //   returnIdTokenResult().then(async (res) => {
  //     await fetch(getAPIPath("/api/gcm/" + auth.uid + "/test"), {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         idToken: res.token,
  //       },
  //       body: JSON.stringify({
  //         token: localStorage.getItem("look4kol-gcm-id" + "-" + auth.uid),
  //         isWeb: isWeb(),
  //       }),
  //     })
  //       .then((res) => res.json())
  //       .then((response) => {
  //         if (response.success) {
  //           setTestInfo({
  //             ...testInfo,
  //             isSending: false,
  //             isSent: true,
  //             sendDateTime: new Date(),
  //           });
  //
  //           setTimeout(() => {
  //             setHelpMessage(true);
  //             setIsLocked(false);
  //           }, 45000);
  //         } else {
  //           setTestInfo({
  //             ...testInfo,
  //             isSent: false,
  //             isSending: false,
  //           });
  //           setHelpMessage(false);
  //           setIsLocked(true);
  //         }
  //       });
  //   });
  // };

  const isPermissionGranted = isWeb()
    ? Notification.permission !== "granted"
    : true;

  // console.log(localStorage.getItem("look4kol-gcm-id" + "-" + auth.uid))
  // console.log(localStorage.getItem("look4kol-reject-gcm"))
  const isRequireRequest = isAuth(auth)
    ? (localStorage.getItem("look4kol-gcm-id" + "-" + auth.uid) === null ||
        isPermissionGranted) &&
      localStorage.getItem("look4kol-reject-gcm") !== "true"
    : false;

  const SettingMenuItems: SettingMenuItem[] = [
    // {
    //   icon: faBell,
    //   title: t("AppSetting.notification"),
    //   path: "setting/notification",
    // },
    {
      icon: faPeopleGroup,
      title: t("AppSetting.about"),
      path: "about",
    },
    {
      icon: faNewspaper,
      title: t("AppSetting.blog"),
      path: "blog",
    },
    {
      icon: faLanguage,
      title: t("AppSetting.language"),
      path: "setting",
      onClick: () => {
        const newLang = getUserLang() === "en" ? "hk" : "en";
        i18n.changeLanguage(newLang);
        localStorage.setItem("i18n-lang", newLang);
      },
    },
  ];

  return (
    <div>
      {/*<section className="bg-white p-4 my-4 shadow rounded-md">*/}
      {/*  <h2 className="text-gray-700 text-2xl font-black mb-6">*/}
      {/*    <Trans>AppSetting.test-messaging</Trans>*/}
      {/*    <FontAwesomeIcon icon={faVial} className="text-gray-500 mx-2" />*/}
      {/*  </h2>*/}
      {/*  <div className="block py-4">*/}
      {/*    {localStorage.getItem("look4kol-reject-gcm") === "true" && (*/}
      {/*      <div className="block text-red-700  my-2">*/}
      {/*        <Trans>AppSetting.you-rejected-gcm</Trans>*/}
      {/*      </div>*/}
      {/*    )}*/}

      {/*    {isRequireRequest && (*/}
      {/*      <div className="block  my-2">*/}
      {/*        <button*/}
      {/*          className={[*/}
      {/*            "py-2 px-4 rounded-md",*/}
      {/*            (testInfo.isSending || testInfo.isSent) && isLocked*/}
      {/*              ? "bg-gray-100 text-gray-500"*/}
      {/*              : "bg-green-100 hover:bg-green-200 text-green-700",*/}
      {/*          ].join(" ")}*/}
      {/*          disabled={(testInfo.isSending || testInfo.isSent) && isLocked}*/}
      {/*          onClick={() => {*/}
      {/*            sendTestMessage();*/}
      {/*          }}*/}
      {/*        >*/}
      {/*          /!*cannot remove <div> tag in <Trans>*!/*/}
      {/*          {testInfo.isSending ? (*/}
      {/*            "loading"*/}
      {/*          ) : isLocked ? (*/}
      {/*            <div>*/}
      {/*              <Trans>AppSetting.wait-to-test</Trans>*/}
      {/*            </div>*/}
      {/*          ) : (*/}
      {/*            <div>*/}
      {/*              <Trans>AppSetting.test-now</Trans>*/}
      {/*            </div>*/}
      {/*          )}*/}
      {/*        </button>*/}

      {/*        {testInfo.isSent && (*/}
      {/*          <div className="py-2 text-gray-500">*/}
      {/*            <Trans>AppSetting.message-sent</Trans>*/}
      {/*          </div>*/}
      {/*        )}*/}

      {/*        {helpMessage && (*/}
      {/*          <>*/}
      {/*            <div className="py-2 text-gray-500">*/}
      {/*              <Trans>AppSetting.not-receive</Trans>*/}
      {/*            </div>*/}
      {/*          </>*/}
      {/*        )}*/}
      {/*      </div>*/}
      {/*    )}*/}

      {/*    {isRequireRequest && (*/}
      {/*      <div className="w-56 mx-auto my-4">*/}
      {/*        <button*/}
      {/*          className={classes.MessageBtn}*/}
      {/*          onClick={() => {*/}
      {/*            setIsRequested(true);*/}
      {/*            setIsGettingToken(true);*/}
      {/*            requestNotificationAccess(auth).then((res) => {*/}
      {/*              // console.log("res.success: " + res.success)*/}
      {/*              setIsGettingToken(false);*/}
      {/*              setIsRequested(false);*/}
      {/*            });*/}
      {/*          }}*/}
      {/*        >*/}
      {/*          {isGettingToken ? (*/}
      {/*            <Spinner />*/}
      {/*          ) : (*/}
      {/*            <div>*/}
      {/*              <Trans>HeadingMessageManager.request-noti</Trans>*/}
      {/*            </div>*/}
      {/*          )}*/}
      {/*        </button>*/}
      {/*      </div>*/}
      {/*    )}*/}

      {/*    {isRequested && (*/}
      {/*      <div className="card mb-4 flex justify-center bg-base-100 shadow-xl p-1">*/}
      {/*        <div className="card-body p-1">*/}
      {/*          <h2 className="flex justify-center ">*/}
      {/*            <div className="text-accent text-sm font-semibold">*/}
      {/*              <Trans>HeadingMessageManager.allow-notifications-how</Trans>*/}

      {/*              <FontAwesomeIcon*/}
      {/*                icon={faBell}*/}
      {/*                className="text-accent mx-2 text-xl"*/}
      {/*              />*/}
      {/*            </div>*/}
      {/*          </h2>*/}
      {/*          <p className="flex justify-center text-accent-focus text-xs mt-1 mb-2">*/}
      {/*            <Trans>HeadingMessageManager.get-notifications</Trans>*/}
      {/*          </p>*/}
      {/*          <p className="flex justify-center text-neutral text-xs">*/}
      {/*            <Trans>*/}
      {/*              HeadingMessageManager.allow-notifications-step-1*/}
      {/*            </Trans>*/}
      {/*          </p>*/}
      {/*          <img*/}
      {/*            src={step1}*/}
      {/*            className={["lazyload rounded-lg", classes.Img].join(" ")}*/}
      {/*            alt={"setup web notification"}*/}
      {/*          />*/}
      {/*          <p className="flex justify-center text-neutral text-xs">*/}
      {/*            <Trans>*/}
      {/*              HeadingMessageManager.allow-notifications-step-2*/}
      {/*            </Trans>*/}
      {/*          </p>*/}
      {/*          <img*/}
      {/*            src={step2}*/}
      {/*            className={["lazyload rounded-lg", classes.Img].join(" ")}*/}
      {/*            alt={"setup web notification"}*/}
      {/*          />*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*    )}*/}
      {/*  </div>*/}
      {/*</section>*/}

      <section>
        <SettingMenu items={SettingMenuItems} />
      </section>

      {isAuth(auth) && (
        <button
          className="  text-red-700 px-2 py-1 w-full mx-auto"
          onClick={() => {
            logout();
            router.push("/" + getUserLang() + "/login");
          }}
        >
          <Trans>Heading.logout</Trans>
        </button>
      )}
    </div>
  );
};

export default Setting;
