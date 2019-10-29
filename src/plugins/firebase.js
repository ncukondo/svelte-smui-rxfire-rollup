import firebase from 'firebase/app';
import 'firebase/firestore';


const {
  APP_ENV_apiKey: apiKey,
  APP_ENV_authDomain: authDomain,
  APP_ENV_databaseURL: databaseURL,
  APP_ENV_projectId: projectId,
  APP_ENV_storageBucket: storageBucket,
  APP_ENV_messagingSenderId: messagingSenderId,
  APP_ENV_appId: appId,
  APP_ENV_measurementId: measurementId

} =
process.env;


const firebaseApp = firebase.initializeApp({
  apiKey,
  authDomain,
  databaseURL,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  measurementId
});

export const db = firebaseApp.firestore();