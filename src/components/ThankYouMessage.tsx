import React from 'react'
import CheckmarkSvg from '../assets//images/icon-complete.svg'

const ThankYouMessage = () => {
  return (
    <div className='mt-20 p-4 flex flex-col mx-auto md:w-full max-w-[400px] md:ml-28 lg:mx-auto md:mt-40 items-center text-center'>
      <img src={CheckmarkSvg} alt='checkmark' />
      <h2 className='text-violet-dark mt-7 uppercase text-2xl tracking-widest'>
        Thank you!
      </h2>
      <p className='text-violet-medium mt-3'>We've added your card details</p>
      <button
        className='bg-violet-dark w-full text-white mt-9 py-4 rounded-md hover:bg-violet-dark/90 focus-visible:bg-violet-dark/90'
        onClick={() => location.reload()}
      >
        Continue
      </button>
    </div>
  )
}

export default ThankYouMessage
