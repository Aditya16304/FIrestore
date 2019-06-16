import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();
const db=admin.firestore();

export const OnCreatefunc=functions.firestore.document("users/{userId}").onCreate((snapshot,context) =>{
     db.collection("users").get()
     .then(function(querySnapshot){
        if(querySnapshot.size>10){
            const last=db.collection("users").orderBy("date","asc").limit(1)
            .get()
            .then(query =>{
                if (!query.empty) {
                    query.docs[0].ref.delete()
                    .catch(error =>{
                        console.error(error)
                    })
                } else {
                    console.log("No document corresponding to the query!");
                }
            })
            console.log(last)
        }
     })
     .catch(error =>{
         console.error(error)
     })
     return snapshot.ref.get()
     .catch(error =>{
        console.error(error)
     })
})
