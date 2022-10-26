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

const db = getFirestore(firebaseApp);

const isLikedPost = (
  postID: string,
  uid: string
): Promise<{ success: boolean; liked: boolean }> => {
  return new Promise(async (resolve) => {
    await getDoc(doc(db, "Post", postID, "Liked", uid))
      .then((doc: any) => {
        return resolve({
          success: true,
          liked: doc.exists(),
        });
      })
      .catch((err: any) => {
        return resolve({
          success: false,
          liked: false,
        });
      });
  });
};

const getPost = (
  postID: string
): Promise<
  | {
      success: true;
      data: Post;
    }
  | {
      success: false;
    }
> => {
  return new Promise(async (resolve) => {
    await getDoc(doc(db, "Post", postID))
      .then((doc: any) => {
        if (doc.exists()) {
          return resolve({
            success: true,
            data: {
              id: doc.id,
              ...doc.data(),
            } as Post,
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

const getPosts = (
  categoryID: string,
  setLimit: number
): Promise<
  | {
      success: true;
      data: Post[];
      hasMore: boolean;
    }
  | {
      success: false;
    }
> => {
  return new Promise(async (resolve) => {
    let dbRef: any = collection(db, "Post");

    if (categoryID !== "" && categoryID) {
      dbRef = query(dbRef, where("cateID", "==", categoryID));
    }

    await getDocs(
      query(dbRef, orderBy("createDate", "desc"), limit(setLimit))
    ).then((docs: any) => {
      if (!docs.empty) {
        let arr: Post[] = [];
        docs.forEach((doc: any) => {
          arr.push({
            id: doc.id,
            ...doc.data(),
          } as Post);
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

export { isLikedPost, getPost, getPosts };
