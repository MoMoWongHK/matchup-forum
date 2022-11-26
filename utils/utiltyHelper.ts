import { ROLE } from "../Enum/APP_TYPE";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import firebaseApp from "../config/firebase";
import { getMessaging, getToken } from "firebase/messaging";
import { Capacitor } from "@capacitor/core";

const getAPIPath = (path: string) => {
  return Capacitor.getPlatform() === "android" ||
    Capacitor.getPlatform() === "ios"
    ? window.location + path
    : path;
};

const isWeb = () => {
  return (
    Capacitor.getPlatform() !== "android" && Capacitor.getPlatform() !== "ios"
  );
};

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

const logout = () => {
  const auth = getAuth(firebaseApp);
  auth
    .signOut()
    .then(function () {
      // Sign-out successful.
      window.location.reload(false);
      localStorage.setItem("look4kol-require-logout", false);
      localStorage.setItem("look4kol-auth", null);
    })
    .catch(function (error) {
      // An error happened
    });
};

const requestNotificationAccess = (auth: any) => {
  try {
    const messaging = getMessaging(firebaseApp);
    return new Promise((resolve, reject) => {
      // Let's check whether notification permissions have already been granted
      if (isWeb()) {
        if (Notification.permission === "granted") {
          // If it's okay let's create a notification

          getToken(messaging, {
            vapidKey:
              "BALiUneYw0V4b-U5QvtpU5G2SvcgqlWsJnzZfXEdPDjcqmND01geOkjaoBn7WgZy6THFSjKiWVyZgVgfToBfcLY",
          })
            .then((currentToken) => {
              // console.log("currentToken: ")
              // console.log(currentToken)
              if (currentToken) {
                if (
                  localStorage.getItem("look4kol-gcm-id" + "-" + auth.uid) !==
                  currentToken
                ) {
                  // console.log("updating new token to firebase")
                  localStorage.setItem(
                    "look4kol-gcm-id" + "-" + auth.uid,
                    currentToken
                  );
                  return new Promise(async (resolve, reject) => {
                    await fetch(getAPIPath("/api/gcm/addID"), {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        uid: auth.uid,
                        id: currentToken,
                      }),
                    })
                      .then((res) => res.json())
                      .then((response) => {
                        return returnIdTokenResult(firebaseApp).then(
                          async (res) => {
                            await fetch(
                              getAPIPath("/api/gcm/" + auth.uid + "/test"),
                              {
                                method: "POST",
                                headers: {
                                  "Content-Type": "application/json",
                                  idToken: res.token,
                                },
                                body: JSON.stringify({
                                  token: [currentToken],
                                  isWeb: isWeb(),
                                }),
                              }
                            )
                              .then((res) => res.json())
                              .then((response) => {
                                if (response.success) {
                                  return resolve({ success: true });
                                }
                              })
                              .catch((err) => {
                                console.log(err);
                                return resolve({
                                  success: false,
                                  message: err,
                                });
                              });
                          }
                        );
                      });
                  });
                } else {
                  // console.log(
                  //   "already requested successfully, sending notification..."
                  // )

                  returnIdTokenResult(firebaseApp).then(async (res) => {
                    await fetch(getAPIPath("/api/gcm/" + auth.uid + "/test"), {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                        idToken: res.token,
                      },
                      body: JSON.stringify({
                        token: [currentToken],
                        isWeb: isWeb(),
                      }),
                    })
                      .then((res) => res.json())
                      .then((response) => {
                        if (response.success) {
                          return resolve({ success: true });
                        }
                      })
                      .catch((err) => {
                        console.log(err);
                        return resolve({
                          success: false,
                          message: err,
                        });
                      });
                  });
                }
              } else {
                // Show permission request.
                console.log(
                  "No registration token available. Request permission to generate one."
                );
                // Show permission UI.
                resolve({ success: false });
              }
            })
            .catch((err) => console.log(err));
          //
          // logEvent(analytics, "messaging_permission_accepted")
          // var notification = new Notification("Hi 我地之後會係呢到通知你")
        }

        // Otherwise, we need to ask the user for permission
        else if (Notification.permission !== "denied") {
          localStorage.removeItem("look4kol-gcm-id" + "-" + auth.uid);

          Notification.requestPermission().then(async function (permission) {
            // If the user accepts, let's create a notification
            if (permission === "granted") {
              getToken(messaging, {
                vapidKey:
                  "BE7FT7GwqwzVasd6Htn8qLEWHaAR3hi-cdHGe7vBR_sj8khdWeUIbwqdii_rVQR0JVFX5l4i2p6mAFkrNaGP1V8",
              })
                .then((currentToken) => {
                  if (currentToken) {
                    if (
                      localStorage.getItem(
                        "look4kol-gcm-id" + "-" + auth.uid
                      ) !== currentToken
                    ) {
                      console.log("updating new token to firebase");

                      localStorage.setItem(
                        "look4kol-gcm-id" + "-" + auth.uid,
                        currentToken
                      );
                      return new Promise(async (resolve, reject) => {
                        await fetch(getAPIPath("/api/gcm/addID"), {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({
                            uid: auth.uid,
                            id: currentToken,
                          }),
                        })
                          .then((res) => res.json())
                          .then((response) => {
                            if (response.success) {
                              resolve({ success: true });
                            } else {
                              resolve({ success: false });
                            }
                          });
                      });
                    } else {
                      console.log(
                        "already requested successfully, sending notification..."
                      );

                      returnIdTokenResult(firebaseApp).then(async (res) => {
                        await fetch(
                          getAPIPath("/api/gcm/" + auth.uid + "/test"),
                          {
                            method: "POST",
                            headers: {
                              "Content-Type": "application/json",
                              idToken: res.token,
                            },
                            body: JSON.stringify({
                              token: [currentToken],
                              isWeb: isWeb(),
                            }),
                          }
                        )
                          .then((res) => res.json())
                          .then((response) => {
                            if (response.success) {
                              return resolve({ success: true });
                            }
                          })
                          .catch((err) => {
                            console.log(err);
                            return resolve({
                              success: false,
                              message: err,
                            });
                          });
                      });
                    }
                  } else {
                    // Show permission request.
                    console.log(
                      "No registration token available. Request permission to generate one."
                    );
                    // Show permission UI.
                    resolve({ success: false });
                  }
                })
                .catch((err) => {
                  console.log(
                    "An error occurred while retrieving token. ",
                    err
                  );
                });
              // logEvent(analytics, "messaging_permission_accepted")
              // var notification = new Notification("Hi 我地之後會係呢到通知你")
            }
          });
        }
      } else {
        console.log("its not web app! replacing location!");
        const currentToken = localStorage.getItem(
          "look4kol-gcm-id" + "-" + auth.uid
        );

        console.log("currentToken");
        console.log(currentToken);
        console.log("auth.uid");
        console.log(auth.uid);
        return returnIdTokenResult(firebaseApp).then(async (res) => {
          console.log("sending msg test request...");
          console.log("res data:");
          console.log(res.token);
          localStorage.setItem("firebase-auth" + "-" + auth.uid, res.token);

          window.location.replace("/" + getUserLang() + "/setting/sendMsg");
        });
      }
    });
  } catch (e) {
    console.log("error occurred in firebaseUtil!");
    console.log(e);
  }
};

export {
  getAPIPath,
  isWeb,
  timeStampToDisplayTimeString,
  getUserLang,
  isLocalhost,
  getRole,
  timeAgo,
  isAuth,
  getDistinctValue,
  logout,
  requestNotificationAccess,
  returnIdTokenResult,
};
