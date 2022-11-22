import { ROLE } from "../Enum/APP_TYPE";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import firebaseApp from "../config/firebase";
import { DateObj } from "../model/SystemType";

const isLocalhost = (): boolean => {
  return (
    window.location.hostname === "localhost" ||
    window.location.hostname.includes("192.168.")
  );
};

const returnIdTokenResult = () => {
  return new Promise((resolve, reject) => {
    const auth: any = getAuth(firebaseApp);
    if (auth.currentUser) {
      auth.currentUser.getIdTokenResult().then((idTokenResult: any) => {
        return resolve({
          success: true,
          email: auth.currentUser.email,
          uid: auth.currentUser.uid,
          photoURL: auth.currentUser.photoURL,
          displayName: auth.currentUser.displayName,
          token: idTokenResult.token,
          role: idTokenResult.claims.role,
          expirationTime: idTokenResult.expirationTime,
          custID: idTokenResult.claims.custID
            ? idTokenResult.claims.custID
            : null,
        });
      });
    }
  });
};

const getUserLang = (): "hk" | "en" => {
  return localStorage.getItem("i18n-lang") === "en" ? "en" : "hk";
};

const getRole = (): Promise<ROLE> => {
  return new Promise((resolve) => {
    returnIdTokenResult().then((res: any) => {
      if (res.success) {
        if (res.role === "ADMIN") {
          return resolve(ROLE.ADMIN);
        } else if (res.role === "USER") {
          return resolve(ROLE.USER);
        }
        return resolve(ROLE.DEFAULT);
      }
      return resolve(ROLE.DEFAULT);
    });
  });
};

const isAuth = (authObj: any) => {
  return (
    authObj !== null &&
    typeof authObj !== "undefined" &&
    authObj.uid !== "" &&
    authObj.uid
  );
};

const timeStampToDisplayTimeString = (ts: any) => {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const date = new Date(
    ts.hasOwnProperty("seconds") ? ts.seconds * 1000 : ts * 1000
  );
  return (
    date.getDate() +
    " " +
    monthNames[date.getMonth()] +
    ", " +
    date.getFullYear() +
    " | " +
    (date.getHours() > 12 ? date.getHours() - 12 : date.getHours()) +
    ":" +
    (date.getMinutes() === 0
      ? "00"
      : date.getMinutes() < 10
      ? "0" + date.getMinutes().toString()
      : date.getMinutes()) +
    (date.getHours() > 12 ? " PM" : " AM")
  );
};

const timeAgo = (date: number) => {
  if (typeof date !== "undefined") {
    const dateAgo = (new Date().valueOf() / 1000 - date) / (60 * 60 * 24);
    let resStr = "";
    if (dateAgo > 30 && dateAgo <= 365) {
      resStr =
        Math.floor(parseInt(String(dateAgo / 30))).toString() +
        (Math.floor(parseInt(String(dateAgo / 30))) === 1
          ? " month"
          : " months") +
        " ago";
    } else if (dateAgo > 365) {
      resStr =
        Math.floor(parseInt(String(dateAgo / 365))).toString() +
        (Math.floor(parseInt(String(dateAgo / 365))) === 1
          ? " year"
          : " years") +
        " ago";
    } else if (dateAgo > 0 && dateAgo < 1) {
      if (new Date().valueOf() / 1000 - date < 3600) {
        resStr = Math.floor(
          (new Date().valueOf() / 1000 - date) / 60
        ).toString();
        resStr +=
          Math.floor((new Date().valueOf() / 1000 - date) / 60) === 1
            ? " minute"
            : " minutes" + " ago";
      } else {
        resStr =
          Math.floor((new Date().valueOf() / 1000 - date) / 3600).toString() +
          (Math.floor((new Date().valueOf() / 1000 - date) / 3600) === 1
            ? " hour"
            : " hours") +
          " ago";
      }
    } else {
      resStr =
        Math.floor(dateAgo).toString() +
        (Math.floor(parseInt(String(dateAgo))) === 1 ? " day" : " days") +
        " ago";
    }
    return resStr;
  } else {
    return "Just Now";
  }
};

const getDistinctValue = (array: any[], key: string): any[] => {
  try {
    // check whether the array include this key
    if (array[0].hasOwnProperty(key)) {
      return array
        .map((item) => item[key])
        .filter((value, index, self) => self.indexOf(value) === index);
    }
    return [];
  } catch (e) {
    console.log(e);
    return [];
  }
};

export {
  timeStampToDisplayTimeString,
  getUserLang,
  isLocalhost,
  getRole,
  timeAgo,
  isAuth,
  getDistinctValue,
};
