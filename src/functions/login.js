import { signInWithEmailAndPassword } from 'firebase/auth';
import { setUser } from '../userSlice';
import { auth } from '../firebase_connect';

export const login = (dispatch, props) => {
    signInWithEmailAndPassword(auth, props[0], props[1])
        .then(({ user }) => {
            dispatch(setUser({
                id: user.uid,
                name: user.displayName,
                email: user.email,
                token: user.accessToken,
                email_verified: user.emailVerified
            }));
            console.log("login_firebase", user);
        })
        .catch(err => console.log("login_firebase_err:", err));
};
