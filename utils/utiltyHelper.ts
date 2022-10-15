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

export { getUserLang, isLocalhost, getRole, isAuth };
