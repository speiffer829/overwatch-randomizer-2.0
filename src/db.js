import firebase from 'firebase/app'
import 'firebase/firestore'

// Get a Firestore instance
export const db = firebase
  .initializeApp({
    apiKey: "AIzaSyCP6dw9Um3oDEl_D2rCSYWpE_1kvaqw4Ls",
    authDomain: "overwatch-2-54f9a.firebaseapp.com",
    databaseURL: "https://overwatch-2-54f9a.firebaseio.com",
    projectId: "overwatch-2-54f9a",
    storageBucket: "overwatch-2-54f9a.appspot.com",
    messagingSenderId: "148799049621",
    appId: "1:148799049621:web:0cc2619f7dccf01130f09c"
  })
  .firestore()

