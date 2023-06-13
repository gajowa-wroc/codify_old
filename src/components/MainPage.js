import React from 'react'

const MainPage = () => {
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