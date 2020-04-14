import * as functions from 'firebase-functions';

import admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase)

export const onMessageReceived = functions.firestore.document('Messages/{uniqueId}/PrivateMessage/{messageId}').onCreate(
    (snapshot, context) => {

        console.log('${uniqueId} ${messageId}')
        console.log(snapshot.data())
        const messageDetail = snapshot.data()!
        console.log(messageDetail.date)
        //admin.firestore().collection("").doc().collection("").add({ "": "" })
    })


