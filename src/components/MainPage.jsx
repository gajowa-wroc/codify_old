import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { app, auth, db } from '../firebase_connect'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { getDownloadURL, getStorage, ref, uploadBytesResumable, uploadString } from 'firebase/storage'
import my_logo from '../logo512.png'
import { setUser } from '../userSlice'

import { getDatabase, set } from "firebase/database";


const MainPage = () => {
  const dispatch = useDispatch()

  const database = getDatabase();
  //const auth = useSelector(state => state.firebase.auth)
  //console.log("auth__:",auth)

  const email = "TİKKA11@gmail.com"
  const password = "123456"
  const firstname = 'gajowa_tikka'
  const lastname = 'wroc_tikka'


  useEffect(() => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(({user}) => {
        dispatch(setUser({
          id: user.uid,
          name: user.displayName,
          email: user.email,
          token: user.accessToken,
          email_verified: user.emailVerified
        }))
        console.log("createUserWithEmailAndPassword",user)
      })
      .catch(err => console.log("mtfireErr:",err))

      //writeUserData(23, "ahmet", "ahmet1@gmail.com", "https://fastly.picsum.photos/id/1074/5000/3333.jpg?hmac=WTLC8LlWe9c9_kJZsPLer9EWSoaFo5MpRIePupGhzlo")
  }, [])

  //signInWithEmailAndPassword()

  return (
    <React.Fragment>
      <section>
        <div className='w-screen h-screen grid lg:grid-cols-2 sm:grid-rows-2 text-white'>
          <div className='w-full h-full bg-blue-800 centered md:h-screen  order-last sm:order-first'>
            <p>Terminalw</p>
          </div>

          {/* Terminalr */}

          <div className='w-full h-full bg-black centered md:h-screen'>
            <p>Terminalr</p>
          </div>
        </div>
      </section>
    </React.Fragment>
  )
}

export default MainPage