import firebase from 'firebase';


export const Authentication = {
    authed: false
}


export const CONFIG_DB = {
    apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASEURL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
    storageBucket: process.env.REACT_APP_FIREBASE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MSGSENDERID
  };
  
firebase.initializeApp(CONFIG_DB);
export const auth = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();
export default firebase;

