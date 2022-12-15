import { yupResolver } from '@hookform/resolvers/yup'
import { FormEvent, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import cardLogo from './assets/images/card-logo.svg'
import ThankYouMessage from './components/ThankYouMessage'

interface IFormInputs {
  name: string
  card: string
  month: number
  year: number
  // cvc: number
  // month: string
  // year: string
  cvc: string
}

const schema = yup
  .object({
    name: yup.string().required(),
    // card: yup.number().positive().integer().required(),
    card: yup
      .string()
      .required('Credit card number is required')
      .matches(/^\d{16}$/, 'Credit card number must be 16 digits'),
    // month: yup.number().positive().integer().required(),
    month: yup.number().min(1).max(12),
    year: yup.number().min(23).max(28),
    cvc: yup.string().matches(/^\d{3}$/)
  })
  .required()

function App() {
  const [data, setData] = useState<IFormInputs>()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema)
  })

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    console.log(data)
    // {
    // "cvc": "123",
    // "year": 24,
    // "month": 4,
    // "card": "1312313133232312",
    // "name": "ewerewr"
    // }
    setData(data)
  }

  return (
    <div className='App w-full h-screen bg-white md:flex'>
      {/* Card */}
      <div className='card h-[15rem] w-full bg-cover relative text-white md:min-w-[18rem] md:w-[30%] md:h-screen'>
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
      {!data ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='mt-20 p-4 flex flex-col mx-auto md:w-full max-w-[25rem] md:ml-28 lg:mx-auto md:mt-36'
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
              // name='name'
              id='name'
              placeholder='e.g. Jane Anderson'
              className={['form-input', errors.name ? 'error-input' : ''].join(' ')}
              {...register('name', { required: true })}
              aria-invalid={errors.name ? 'true' : 'false'}
            />
            {/* {errors.name?.type === 'required' && ( */}
            {errors.name && (
              <p role='alert' className='text-red'>
                Name is required
              </p>
            )}
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
              // type='number'
              // name='card-number'
              type='text'
              pattern='\d*'
              // ^ limits input after 16characters
              id='card-number'
              placeholder='e.g. 1234 5678 9123 0000'
              className={['form-input', errors.card ? 'error-input' : ''].join(' ')}
              {...register('card', { required: true })}
              aria-invalid={errors.card ? 'true' : 'false'}
              // min={0}
              // minLength={16}
              maxLength={16}
              // required
            />
            {/* {errors.card?.type === 'required' && ( */}
            {errors.card?.message && (
              <p role='alert' className='text-red'>
                {/* Card number is required */}
                {errors.card.message}
              </p>
            )}
          </div>
          {/* <div className='flex gap-2'> */}
          <div className='flex gap-4'>
            {/* Expiry Date */}
            <div className='flex flex-col gap-2 w-1/2 justify-between relative'>
              <label
                htmlFor='month'
                className='uppercase text-violet-dark tracking-widest text-sm font-semibold'
              >
                Exp. date (MM/YY)
              </label>
              <div className='flex gap-2'>
                <input
                  type='number'
                  // name='month'
                  // type='text'
                  // pattern='\d*'
                  id='month'
                  min={1}
                  max={12}
                  minLength={2}
                  maxLength={2}
                  // ^ not work with type number
                  placeholder='MM'
                  className={['w-1/2 form-input', errors.month ? 'error-input' : ''].join(
                    ' '
                  )}
                  aria-invalid={errors.month ? 'true' : 'false'}
                  {...register('month', { required: true })}
                />
                <input
                  type='number'
                  // name='year'
                  // type='text'
                  // pattern='\d*'
                  id='year'
                  placeholder='YY'
                  minLength={2}
                  maxLength={2}
                  // ^ not work with type number
                  min={23} // minimal card year expiry date?
                  className={['w-1/2 form-input', errors.year ? 'error-input' : ''].join(
                    ' '
                  )}
                  aria-invalid={errors.year ? 'true' : 'false'}
                  {...register('year', { required: true })}
                />
              </div>
            </div>
            {/* CVC */}
            <div className='flex flex-col gap-2 w-1/2 justify-between relative'>
              <label
                htmlFor='cvc'
                className='uppercase text-violet-dark tracking-widest text-sm font-semibold'
              >
                CVC
              </label>
              <input
                // type='number'
                // name='cvc'
                type='text'
                pattern='\d*'
                id='cvc'
                placeholder='e.g. 123'
                minLength={3}
                maxLength={3}
                // ^ not work with type number
                // min={0}
                className={['form-input', errors.cvc ? 'error-input' : ''].join(' ')}
                {...register('cvc', { required: true })}
                aria-invalid={errors.cvc ? 'true' : 'false'}
              />
            </div>
          </div>
          {(errors.month || errors.year || errors.cvc) && (
            <div className='flex gap-2'>
              {(errors.month || errors.year) && (
                <p role='alert' className='text-red  top-full mt-2'>
                  Expiry date is required
                </p>
              )}
              {/* {errors.cvc?.type === 'required' && ( */}
              {errors.cvc && (
                <p role='alert' className='text-red top-full mt-2'>
                  CVC number is required
                </p>
              )}
            </div>
          )}
          <button
            type='submit'
            className='bg-violet-dark text-white mt-6 py-4 rounded-md hover:bg-violet-dark/90 focus-visible:bg-violet-dark/90'
          >
            Confirm
          </button>
        </form>
      ) : (
        <ThankYouMessage />
      )}
    </div>
  )
}

export default App
