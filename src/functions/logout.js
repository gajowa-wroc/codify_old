import { signOut } from "firebase/auth";
import { auth } from "../firebase_connect";
import { removeUser } from "../redux/userSlice";
import { addOutput } from "../redux/outputSlice";

export const logout = async(dispatch) => {
    //return new Promise((resolve, reject) => {
    await signOut(auth)
        .then(() => {
            console.log('logout successfully!');
            dispatch(removeUser())
            dispatch(addOutput("Logout successfully"))
        })
        .catch(err => {
            console.log("logout_err:", err)
            dispatch(addOutput("Logout failed"))
        })
    //})
}