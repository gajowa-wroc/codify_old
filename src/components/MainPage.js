import React, { useEffect } from 'react'
import TerminalWrite from './TerminalWrite'
import { useDispatch } from 'react-redux';
import { getDatabase } from 'firebase/database';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setUser } from '../userSlice';
import { auth } from '../firebase_connect';
import Functions from './Functions'
import TerminalRead from './TerminalRead'

const MainPage = () => {
  const dispatch = useDispatch()

  const database = getDatabase();
  //const auth = useSelector(state => state.firebase.auth)
  //console.log("auth__:",auth)

  const email = "hey1@gmail.com"
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
      <section className='grid place-items-center input-cursor'>
        <div className='w-screen h-screen grid lg:grid-cols-2 md:grid-cols-2 md:grid-cols-2 xs:grid-rows-2 '>
          <div className='w-full min-h-screen bg-blue-800 centered md:h-screen  order-last md:order-first  border border-stone-200 border-2 text-white'>
            <TerminalWrite/>
          </div>

          <div className='w-full min-h-screen bg-stone-950 centered md:h-screen md:order-last border border-sky-600 border-2 text-teal-600'>
            <TerminalRead/>
          </div>
        </div>
      </section>
    </React.Fragment>
  )
}

export default MainPage