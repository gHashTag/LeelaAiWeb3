import React from 'react'

import { render } from '@testing-library/react-native'

import { Text, hT, textStyles } from './Text' // Replace with your actual file path

describe('Text Component', () => {
  it('renders correctly with default props', () => {
    const { getByText } = render(<Text title="Test Title" />)
    expect(getByText('Test Title')).toBeTruthy()
  })
  it('applies the correct style based on the "h" prop', () => {
    const styles: hT[] = ['h0', 'h1', 'h2', 'h3', 'h4', 'h5']
    styles.forEach((style) => {
      const { getByTestId } = render(<Text title="Test Title" h={style} />)
      const receivedStyle = getByTestId('text-component').props.style
      expect(receivedStyle).toEqual(expect.objectContaining(textStyles[style]))
    })
  })
})
