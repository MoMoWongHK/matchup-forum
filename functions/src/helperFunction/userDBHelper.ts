import * as admin from "firebase-admin";
import { User, updateEmailState } from "../modal/User";

const db = admin.firestore();

/**
 * create member
 * @param {string} id - firebase uid
 * @param {User} data - the props will add
 */
const addUser = (
  id: string,
  data: User
): Promise<{
  success: boolean;
}> => {
  return new Promise((resolve) => {
    db.collection("User")
      .doc(id)
      .set({
        ...data,
      })
      .then((doc: any) => {
        return resolve({
          success: true,
        });
      })
      .catch((err) => {
        console.log(err);
        //TODO log error
        return resolve({
          success: false,
        });
      });
  });
};

/**
 * update member object
 * @param {string} id - firebase uid
 * @param {updateEmailState} data - the props will update
 */
const updateUser = (
  id: string,
  data: updateEmailState | User
): Promise<{
  success: boolean;
}> => {
  return new Promise((resolve) => {
    db.collection("User")
      .doc(id)
      .update({
        ...data,
      })
      .then((doc: any) => {
        return resolve({
          success: true,
        });
      })
      .catch((err) => {
        console.log(err);
        //TODO log error
        return resolve({
          success: false,
        });
      });
  });
};

const getUser = async (
  id: string
): Promise<
  | {
      success: true;
      data: User;
    }
  | {
      success: false;
    }
> => {
  return new Promise((resolve) => {
    db.collection("User")
      .doc(id)
      .get()
      .then((doc: any) => {
        if (doc.exists) {
          return resolve({
            success: true,
            data: {
              id: doc.id,
              ...doc.data(),
            } as User,
          });
        }
        return resolve({
          success: false,
        });
      })
      .catch((err) => {
        console.log(err);
        return resolve({
          success: false,
        });
      });
  });
};

/**
 * check whether this uid is belongs to KOL / Customer
 * @param {string} email - user email
 */
const isEmailRegistered = (
  email: string
): Promise<{
  success: boolean;
  exists: boolean;
}> => {
  return new Promise((resolve) => {
    db.collection("Member")
      .where("email", "==", email)
      .get()
      .then((docs: any) => {
        if (docs.empty) {
          return resolve({
            success: true,
            exists: false,
          });
        }
        return resolve({
          success: true,
          exists: true,
        });
      })
      .catch((err) => {
        console.log(err);
        return resolve({
          success: false,
          exists: false,
        });
      });
  });
};

export { addUser, updateUser, getUser, isEmailRegistered };
