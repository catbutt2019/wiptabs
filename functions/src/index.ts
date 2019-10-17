import * as functions from 'firebase-functions';

import * as admin from 'firebase-admin'

admin.initializeApp()

 /* export const getFeed = functions.https.onRequest(async (req,res) =>{
    const docs = await admin.firestore().collection('posts').limit(10).get()
    res.send(docs.docs.map(doc=>doc.data()))
})  */



export const getFeed = functions.https.onCall(async (req,res) =>{
   // const docs = await admin.firestore().collection('people/{peopleId}/tasks').limit(5).get()
  const docs = await admin.firestore().collection('tasks').where('category', '==', 'Wipped').orderBy('date','desc').limit(20).get()
   // const docs = await admin.firestore().collection('people').where("category", "==", "Wipping").limit(5).get()
   // const docs = await admin.firestore().collection('tasks').where("category", "==", "Wipping").limit(5).get()
    //const docs = await admin.firestore().collection('people').where("tasks", "==", "Wipped").limit(5).get()
    // const docs = await admin.firestore().collection("people").where("tasks", "array-contains", "category").limit(5).get()
    
    return docs.docs.map(doc => {
    return {
        postID: doc.id,
        ...doc.data()
         }
     }) 
 })

 export const getWipping = functions.https.onCall(async (req,res) =>{
    // const docs = await admin.firestore().collection('people/{peopleId}/tasks').limit(5).get()
   const docs = await admin.firestore().collection('tasks').where('category', '==', 'Wipping').orderBy('date','desc').limit(20).get()
    // const docs = await admin.firestore().collection('people').where("category", "==", "Wipping").limit(5).get()
    // const docs = await admin.firestore().collection('tasks').where("category", "==", "Wipping").limit(5).get()
     //const docs = await admin.firestore().collection('people').where("tasks", "==", "Wipped").limit(5).get()
     // const docs = await admin.firestore().collection("people").where("tasks", "array-contains", "category").limit(5).get()
     
     return docs.docs.map(doc => {
     return {
         postID: doc.id,
         ...doc.data()
          }
      }) 
  })

