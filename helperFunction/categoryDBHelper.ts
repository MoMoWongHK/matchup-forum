import { doc, getDoc, getFirestore } from "firebase/firestore";
import firebaseApp from "../config/firebase";
import { Category } from "../model/Category";

const db = getFirestore(firebaseApp);

const getCategory = (
  cateID: string
): Promise<
  | {
      success: true;
      data: Category;
    }
  | {
      success: false;
    }
> => {
  return new Promise(async (resolve) => {
    await getDoc(doc(db, "Category", cateID))
      .then((doc: any) => {
        if (doc.exists()) {
          return resolve({
            success: true,
            data: {
              id: doc.id,
              ...doc.data(),
            } as Category,
          });
        }
        return resolve({
          success: false,
        });
      })
      .catch((err: any) => {
        console.log(err);
        return resolve({
          success: false,
        });
      });
  });
};

export { getCategory };
