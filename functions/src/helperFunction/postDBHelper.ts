import * as admin from "firebase-admin";

const db = admin.firestore();

/**
 * create member
 * @param {string} postID - category id
 */
const updateCommentCount = (
  postID: string
): Promise<{
  success: boolean;
}> => {
  return new Promise((resolve) => {
    db.collection("Post")
      .doc(postID)
      .update({
        numOfComment: admin.firestore.FieldValue.increment(1),
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
 * create member
 * @param {string} postID - category id
 */
const updateLikeCount = (
  postID: string
): Promise<{
  success: boolean;
}> => {
  return new Promise((resolve) => {
    db.collection("Post")
      .doc(postID)
      .update({
        numOfLike: admin.firestore.FieldValue.increment(1),
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

export { updateCommentCount, updateLikeCount };
