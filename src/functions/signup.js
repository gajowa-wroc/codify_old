import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { setUser } from "../redux/userSlice";
import { auth } from "../firebase_connect";

export const signup = (dispatch, props) => {
    createUserWithEmailAndPassword(auth, props[0], props[1])
        .then(({ user }) => {
            console.log("signup_firebase", user)
            updateProfile(user, {
                displayName: props[2],
                //photoURL: profileUrl
            }).then(() => {
                console.log("displayName:", user.displayName)
                dispatch(setUser({
                    id: user.uid,
                    name: props[2],
                    email: user.email,
                    token: user.accessToken,
                    email_verified: user.emailVerified
                }))
            }).catch(err => console.log("update_profile_err:", err))
        })
        .catch(err => console.log("signup_firebase_err:", err))
};