import * as admin from "firebase-admin";
import { Member, updateEmailState, updateGCMToken } from "../modal/Member";

const db = admin.firestore();

/**
 * create member
 * @param {string} id - firebase uid
 * @param {Member} data - the props will add
 */
const addMember = (
  id: string,
  data: Member
): Promise<{
  success: boolean;
}> => {
  return new Promise((resolve) => {
    db.collection("Member")
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
const updateMember = (
  id: string,
  data: updateEmailState | Member | updateGCMToken
): Promise<{
  success: boolean;
}> => {
  return new Promise((resolve) => {
    db.collection("Member")
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

const getMember = async (
  id: string
): Promise<
  | {
      success: true;
      data: Member;
    }
  | {
      success: false;
    }
> => {
  return new Promise((resolve) => {
    db.collection("Member")
      .doc(id)
      .get()
      .then((doc: any) => {
        if (doc.exists) {
          return resolve({
            success: true,
            data: {
              id: doc.id,
              ...doc.data(),
            } as Member,
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

export { addMember, updateMember, getMember, isEmailRegistered };
