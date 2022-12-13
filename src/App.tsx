import { FormEvent, useState } from 'react'
import cardLogo from './assets/images/card-logo.svg'

function App() {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
  }

  return (
    <div className='App w-full h-screen bg-white md:flex'>
      {/* Card */}
      <div className='card h-[15rem] w-full bg-cover relative text-white md:min-w-[22rem] md:w-[30%] md:h-screen'>
        {/* Card - Back */}
        <div className='card--back w-[300px] h-[164px] bg-cover absolute right-4 top-8 md:right-[-26%] md:top-[22rem]'>
          <div className='card-content relative'>
            <div className='absolute right-8 top-[70px] text-sm'>000</div>
          </div>
        </div>
        {/* Card - Front */}
        <div className='card--front w-[300px] h-[164px] bg-cover absolute -bottom-14 left-4 shadow-2xl md:top-[7rem] md:right-[-18%] md:left-auto'>
          <div className='card-content relative p-4 flex flex-col justify-between h-full'>
            <img src={cardLogo} className='card-logo w-[45px]' alt='' />
            <div className='mt-auto'>
              <div className='text-xl font-semibold tracking-widest mb-1'>
                0000 0000 0000 0000
              </div>
              <div className='flex justify-between text-sm'>
                <div className='uppercase'>Jane Appleseed</div>
                <div> 00/00 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Form */}
      <form
        onSubmit={(e) => {
          handleSubmit(e)
        }}
        className='mt-20 p-4 flex flex-col mx-auto md:w-full max-w-[400px] md:ml-28 lg:mx-auto md:mt-36'
      >
        {/* Name */}
        <div className='input-container mb-4 flex flex-col gap-2'>
          <label
            htmlFor='name'
            className='uppercase text-violet-dark tracking-widest text-sm font-semibold'
          >
            Cardholder Name
          </label>
          <input
            type='text'
            name='name'
            id='name'
            placeholder='e.g. Jane Anderson'
            className='border
            border-neutral-300 rounded-md p-2'
          />
        </div>
        {/* Card */}
        <div className='input-container mb-4 flex flex-col gap-2'>
          <label
            htmlFor='card-number'
            className='uppercase text-violet-dark tracking-widest text-sm font-semibold'
          >
            Card number
          </label>
          <input
            type='number'
            name='card-number'
            id='card-number'
            placeholder='e.g. 1234 5678 9123 0000'
            className='form-input'
          />
        </div>
        <div className='flex gap-2'>
          {/* Date */}
          <div className='flex flex-col gap-2 w-1/2 justify-between'>
            <label
              htmlFor='month'
              className='uppercase text-violet-dark tracking-widest text-sm font-semibold'
            >
              Exp. date (MM/YY)
            </label>
            <div className='flex gap-2'>
              <input
                type='number'
                name='month'
                id='month'
                min={1}
                max={12}
                placeholder='MM'
                className='w-1/2 form-input'
              />
              <input
                type='number'
                name='year'
                id='year'
                placeholder='YY'
                minLength={2}
                maxLength={2}
                min={23}
                className='w-1/2 form-input'
              />
            </div>
          </div>
          {/* CVC */}
          <div className='flex flex-col gap-2 w-1/2 justify-between'>
            <label
              htmlFor='cvc'
              className='uppercase text-violet-dark tracking-widest text-sm font-semibold'
            >
              CVC
            </label>
            <input
              type='number'
              name='cvc'
              id='cvc'
              placeholder='e.g. 123'
              minLength={3}
              maxLength={3}
              min={0}
              className='form-input'
            />
          </div>
        </div>
        <button
          type='submit'
          className='bg-violet-dark text-white mt-6 py-4 rounded-md hover:bg-violet-dark/90 focus-visible:bg-violet-dark/90'
        >
          Confirm
        </button>
      </form>
      {/* Thank you message after submit */}
      {/* Thank you!
      We've added your card details
      Continue */}
    </div>
  )
}

export default App
