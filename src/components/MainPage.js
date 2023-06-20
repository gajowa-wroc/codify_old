import React from 'react'
import TerminalWrite from './TerminalWrite'

const MainPage = () => {
  return (
    <React.Fragment>
      <section className='grid place-items-center'>
        <div className='w-screen h-screen grid lg:grid-cols-2 md:grid-cols-2 md:grid-cols-2 xs:grid-rows-2 text-red-900'>
          <div className='w-full h-full bg-blue-800 centered md:h-screen  order-last md:order-first'>
            <TerminalWrite/>
          </div>

          <div className='w-full h-full bg-black centered md:h-screen md:order-last'>
            <p>Terminalr</p>
          </div>
        </div>
      </section>
    </React.Fragment>
  )
}

export default MainPage