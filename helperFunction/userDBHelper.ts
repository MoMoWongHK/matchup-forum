import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import firebaseApp from "../config/firebase";
import { Post } from "../model/Post";
import { User } from "../model/User";

const db = getFirestore(firebaseApp);

const getUserBasicInfo = (
  uid: string
): Promise<
  | {
      success: true;
      data: {
        userName: string;
        avatarUrl: string;
      };
    }
  | {
      success: false;
    }
> => {
  return new Promise(async (resolve) => {
    await getDoc(doc(db, "User", uid))
      .then((doc: any) => {
        if (doc.exists()) {
          return resolve({
            success: true,
            data: {
              userName: doc.data().userName,
              avatarUrl: doc.data().avatarUrl,
            },
          });
        }
        return resolve({
          success: false,
        });
      })
      .catch((err: any) => {
        return resolve({
          success: false,
        });
      });
  });
};

const getUser = (
  uid: string
): Promise<
  | {
      success: true;
      data: User;
    }
  | {
      success: false;
    }
> => {
  return new Promise(async (resolve) => {
    await getDoc(doc(db, "User", uid))
      .then((doc: any) => {
        if (doc.exists()) {
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
      .catch((err: any) => {
        return resolve({
          success: false,
        });
      });
  });
};

const getUsers = (
  setLimit: number
): Promise<
  | {
      success: true;
      data: User[];
      hasMore: boolean;
    }
  | {
      success: false;
    }
> => {
  return new Promise(async (resolve) => {
    let dbRef: any = collection(db, "User");

    await getDocs(
      query(dbRef, orderBy("createDate", "desc"), limit(setLimit))
    ).then((docs: any) => {
      if (!docs.empty) {
        let arr: User[] = [];
        docs.forEach((doc: any) => {
          arr.push({
            id: doc.id,
            ...doc.data(),
          } as User);
        });
        return resolve({
          success: true,
          data: arr,
          hasMore: true,
        });
      }
      return resolve({
        success: false,
      });
    });
  });
};

export { getUser, getUsers, getUserBasicInfo };
