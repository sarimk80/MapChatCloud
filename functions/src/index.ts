import * as functions from 'firebase-functions';

import admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase)

export const onMessageReceived = functions.firestore.document('Messages/{uniqueId}/PrivateMessage/{messageId}').onCreate(
    async (snapshot, context) => {

        console.log('${uniqueId} ${messageId}')
        console.log(snapshot.data())
        const messageDetail = snapshot.data()!
        console.log(messageDetail.date)

        let sender = await admin.firestore().collection("Users").doc(messageDetail.fromUuid).get()
        let receiver = await admin.firestore().collection("Users").doc(messageDetail.toUuid).get()

        let senderData = sender.data()!
        let receiverData = receiver.data()!

        console.log(receiverData.uuid)
        console.log(senderData.name)

        const senderCheck = {
            "date": Date.now.toString(),
            "friendUser": {
                "uuid": receiverData.uuid,
                "name": receiverData.name,
                "email": receiverData.email,
                "phoneNumber": receiverData.phoneNumber,
                "imageUrl": receiverData.imageUrl,
                "latitude": receiverData.latitude,
                "longitude": receiverData.longitude
            },
            "userId": {
                "uuid": senderData.uuid,
                "name": senderData.name,
                "email": senderData.email,
                "phoneNumber": senderData.phoneNumber,
                "imageUrl": senderData.imageUrl,
                "latitude": senderData.latitude,
                "longitude": senderData.longitude
            }
        }

        const receiverCheck = {
            "date": Date.now.toString(),
            "friendUser": {
                "uuid": senderData.uuid,
                "name": senderData.name,
                "email": senderData.email,
                "phoneNumber": senderData.phoneNumber,
                "imageUrl": senderData.imageUrl,
                "latitude": senderData.latitude,
                "longitude": senderData.longitude
            },
            "userId": {
                "uuid": receiverData.uuid,
                "name": receiverData.name,
                "email": receiverData.email,
                "phoneNumber": receiverData.phoneNumber,
                "imageUrl": receiverData.imageUrl,
                "latitude": receiverData.latitude,
                "longitude": receiverData.longitude
            }

        }

        await admin.firestore().collection("Users").doc(messageDetail.toUuid).collection("FriendsCheck").doc(messageDetail.fromUuid).set(receiverCheck)


        await admin.firestore().collection("Users").doc(messageDetail.fromUuid).collection("FriendsCheck").doc(messageDetail.toUuid).set(senderCheck)


        return await admin.firestore().collection("Users").doc(messageDetail.toUuid).collection("MessageRead").doc("isRead").set({ "isRead": false })

    })


