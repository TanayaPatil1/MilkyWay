// firebase credentials 
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import codegenNativeCommands from 'react-native/Libraries/Utilities/codegenNativeCommands'

//configuration
const firebaseConfig={
    apiKey: "API_KEY",
  authDomain: "AUTH_DOMAIN",
  projectId: "PROJECT_ID",
  storageBucket: "BUCKET_ID",
  messagingSenderId: "MSG_ID",
  appId: "APP_ID",
  measurementId: "MESUREMENT_ID"
}
if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);

}
export { firebase };