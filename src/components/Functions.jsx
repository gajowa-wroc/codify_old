// Functions.jsx

import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser, setUser } from '../userSlice';
import { auth } from '../firebase_connect';
import { useEffect } from 'react';

export const useFunctions = () => {
  const output = useSelector(state => state.output);
  if (output === "send") {
    console.log("send");
  }

  const dispatch = useDispatch();

  useEffect(() => {
    const login = (props) => {
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

    const signup = (props) => {
      createUserWithEmailAndPassword(auth, props[0], props[1])
        .then(({ user }) => {
          console.log("signup_firebase", user);
          updateProfile(user, {
            displayName: props[2],
            //photoURL: profileUrl
          }).then(() => {
            console.log("displayName:", user.displayName);
            dispatch(setUser({
              id: user.uid,
              name: props[2],
              email: user.email,
              token: user.accessToken,
              email_verified: user.emailVerified
            }));
          }).catch(err => console.log("update_profile_err:", err));
        })
        .catch(err => console.log("signup_firebase_err:", err));
    };

    const logout = () => {
      signOut(auth)
        .then(() => {
          console.log('logout successfully!');
          dispatch(removeUser());
        })
        .catch(err => console.log("logout_err:", err));
    };

    const send = (props) => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log("there is a user");
          // https://firebase.google.com/docs/reference/js/auth.user
          const uid = user.uid;
          //... do whatever you want here, cause there is a user..
        } else {
          console.log("no user logged in");
        }
      });
    };

    // Additional code and hooks related to the login logic

    // Return the necessary functions or state values
    return {
      login,
      signup,
      logout,
      send
    };

  }, [dispatch]); // Add any dependencies if needed

  // Return any additional values or components needed
  return null;
};

// Rest of the code

//export default Functions;
