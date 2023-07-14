import { signOut } from "firebase/auth";
import { auth } from "../firebase_connect";
import { removeUser, setUser } from "../userSlice";

export const logout = (dispatch) => {
    signOut(auth)
        .then(() => {
            console.log('logout successfully!');
            //setLoggedUserName("You")
            dispatch(removeUser())
        })
        .catch(err => console.log("logout_err:", err))
}