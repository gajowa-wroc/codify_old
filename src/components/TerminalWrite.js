import React from 'react'
import { useState, useEffect } from 'react'
import PrefixedInput from './InputPrefix';
import { useDispatch, useSelector } from 'react-redux';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../firebase_connect';
import { setUser } from '../userSlice';

const TerminalWrite = () => {
    const [input, setInput] = useState();
    const [output, setOutput] = useState();
    const [array, setArray] = useState([]);

    const [loggedUserName, setLoggedUserName] = useState("You");
    let prefix = `C:/Users/${loggedUserName}/Person>`

    const dispatch = useDispatch();
    const reduxUserName = useSelector(state => state.user.userName)

    useEffect(() => {
        if (reduxUserName)
            setLoggedUserName(reduxUserName)
    }, [reduxUserName])

    useEffect(() => {
        //array.push(output)
        if (output) {
            console.log("output", output)
            setArray(prev => [...prev, prefix + output])
            dispatch({ type: 'ADD_OUTPUT', payload: output });
            setOutput("")

            callFunction(output);
        }
    }, [output, dispatch])

    /*const email = "hey1@gmail.com" /  "asdx@gmail.com"
    const password = "123456"        /  "123456"
    const firstname = 'gajowa_tikka' /  "asdx"   
    const lastname = 'wroc_tikka'*/

    const callFunction = (output) => {
        const matches = output.match(/([a-zA-Z0-9_]+)\((.*?)\)/);

        if (matches) {
            const functionName = matches[1];
            const propsString = matches[2];
            const props = parsePropsString(propsString);

            // Check if the function name exists in the function map
            if (functionName in functionMap) {
                const func = functionMap[functionName];
                func(props); // Call the corresponding function with props
            }
        }
    };

    const parsePropsString = (propsString) => {
        const propsArray = propsString.split(",").map(prop => {
            const trimmedProp = prop.trim();

            if (trimmedProp.startsWith('"') && trimmedProp.endsWith('"')) { // Check if it's a string value
                return trimmedProp.slice(1, -1); // Remove the surrounding quotes
            }

            if (!isNaN(trimmedProp)) {  // Check if it's a number value
                return Number(trimmedProp);
            }

            // Handle other types of values as needed
            // ...

            return trimmedProp; // If the value doesn't match any recognized type, return it as is
        });

        return propsArray;
    };

    const login = (props) => {
        signInWithEmailAndPassword(auth, props[0], props[1])
            .then(({ user }) => {
                dispatch(setUser({
                    id: user.uid,
                    name: user.displayName,
                    email: user.email,
                    token: user.accessToken,
                    email_verified: user.emailVerified
                }))
                console.log("login_firebase", user)
            })
            .catch(err => console.log("login_firebase_err:", err))
    };

    const signup = (props) => {
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

    const logout = () => {
        signOut(auth)
            .then(() => {
                console.log('logout successfully!');
                setLoggedUserName("You")
                dispatch(setUser({
                    id: "",
                    name: "",
                    email: "",
                    token: "",
                    email_verified: false
                }))
            })
            .catch(err => console.log("logout_err:", err))
    }

    const send = (props) => {
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

    const functionMap = {
        login: login,
        signup: signup,
        logout: logout,
        send: send,
    };

    return (
        <div className='w-full h-full bg-black overflow-auto md:overflow-y-auto'>
            <div className='flex flex-col bg-black pl-2'>
                <p className='pt-2'>Codify version 1.0</p>
                {array?.map(item => {
                    return (
                        <div className='flex flex-col pb-2'>
                            <span>{item}</span>
                        </div>
                    )
                })}

                <PrefixedInput
                    prefix={prefix}
                    className='input-cursor bg-black focus:outline-none font-sans w-full'
                    type='text'
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => {
                        if (e.key === "Enter") {
                            setOutput(e.target.value)
                            setInput("")
                        }
                    }}
                />

            </div>
        </div>
    )
}

export default TerminalWrite
