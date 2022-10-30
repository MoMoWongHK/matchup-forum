import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { faBell, faCaretDown, faUser } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useRouter } from "next/router";
import { isAuth } from "../utils/utiltyHelper";
import { useSelector } from "react-redux";

export const Header: React.FC = (props) => {
  const auth = useSelector((state: any) => {
    return state.LoginManager.auth;
  });

  const router = useRouter();

  return (
    <div className="navbar bg-sky-700 ">
      <div className="navbar-start">
        <Link href="/">
          <div className="btn btn-ghost normal-case text-xl text-white">
            Matchup forum
          </div>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex"></div>
      <div className="navbar-end">
        <div className="w-14">
          <button className="btn btn-circle btn-ghost">
            <FontAwesomeIcon
              icon={faBell}
              className={classNames("text-lg text-white")}
            />
          </button>
        </div>
        <div className="w-30 ">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost rounded-2xl m-1">
              <FontAwesomeIcon
                icon={faUser}
                className={classNames("text-lg text-white")}
              />
              <FontAwesomeIcon
                icon={faCaretDown}
                className={classNames("ml-2 text-sm text-white")}
              />
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              {isAuth(auth) ? (
                <li>
                  <button
                    className="btn btn-ghost"
                    onClick={() => router.push("/logout")}
                  >
                    Logout
                  </button>
                </li>
              ) : (
                <li>
                  <button
                    className="btn btn-ghost"
                    onClick={() => router.push("/login")}
                  >
                    Login
                  </button>
                </li>
              )}

              <button
                className="btn btn-ghost"
                onClick={() => router.push("/about")}
              >
                About
              </button>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
