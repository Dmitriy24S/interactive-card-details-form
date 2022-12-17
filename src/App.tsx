import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import cardLogo from './assets/images/card-logo.svg'
import Form from './components/Form'
import ThankYouMessage from './components/ThankYouMessage'

export interface IFormInputs {
  name: string
  card: string
  month: number | string
  year: number | string
  cvc: string
}

function App() {
  const [data, setData] = useState<IFormInputs>()
  const [fieldValues, setFieldValues] = useState<IFormInputs>({
    name: '',
    card: '',
    month: '',
    year: '',
    cvc: '',
  })
  const { name, card, month, year, cvc } = fieldValues

  const updateLocalFieldValues = (valuesObj: IFormInputs) => {
    setFieldValues(valuesObj)
  }

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    console.log('handle submit')
    console.log('SUBMIT DATA:', data)
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
            <div className='absolute right-8 top-[70px] text-sm'>{cvc || '000'}</div>
          </div>
        </div>
        {/* Card - Front */}
        <div className='card--front w-[300px] h-[164px] bg-cover absolute -bottom-14 left-4 shadow-2xl md:top-[7rem] md:right-[-18%] md:left-auto'>
          <div className='card-content relative p-4 flex flex-col justify-between h-full'>
            <img src={cardLogo} className='card-logo w-[45px]' alt='' />
            <div className='mt-auto'>
              <div className='text-xl font-semibold tracking-widest mb-1'>
                {card || '0000 0000 0000 0000'}
              </div>
              <div className='flex justify-between text-sm'>
                <div className='uppercase break-all max-w-[12rem]'>
                  {name || 'Jane Appleseed'}
                </div>
                <div className='max-w-[6rem] overflow-hidden flex items-end'>
                  <div className='max-w-[2rem] overflow-hidden'>
                    {month < 10 && month > 0 ? '0' + month : month || '00'}
                    {/* add leading zero for months */}
                  </div>
                  /<div className='max-w-[2rem] overflow-hidden'> {year || '00'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {!data ? (
        <Form onSubmit={onSubmit} updateLocalFieldValues={updateLocalFieldValues} />
      ) : (
        <ThankYouMessage />
      )}
    </div>
  )
}

export default App
