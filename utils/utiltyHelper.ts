import { ROLE } from "../Enum/APP_TYPE";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import firebaseApp from "../config/firebase";

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
        if (res.role === "administrator") {
          return resolve(ROLE.ADMIN);
        } else if (res.role === "kol") {
          return resolve(ROLE.KOL);
        } else if (res.role === "customer") {
          return resolve(ROLE.CUSTOMER);
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

export {
  timeStampToDisplayTimeString,
  getUserLang,
  isLocalhost,
  getRole,
  isAuth,
};
