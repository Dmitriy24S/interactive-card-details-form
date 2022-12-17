import { yupResolver } from '@hookform/resolvers/yup'
import React, { FormEvent, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { IFormInputs } from '../App'

const schema = yup
  .object({
    name: yup.string().required(),
    // card: yup.number().positive().integer().required(),
    card: yup
      .string()
      .required('Credit card number is required')
      // .matches(/^\d{16}$/, 'Credit card number must be 16 digits'), // ! not work after added credit card number spacing
      .matches(
        // /^\d{4}(?:[-\s]\d{4}){3}$/,
        /^\d{4}\s*\d{4}\s*\d{4}\s*\d{4}$/,
        'Credit card number must be 16 digits'
        // ! on valid re-enter not clear error msg?
      ),
    month: yup.number().min(1).max(12),
    year: yup.number().min(23).max(28),
    cvc: yup.string().matches(/^\d{3}$/),
  })
  .required()

interface Props {
  onSubmit: SubmitHandler<IFormInputs>
  updateLocalFieldValues?: (values: IFormInputs) => void
}

const Form = ({ onSubmit, updateLocalFieldValues }: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      card: '',
      month: '',
      year: '',
      cvc: '',
    },
  })

  const watchAllFields = watch() // when pass nothing as argument, you are watching everything
  console.log(watchAllFields)
  const { name, card, month, year, cvc } = watchAllFields

  useEffect(() => {
    if (updateLocalFieldValues) {
      updateLocalFieldValues({
        name,
        card,
        month,
        year,
        cvc,
      })
    }
    // }
  }, [name, card, month, year, cvc])

  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val =
      e.target.value
        .replace(/\s|[^0-9]+/g, '')
        .match(/.{1,4}/g)
        ?.join(' ') ?? ''
    console.log({ val })
    setValue('card', val)
  }

  return (
    <form
      data-testid='form'
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
          maxLength={40}
        />
        {/* {errors.name?.type === 'required' && ( */}
        {errors.name && (
          <p role='alert' className='text-red' data-testid='name-error-msg'>
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
          // pattern='\d*'
          id='card-number'
          placeholder='e.g. 1234 5678 9123 0000'
          className={['form-input', errors.card ? 'error-input' : ''].join(' ')}
          {...register('card', { required: true })}
          aria-invalid={errors.card ? 'true' : 'false'}
          // min={0}
          // minLength={16}
          // maxLength={16}
          maxLength={19}
          // required
          onChange={handleCardChange}
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
              //   minLength={2}
              //   maxLength={2} // doesn't work with type number
              placeholder='MM'
              className={['w-1/2 form-input', errors.month ? 'error-input' : ''].join(
                ' '
              )}
              aria-invalid={errors.month ? 'true' : 'false'}
              {...register('month', {
                required: true,
                maxLength: 2,
                // valueAsNumber: true
                // pattern: {
                // value: /^(0|[1-9]\d*)(\.\d+)?$/
                // },
              })}
            />
            <input
              data-testid='year'
              type='number'
              // name='year'
              // type='text'
              // pattern='\d*'
              id='year'
              placeholder='YY'
              //   minLength={2}
              //   maxLength={2} // doesn't work with type number
              //   min={23} // minimal card year expiry date? html vs react-hook-form testing?
              //   max={28}
              className={['w-1/2 form-input', errors.year ? 'error-input' : ''].join(' ')}
              aria-invalid={errors.year ? 'true' : 'false'}
              {...register('year', { required: true, maxLength: 2 })}
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
            // pattern='\d*' // html vs react-hook-form testing?
            id='cvc'
            placeholder='e.g. 123'
            // minLength={3}
            // maxLength={3} // doesn't work with type number
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
            <p role='alert' className='text-red top-full mt-2'>
              Expiry date is required
            </p>
          )}
          {/* {errors.cvc?.type === 'required' && ( */}
          {errors.cvc && (
            <p
              role='alert'
              className='text-red top-full mt-2'
              data-testid='cvc-input-error'
            >
              CVC number is required
            </p>
          )}
        </div>
      )}
      <button
        data-testid='submitBtn'
        type='submit'
        className='bg-violet-dark text-white mt-6 py-4 rounded-md hover:bg-violet-dark/90 focus-visible:bg-violet-dark/90'
      >
        Confirm
      </button>
    </form>
  )
}

export default Form
