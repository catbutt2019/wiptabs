"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
/* export const getFeed = functions.https.onRequest(async (req,res) =>{
   const docs = await admin.firestore().collection('posts').limit(10).get()
   res.send(docs.docs.map(doc=>doc.data()))
})  */
exports.getFeed = functions.https.onCall(async (req, res) => {
    const docs = await admin.firestore().collection('people').doc().collection('tasks').limit(5).get();
    return docs.docs.map(doc => {
        return Object.assign({ postID: doc.id }, doc.data());
    });
});
//# sourceMappingURL=index.js.map