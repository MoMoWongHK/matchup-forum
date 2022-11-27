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

export const AdminHomePage: NextPage = (props) => {
  const router = useRouter();
  const { t } = useTranslation("common");

  if (true) {
    return (
      <div className="max-w-lg mx-auto">
        <div className="grid grid-cols-12">
          <div className="col-span-3"></div>

          <div className="col-span-9"></div>
        </div>
      </div>
    );
  }
  <div />;
};
