import {
  setDoc,
  collection,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  doc,
  where,
} from "firebase/firestore";
import firebaseApp from "../config/firebase";
import {
  Comment,
  COMMENT_TYPE,
  CommentWithUser,
} from "../model/CommentWithUser";
import { getUserBasicInfo } from "./userDBHelper";
import { v4 as uuidv4 } from "uuid";

const db = getFirestore(firebaseApp);

const getMyComment = (
  postID: string,
  createUserID: string
): Promise<
  | {
      success: true;
      data: CommentWithUser;
    }
  | {
      success: false;
    }
> => {
  return new Promise(async (resolve) => {
    let dbRef: any = collection(db, "Post", postID, "Comment");

    await getDocs(
      query(dbRef, where("createUserID", "==", createUserID), limit(1))
    ).then(async (docs: any) => {
      if (!docs.empty) {
        const getUserState = await getUserBasicInfo(docs.docs[0].id);
        if (getUserState.success) {
          return resolve({
            success: true,
            data: {
              id: docs.docs[0].id,
              user: {
                avatarUrl: getUserState.data.avatarUrl,
                username: getUserState.data.userName,
              },
              ...docs.docs[0].data(),
            } as CommentWithUser,
          });
        } else {
          return resolve({
            success: true,
            data: {
              id: docs.docs[0].id,
              user: {
                avatarUrl: "",
                username: "DEFAULT_USER",
              },
              ...docs.docs[0].data(),
            } as CommentWithUser,
          });
        }
      } else {
        return resolve({
          success: false,
        });
      }
    });
  });
};

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

const addComment = (
  postID: string,
  createUserID: string,
  comment: string,
  replyID?: string
): Promise<
  | {
      success: true;
      data: Comment;
    }
  | {
      success: false;
    }
> => {
  return new Promise(async (resolve1, reject1) => {
    const commentID = uuidv4();

    const newComment = {
      content: comment,
      createDate: new Date(),
      createUserID: createUserID,
      numOfLike: 0,
      numOfComment: 0,
      type: COMMENT_TYPE.COMMENT,
      replyID: replyID,
    };

    await setDoc(doc(db, "Post", postID, "Comment", commentID), newComment)
      .then((res) => {
        resolve1({
          success: true,
          data: {
            id: commentID,
            ...newComment,
          } as Comment,
        });
      })
      .catch((err) => {
        resolve1({
          success: false,
        });
      });
  });
};

export { getMyComment, getComments, addComment };
