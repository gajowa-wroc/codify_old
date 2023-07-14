import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase_connect";

export const send = (dispatch, props) => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log("there is a user")
            // https://firebase.google.com/docs/reference/js/auth.user
            const uid = user.uid;
            //... do whatever you want here, cause there is a user..


        } else {
            console.log("no user logged in")
        }
    })
}