import React from 'react'
import {render, screen} from '@testing-library/react'
import HelloWorld from './HelloWorld'

it("Works on react too", () => {
  render(<HelloWorld greeting="Hello test" />)

  expect(screen.getByText(/Hello test/)).toBeTruthy()
})
