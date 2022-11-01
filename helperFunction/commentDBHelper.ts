import {
  collection,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
} from "firebase/firestore";
import firebaseApp from "../config/firebase";
import { Comment, CommentWithUser } from "../model/CommentWithUser";
import { getUserBasicInfo } from "./userDBHelper";

const db = getFirestore(firebaseApp);

const getComments = (
  postID: string,
  setLimit: number
): Promise<
  | {
      success: true;
      data: CommentWithUser[];
      hasMore: boolean;
    }
  | {
      success: false;
    }
> => {
  return new Promise(async (resolve) => {
    let dbRef: any = collection(db, "Post", postID, "Comment");

    await getDocs(
      query(dbRef, orderBy("createDate", "desc"), limit(setLimit))
    ).then((docs: any) => {
      if (!docs.empty) {
        let arr: CommentWithUser[] = [];
        docs.forEach(async (doc: any) => {
          const getUserState = await getUserBasicInfo(doc.data().createUserID);
          if (getUserState.success) {
            arr.push({
              id: doc.id,
              user: {
                avatarUrl: getUserState.data.avatarUrl,
                username: getUserState.data.userName,
              },
              ...doc.data(),
            } as CommentWithUser);
          } else {
            arr.push({
              id: doc.id,
              user: {
                avatarUrl: "",
                username: "DEFAULT_USER",
              },
              ...doc.data(),
            } as CommentWithUser);
          }
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

export { getComments };
