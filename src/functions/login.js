import { signInWithEmailAndPassword } from 'firebase/auth';
import { setUser } from '../redux/userSlice';
import { auth } from '../firebase_connect';
import { addOutput } from '../redux/outputSlice';

export const login = async(dispatch, props) => {
    await signInWithEmailAndPassword(auth, props[0], props[1])
        .then(({ user }) => {
            dispatch(setUser({
                id: user.uid,
                name: user.displayName,
                email: user.email,
                token: user.accessToken,
                email_verified: user.emailVerified
            }));
            console.log("login successfully", user);
            dispatch(addOutput("Login successfully"))
        })
        .catch(err => {
            console.log("login_firebase_err:", err)
            dispatch(addOutput("Login failed"))
        });
};
