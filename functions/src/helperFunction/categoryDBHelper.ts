import * as admin from "firebase-admin";

const db = admin.firestore();

/**
 * create member
 * @param {string} categoryID - category id
 */
const updatePostCount = (
  categoryID: string
): Promise<{
  success: boolean;
}> => {
  return new Promise((resolve) => {
    db.collection("Category")
      .doc(categoryID)
      .update({
        numOfPost: admin.firestore.FieldValue.increment(1),
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

export { updatePostCount };
