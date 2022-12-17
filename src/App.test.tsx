import { act, fireEvent, render } from '@testing-library/react'
import { fn } from 'jest-mock'
import { describe, test, vi } from 'vitest'
import Form from './components/Form'

describe('Form', () => {
  const mockSubmit = fn()

  test('empty name input should show error message', async () => {
    const { getByTestId, getByLabelText } = render(<Form onSubmit={mockSubmit} />)

    // empty name input
    await act(async () => {
      const nameInput = getByLabelText('Cardholder Name')
      fireEvent.input(nameInput, {
        target: {
          value: '',
        },
      })
    })

    await act(async () => {
      fireEvent.click(getByTestId('submitBtn'))
    })

    expect(getByTestId('name-error-msg')).toBeInTheDocument()
  })

  test('wrong cvc input - letters', async () => {
    const { getByTestId, getByLabelText, container } = render(
      <Form onSubmit={mockSubmit} />
    )

    await act(async () => {
      const cvcInput = getByLabelText('CVC')
      //   fireEvent.input(cvcInput, {
      //     target: {
      //       value: '',
      //     },
      //   })
      //   fireEvent.click(getByTestId('submitBtn'))

      fireEvent.input(cvcInput, {
        target: {
          value: 'abc',
        },
      })
      fireEvent.click(getByTestId('submitBtn'))
    })

    expect(container.innerHTML).toMatch('CVC number is required')
  })

  test('wrong card number input - letters', async () => {
    const { getByTestId, getByLabelText, container } = render(
      <Form onSubmit={mockSubmit} />
    )

    await act(async () => {
      const cardInput = getByLabelText('Card number')

      fireEvent.input(cardInput, {
        target: {
          value: 'abc',
        },
      })
      fireEvent.click(getByTestId('submitBtn'))
    })

    expect(container.innerHTML).toMatch('Credit card number is required')
  })

  test('wrong expiry date month input', async () => {
    const { getByTestId, getByLabelText, container } = render(
      <Form onSubmit={mockSubmit} />
    )

    await act(async () => {
      // give wrong month input
      const monthInput = getByLabelText('Exp. date (MM/YY)')
      fireEvent.input(monthInput, {
        target: {
          value: 'abc',
        },
      })
      // give correct year input
      const yearInput = getByTestId('year')
      fireEvent.input(yearInput, {
        target: {
          // value: 12, // old year (expired) - invalid input
          value: 25, // correct (future year) - valid input
        },
      })
      fireEvent.click(getByTestId('submitBtn'))
    })

    expect(container.innerHTML).toMatch('Expiry date is required')
  })

  test('wrong expiry date year input - more than 2 numbers', async () => {
    const { getByTestId, getByLabelText, container } = render(
      <Form onSubmit={mockSubmit} />
    )

    await act(async () => {
      // give correct month format
      const monthInput = getByLabelText('Exp. date (MM/YY)')
      fireEvent.input(monthInput, {
        target: {
          value: 5,
        },
      })
      // give wrong year format
      const yearInput = getByTestId('year')
      fireEvent.input(yearInput, {
        target: {
          value: 12, // old year (expired) - invalid input
          // value: 25, // correct (future year) - valid input
        },
      })
      fireEvent.click(getByTestId('submitBtn'))
    })

    expect(container.innerHTML).toMatch('Expiry date is required')
  })

  test('sucessful form submission', async () => {
    const { getByLabelText, getByTestId } = render(<Form onSubmit={mockSubmit} />)

    // simulate filling out the name field
    const nameInput = getByLabelText('Cardholder Name')
    fireEvent.change(nameInput, { target: { value: 'Jane Anderson' } })

    // simulate filling out the card number field
    const cardInput = getByLabelText('Card number')
    fireEvent.change(cardInput, { target: { value: '1234 5678 9123 0000' } })

    // simulate filling out fields
    const monthInput = getByLabelText('Exp. date (MM/YY)')
    fireEvent.change(monthInput, { target: { value: '01' } })
    const yearInput = getByTestId('year')
    fireEvent.change(yearInput, { target: { value: '23' } })
    const cvcInput = getByLabelText('CVC')
    fireEvent.change(cvcInput, { target: { value: '123' } })

    // simulate form submission
    const form = getByTestId('form')
    await act(async () => {
      fireEvent.submit(form)
    })

    // assert that the form submission was successful
    expect(mockSubmit).toHaveBeenCalled()
  })
})
