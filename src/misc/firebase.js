import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'

const config = {
    apiKey: "AIzaSyDw8N1MpOn9Rl38DoZBJ5hulkNTx2sTeHI",
    authDomain: "chat-web-app-9c01c.firebaseapp.com",
    projectId: "chat-web-app-9c01c",
    storageBucket: "chat-web-app-9c01c.appspot.com",
    messagingSenderId: "842343671242",
    appId: "1:842343671242:web:1b7564da38df29fa34db33"
}

const app = firebase.initializeApp(config)
export const auth = app.auth()
export const database = app.database()
export const storage = app.storage()