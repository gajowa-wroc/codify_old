import React from 'react'
import TerminalWrite from './TerminalWrite'
import { getDatabase } from 'firebase/database';
import TerminalRead from './TerminalRead'

const MainPage = () => {

  const database = getDatabase();

  return (
    <React.Fragment>
      <section className='grid place-items-center input-cursor'>
        <div className='w-screen h-screen grid lg:grid-cols-2 md:grid-cols-2 xs:grid-rows-2 '>
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