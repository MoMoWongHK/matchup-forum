import React, { useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faEnvelope,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { NextPage } from "next";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import classNames from "classnames";
import { useRouter } from "next/router";
import { SUPPORTED_REDUX_FUNCTIONS } from "../redux/SUPPORTED_REDUX_FUNCTION";
import { useDispatch } from "react-redux";
import { ROLE } from "../Enum/APP_TYPE";

const auth = getAuth();
// const templateBanner: Banner[] = [
//     {
//         title: "Title 1",
//         description: "This is the description",
//         imgURL: "https://placeimg.com/800/200/arch",
//     },
//     {
//         title: "Title 2",
//         description: "This is the description",
//         imgURL: "https://placeimg.com/800/200/arch",
//     },
// ];

enum LoginPageType {
  MAIN,
  LOGIN_EMAIL,
  SIGNUP_EMAIL,
}

interface LOGIN_CREDENTIALS_TYPE {
  email: string;
  password: string;
}

export const LoginPage: NextPage = (props) => {
  const router = useRouter();
  const { t } = useTranslation("common");
  const dispatch = useDispatch();
  const [pageType, setPageType] = useState<LoginPageType>(LoginPageType.MAIN);

  const [loginCredentials, setLoginCredentials] =
    useState<LOGIN_CREDENTIALS_TYPE>({
      email: "",
      password: "",
    });

  const [newUserCredentials, setNewUserCredentials] =
    useState<LOGIN_CREDENTIALS_TYPE>({
      email: "",
      password: "",
    });

  const [isLoading, setIsLoading] = useState<false>(false);
  const [showPass, setShowPass] = useState<boolean>(false);

  const [status, setStatus] = useState<string>("");
  const [loggedIn, setIsLoggedIn] = useState<boolean>(false);

  const loginHandler = (): void => {
    signInWithEmailAndPassword(
      auth,
      loginCredentials.email,
      loginCredentials.password
    )
      .then((userCredential) => {
        if (auth.currentUser) {
          // localStorage.setItem("matchup-require-login", "false");
          auth.currentUser
            .getIdTokenResult()
            .then((idTokenResult) => {
              dispatch({
                type: SUPPORTED_REDUX_FUNCTIONS.LOGIN,
                data: {
                  email: userCredential.user.email,
                  uid: userCredential.user.uid,
                  photoURL: userCredential.user.photoURL,
                  displayName: userCredential.user.displayName,
                  // token: idTokenResult.token,
                  role: idTokenResult.claims.role as ROLE,
                  expirationTime: idTokenResult.expirationTime,
                  custID: idTokenResult.claims.custID
                    ? idTokenResult.claims.custID
                    : null,
                },
              });
            })
            .catch((err) => console.log(err));
        }

        // Signed in
        setIsLoading(false);
        // ...
      })
      .catch((error) => {
        if (error.code === "auth/user-not-found") {
          setIsLoading(false);
          setStatus(error.code);
        }
        if (error.code === "auth/wrong-password") {
          setIsLoading(false);
          setStatus(error.code);
        }
        if (error.code === "auth/too-many-requests") {
          setIsLoading(false);
          setStatus(error.code);
        }
        if (error.code === "auth/invalid-email") {
          setIsLoading(false);
          setStatus(error.code);
        }
        let errorCode = error.code;
        let errorMessage = error.message;
      });
  };

  const registerHandler = (): void => {
    createUserWithEmailAndPassword(
      auth,
      newUserCredentials.email,
      newUserCredentials.password
    )
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        router.push("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  if (pageType === LoginPageType.MAIN) {
    return (
      <div className="max-w-lg mx-auto">
        <div className="grid grid-rows-7">
          <div className="row-span-3">
            {/*<BannerContainer banners={templateBanner} />*/}
          </div>

          <div className="row-span-4">
            <div className="grid grid-rows-4 gap-4 py-4 px-10">
              <button
                className="btn w-full btn-circle border-none bg-amber-600 hover:bg-amber-700 gap-2"
                onClick={() => setPageType(LoginPageType.LOGIN_EMAIL)}
              >
                <FontAwesomeIcon width="16" icon={faEnvelope} />
                Login with Email
              </button>

              <button className="btn w-full btn-circle border-none bg-blue-600 hover:bg-blue-700 gap-2">
                <FontAwesomeIcon width="16" icon={faFacebook} />
                Login with Facebook
              </button>

              <button className="btn w-full btn-circle border-none bg-red-600 hover:bg-red-700 gap-2">
                <FontAwesomeIcon width="16" icon={faGoogle} />
                Login with Google
              </button>

              <div className="text-center ">
                <button
                  className="btn btn-ghost"
                  onClick={() => setPageType(LoginPageType.SIGNUP_EMAIL)}
                >
                  Sign up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (pageType === LoginPageType.LOGIN_EMAIL) {
    return (
      <div className="max-w-lg mx-auto">
        <button
          className="btn btn-ghost gap-2 ml-0 mb-2 "
          onClick={() => setPageType(LoginPageType.MAIN)}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
          Back
        </button>
        <div>
          {/* <img className="md:hidden block w-28 mx-auto mb-4" src={logo} /> */}
          <h2 className="text-3xl font-semibold mb-4">
            <Trans>RegForm.login</Trans>
          </h2>
        </div>
        <form className="py-8 text-base leading-6 space-y-4 text-gray-600 text-md sm:text-lg sm:leading-7">
          <div className="flex flex-col">
            <div className="leading-loose font-medium">
              <Trans>RegForm.email</Trans>
            </div>
            <input
              type="text"
              className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
              placeholder={t("RegForm.email-placeholder")}
              disabled={isLoading}
              value={loginCredentials.email}
              onChange={(e) =>
                setLoginCredentials({
                  ...loginCredentials,
                  email: e.target.value,
                })
              }
            />
          </div>
          <div className="flex flex-col">
            <div className="leading-loose font-medium">
              <Trans>RegForm.password</Trans>
            </div>
            <input
              type="password"
              className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
              placeholder={t("RegForm.password-placeholder")}
              disabled={isLoading}
              value={loginCredentials.password}
              onChange={(e) =>
                setLoginCredentials({
                  ...loginCredentials,
                  password: e.target.value,
                })
              }
            />
          </div>

          <button
            className={classNames(
              "btn btn-primary rounded-full w-full py-2 px-4 text-center normal-case",
              {
                loading: isLoading,
              }
            )}
            disabled={isLoading}
            onClick={(e) => loginHandler()}
          >
            {isLoading ? (
              <div>
                <Trans>RegForm.login-loading</Trans>
              </div>
            ) : (
              <div>
                <Trans>RegForm.login</Trans>
              </div>
            )}
          </button>
          <div className="text-sm flex flex-row gap-1">
            <p className="text-gray-600">
              <Trans>RegForm.no-account</Trans>
            </p>
            <button
              onClick={() => setPageType(LoginPageType.SIGNUP_EMAIL)}
              className=" text-primary font-medium cursor-pointer"
            >
              <Trans>RegForm.sign-up</Trans>
            </button>
          </div>
        </form>
      </div>
    );
  }
  return (
    <div className="max-w-lg mx-auto">
      <button
        className="btn btn-ghost gap-2 ml-0 mb-2 "
        onClick={() => setPageType(LoginPageType.MAIN)}
      >
        <FontAwesomeIcon width="16" icon={faChevronLeft} />
        Back
      </button>
      <div>
        {/* <img className="md:hidden block w-28 mx-auto mb-4" src={logo} /> */}
        <h2 className="text-3xl font-semibold mb-4">
          <Trans>RegForm.signup</Trans>
        </h2>
      </div>
      <div className="pb-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7 pt-4">
        <div className="flex flex-col">
          <div className="leading-loose">
            <Trans>RegForm.email</Trans>
          </div>
          <input
            type="email"
            placeholder={"RegForm.email-des"}
            className="input input-bordered w-full"
            value={newUserCredentials.email}
            onChange={(e) => {
              setNewUserCredentials({
                ...newUserCredentials,
                email: e.target.value,
              });
            }}
          />
        </div>
        <div className="flex flex-col">
          <div className="leading-loose">
            <Trans>RegForm.password</Trans>
          </div>
          <div className="form-control">
            <div className="input-group">
              <input
                type={showPass ? "text" : "password"}
                placeholder={"RegForm.password-des"}
                className="input input-bordered w-full"
                value={newUserCredentials.password}
                onChange={(e) =>
                  setNewUserCredentials({
                    ...newUserCredentials,
                    password: e.target.value,
                  })
                }
              />
              <button
                className="btn btn-square btn-primary"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? (
                  <FontAwesomeIcon icon={faEyeSlash} />
                ) : (
                  <FontAwesomeIcon icon={faEye} />
                )}
              </button>
            </div>
          </div>
        </div>

        <button
          className={classNames(
            "btn btn-primary rounded-full w-full py-2 px-4 text-center normal-case",
            {
              loading: isLoading,
            }
          )}
          disabled={isLoading}
          onClick={(e) => registerHandler()}
        >
          <Trans>RegForm.signup</Trans>
        </button>
      </div>
    </div>
  );
};
