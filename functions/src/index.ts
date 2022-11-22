import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

try {
  admin.initializeApp(functions.config().firebase);
} catch (e) {}

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { addUser } from "./helperFunction/userDBHelper";
import { userInit } from "./modal/User";
import { updatePostCount } from "./helperFunction/categoryDBHelper";
import {
  updateCommentCount,
  updateLikeCount,
} from "./helperFunction/postDBHelper";

const app = express();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", { structuredData: true });
//   response.send("Hello from Firebase!");
// });

exports.api = functions.region("asia-east2").https.onRequest(app);

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

exports.newUser = functions
  .region("asia-east2")
  .auth.user()
  .onCreate(async (user: any) => {
    try {
      const uid = user.uid;

      addUser(uid, userInit)
        .then((result) => {
          return 0;
        })
        .catch((err) => console.error(err));

      functions.logger.log("new member:" + uid);
      return null;
    } catch (err: any) {
      console.log(err);
      return null;
    }
  });

exports.newPost = functions
  .region("asia-east2")
  .firestore.document("Post/{postID}")
  .onCreate(async (event) => {
    try {
      const objectIDArr = event.ref.path.split("/");
      const postID = objectIDArr[1];

      // update post count to category
      updatePostCount(postID)
        .then((result) => {
          return 0;
        })
        .catch((err) => console.error(err));

      functions.logger.log("on create post:" + postID);
      return null;
    } catch (err: any) {
      console.log(err);
      return null;
    }
  });

exports.newComment = functions
  .region("asia-east2")
  .firestore.document("Post/{postID}/Comment/{commentID}")
  .onCreate(async (event) => {
    try {
      const objectIDArr = event.ref.path.split("/");
      const postID = objectIDArr[1];
      // const commentID = objectIDArr[objectIDArr.length - 1];

      updateCommentCount(postID)
        .then((result) => {
          return 0;
        })
        .catch((err) => console.error(err));

      functions.logger.log("on create post:" + postID);
      return null;
    } catch (err: any) {
      console.log(err);
      return null;
    }
  });

exports.newComment = functions
  .region("asia-east2")
  .firestore.document("Post/{postID}/Liked/{uid}")
  .onCreate(async (event) => {
    try {
      const objectIDArr = event.ref.path.split("/");
      const postID = objectIDArr[1];
      // const commentID = objectIDArr[objectIDArr.length - 1];

      updateLikeCount(postID)
        .then((result) => {
          return 0;
        })
        .catch((err) => console.error(err));

      functions.logger.log("on create post:" + postID);
      return null;
    } catch (err: any) {
      console.log(err);
      return null;
    }
  });
